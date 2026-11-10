#!/usr/bin/env python3
"""Inventory rendered Hugo routes and their referenced local/external assets."""
from __future__ import annotations

import argparse
import csv
import re
import sys
import unicodedata
import xml.etree.ElementTree as ET
from collections import defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit, urlunsplit

ASSET_EXTENSIONS = {
    ".pdf", ".doc", ".docx", ".ppt", ".pptx", ".xls", ".xlsx", ".zip",
    ".csv", ".bib", ".ris", ".mp4", ".mov", ".webm", ".mp3", ".wav",
    ".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico", ".woff",
    ".woff2", ".ttf", ".otf", ".css", ".js", ".json", ".xml",
}
URL_IN_CSS = re.compile(r"url\(\s*(['\"]?)(.*?)\1\s*\)", re.IGNORECASE)


class PageScanner(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.title_parts: list[str] = []
        self.h1_parts: list[str] = []
        self.canonical = ""
        self.meta_title = ""
        self.refresh = False
        self.refs: list[tuple[str, str]] = []
        self.in_title = False
        self.in_h1 = False
        self.in_style = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        a = {k.lower(): (v or "") for k, v in attrs}
        tag = tag.lower()
        if tag == "title":
            self.in_title = True
        if tag == "h1" and not self.h1_parts:
            self.in_h1 = True
        if tag == "style":
            self.in_style = True
        if tag == "meta":
            name = (a.get("name") or a.get("property", "")).lower()
            if name in {"og:title", "twitter:title"} and a.get("content"):
                self.meta_title = a["content"].strip()
            if a.get("http-equiv", "").lower() == "refresh":
                self.refresh = True
        if tag == "link":
            rel = set(a.get("rel", "").lower().split())
            if "canonical" in rel and a.get("href"):
                self.canonical = a["href"].strip()
            if a.get("href") and ("stylesheet" in rel or "icon" in rel or "manifest" in rel or "preload" in rel):
                self.refs.append((a["href"].strip(), "link:" + ",".join(sorted(rel))))
        for attr in ("src", "poster", "data"):
            if a.get(attr) and (tag in {"img", "script", "iframe", "source", "video", "audio", "track", "embed", "object"}):
                self.refs.append((a[attr].strip(), f"{tag}:{attr}"))
        if a.get("srcset"):
            for item in a["srcset"].split(","):
                url = item.strip().split()[0] if item.strip() else ""
                if url:
                    self.refs.append((url, f"{tag}:srcset"))
        if tag == "a" and a.get("href"):
            href = a["href"].strip()
            path = urlsplit(href).path.lower()
            if "download" in a or Path(path).suffix in ASSET_EXTENSIONS:
                self.refs.append((href, "a:download" if "download" in a else "a:file-link"))
        if a.get("style"):
            for match in URL_IN_CSS.finditer(a["style"]):
                if match.group(2).strip():
                    self.refs.append((match.group(2).strip(), "inline-style"))

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "title":
            self.in_title = False
        elif tag == "h1":
            self.in_h1 = False
        elif tag == "style":
            self.in_style = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_parts.append(data)
        if self.in_h1:
            self.h1_parts.append(data)
        if self.in_style:
            for match in URL_IN_CSS.finditer(data):
                if match.group(2).strip():
                    self.refs.append((match.group(2).strip(), "inline-style"))

    @property
    def title(self) -> str:
        return self.meta_title or " ".join("".join(self.h1_parts or self.title_parts).split())

    @property
    def heading(self) -> str:
        return " ".join("".join(self.h1_parts).split())


def relative_output_route(file_path: Path, public_dir: Path) -> str:
    rel = file_path.relative_to(public_dir).as_posix()
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[: -len("index.html")]
    return "/" + rel


def matching_child(parent: Path, name: str) -> Path:
    if parent.is_dir():
        for child in parent.iterdir():
            if child.name.casefold() == name.casefold():
                return child
    return parent / name


def normalized_name(value: str) -> str:
    value = value.split("|", 1)[0].strip()
    return " ".join(re.sub(r"[^\w]+", " ", value.casefold(), flags=re.UNICODE).split())


def profile_title(profile_file: Path) -> str:
    text = profile_file.read_text(encoding="utf-8", errors="replace")
    parts = text.split("---", 2)
    if len(parts) < 3:
        return ""
    for line in parts[1].splitlines():
        match = re.match(r"^\s*title:\s*(.*?)\s*$", line)
        if not match:
            continue
        value = match.group(1)
        if len(value) >= 2 and value[0] == value[-1] and value[0] in {"'", '"'}:
            value = value[1:-1]
        return value.replace("''", "'").replace('\\"', '"')
    return ""


def profile_slug(value: str) -> str:
    value = value.split("|", 1)[0].strip()
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii").casefold()
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", value)).strip("-")


def source_for_route(route: str, content_dir: Path, heading: str = "") -> tuple[str, str, str]:
    """Return (kind, slug, source path), preserving Hugo section/profile slugs."""
    path = unquote(urlsplit(route).path)
    parts = [p for p in path.strip("/").split("/") if p]
    if not parts:
        candidate = content_dir / "home" / "index.md"
        return "home", "", str(candidate) if candidate.exists() else ""

    prefix = parts[0].lower()
    slug = parts[-1]
    if slug == "index.html":
        slug = parts[-2] if len(parts) > 1 else ""
    if slug == "page" and len(parts) > 1:
        slug = "page/" + parts[-1]

    if prefix == "authors":
        archive_file = content_dir / "authors" / "_index.md"
        page_slug = "page/" + parts[2] if len(parts) > 2 and parts[1] == "page" else ""
        return "people-archive", page_slug, str(archive_file) if archive_file.exists() else ""
    if prefix == "publication_types":
        return "taxonomy-index:publication_type", "", ""

    section_map = {
        "author": ("person", "authors", "_index.md"),
        "publication": ("publication", "publication", "index.md"),
        "event": ("event", "event", "index.md"),
        "post": ("news", "post", "index.md"),
    }
    if prefix in section_map:
        kind, directory, leaf_file = section_map[prefix]
        base = content_dir / directory
        if len(parts) == 1:
            candidates = [base / "_index.md", base / "index.md"]
            for candidate in candidates:
                if candidate.exists():
                    return kind + "-archive", "", str(candidate)
        elif len(parts) > 1:
            if prefix == "author" and heading:
                heading_key = normalized_name(heading)
                route_slug = parts[1].casefold()
                for profile_file in sorted(base.glob("*/_index.md")):
                    title = profile_title(profile_file)
                    if normalized_name(title) == heading_key and profile_slug(title) == route_slug:
                        return "person", profile_file.parent.name, str(profile_file)
            item_dir = matching_child(base, parts[1])
            candidate = item_dir / leaf_file
            if candidate.exists() and (prefix != "author" or not heading or normalized_name(profile_title(candidate)) == normalized_name(heading)):
                return kind, parts[1], str(candidate)
        if prefix in {"tag", "category", "publication-type"}:
            return "taxonomy", slug, ""
        # /author/ can also be an author taxonomy; do not label unmatched terms as people.
        return ("taxonomy" if prefix == "author" else kind), slug, ""

    taxonomy_names = {"tag": "tag", "tags": "tag", "category": "category", "categories": "category", "publication-type": "publication_type"}
    if prefix in taxonomy_names:
        return "taxonomy:" + taxonomy_names[prefix], slug, ""

    exact_sections = {
        "teaching": ("teaching", "Teaching"),
        "service": ("service", "service"),
        "project": ("project", "project"),
        "code": ("code", "code"),
        "contact": ("contact", "contact"),
        "newsfeed": ("news", "newsfeed"),
        "admin": ("admin", "admin"),
    }
    if prefix in exact_sections:
        kind, directory = exact_sections[prefix]
        base = content_dir / directory
        candidates = [base / "index.md", base / "_index.md"]
        if len(parts) > 1:
            candidates = [base / parts[1] / "index.md", base / parts[1] / "_index.md"] + candidates
        for candidate in candidates:
            if candidate.exists():
                return kind, slug if len(parts) > 1 else "", str(candidate)
        static_page = content_dir.parent / "static" / directory / "index.html"
        if static_page.exists():
            return "static-tool", slug if len(parts) > 1 else "", str(static_page)
        return kind, slug if len(parts) > 1 else "", ""

    static_page = content_dir.parent / "static" / Path(*parts) / "index.html"
    if static_page.exists():
        return "static-tool", slug, str(static_page)

    if route.lower().endswith(".html"):
        return "legacy-html", slug.removesuffix(".html"), ""
    # Best-effort mapping for simple content pages with a route-aligned source path.
    base = content_dir.joinpath(*parts)
    for candidate in (base / "index.md", base / "_index.md", content_dir / (parts[-1] + ".md")):
        if candidate.exists():
            return "page", slug, str(candidate)
    return "page", slug, ""


def parse_sitemap(public_dir: Path) -> set[str]:
    routes: set[str] = set()
    for sitemap in public_dir.glob("sitemap*.xml"):
        try:
            root = ET.parse(sitemap).getroot()
        except (ET.ParseError, OSError):
            continue
        for element in root.iter():
            if element.tag.rsplit("}", 1)[-1] == "loc" and element.text:
                routes.add(element.text.strip())
    return routes


def canonical_route(url: str, base_url: str) -> str:
    absolute = urljoin(base_url, url)
    split = urlsplit(absolute)
    return urlunsplit((split.scheme, split.netloc, split.path, split.query, split.fragment))


def asset_record(raw_url: str, ref_route: str, ref_type: str, base_url: str, public_dir: Path, assets: dict) -> str | None:
    value = raw_url.strip()
    if not value or value.startswith(("#", "data:", "javascript:", "mailto:", "tel:")):
        return None
    absolute = canonical_route(value, urljoin(base_url, ref_route.lstrip("/")))
    split = urlsplit(absolute)
    base = urlsplit(base_url)
    local = split.netloc.lower() in {"", base.netloc.lower(), base.netloc.lower().removeprefix("www.")} or split.netloc.lower() == "www." + base.netloc.lower()
    path = unquote(split.path)
    local_file = (public_dir / path.lstrip("/")).resolve() if local else None
    try:
        local_file.relative_to(public_dir.resolve())
        inside = True
    except (ValueError, AttributeError):
        inside = False
    exists = bool(local and inside and local_file and local_file.is_file())
    key = ("local:" + path) if local else ("external:" + absolute)
    record = assets.setdefault(key, {"url": absolute, "local_path": path if local else "", "local": local, "exists": exists, "size_bytes": local_file.stat().st_size if exists and local_file else "", "extension": Path(path).suffix.lower(), "reference_types": set(), "referenced_by_routes": set()})
    record["reference_types"].add(ref_type)
    record["referenced_by_routes"].add(ref_route)
    return key


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--public-dir", type=Path, default=Path("public"))
    parser.add_argument("--source-root", type=Path, default=Path("."))
    parser.add_argument("--output-dir", type=Path, default=Path("migration/inventory"))
    parser.add_argument("--base-url", default="https://mkaouer.net/")
    parser.add_argument("--source-commit", default="unknown")
    args = parser.parse_args()

    public_dir = args.public_dir.resolve()
    source_root = args.source_root.resolve()
    content_dir = source_root / "content"
    if not public_dir.is_dir():
        print(f"Rendered Hugo output not found: {public_dir}", file=sys.stderr)
        return 2
    args.output_dir.mkdir(parents=True, exist_ok=True)
    base_url = args.base_url.rstrip("/") + "/"
    sitemap_urls = parse_sitemap(public_dir)
    assets: dict = {}
    routes: list[dict[str, str | int]] = []
    html_files = sorted(public_dir.rglob("*.html"))
    for html_file in html_files:
        route = relative_output_route(html_file, public_dir)
        if route == "/404.html":
            continue
        scanner = PageScanner()
        try:
            scanner.feed(html_file.read_text(encoding="utf-8", errors="replace"))
        except OSError:
            continue
        kind, slug, source_file = source_for_route(route, content_dir, scanner.title or scanner.heading)
        canonical = scanner.canonical or canonical_route(route, base_url)
        page_assets = set()
        for ref, ref_type in scanner.refs:
            key = asset_record(ref, route, ref_type, base_url, public_dir, assets)
            if key:
                page_assets.add(key)
            if ref_type == "link:stylesheet":
                stylesheet_url = canonical_route(ref, urljoin(base_url, route.lstrip("/")))
                stylesheet_parts = urlsplit(stylesheet_url)
                base_host = urlsplit(base_url).netloc.lower()
                if stylesheet_parts.netloc.lower() in {"", base_host, "www." + base_host}:
                    stylesheet_path = (public_dir / unquote(stylesheet_parts.path).lstrip("/")).resolve()
                    try:
                        stylesheet_path.relative_to(public_dir.resolve())
                        css_inside_output = True
                    except ValueError:
                        css_inside_output = False
                    if css_inside_output and stylesheet_path.is_file():
                        css_text = stylesheet_path.read_text(encoding="utf-8", errors="replace")
                        for match in URL_IN_CSS.finditer(css_text):
                            nested_url = match.group(2).strip()
                            if nested_url:
                                nested_absolute = urljoin(stylesheet_url, nested_url)
                                nested_key = asset_record(nested_absolute, route, "css:url", base_url, public_dir, assets)
                                if nested_key:
                                    page_assets.add(nested_key)
        routes.append({
            "route": route,
            "kind": "legacy-html" if scanner.refresh and kind == "page" else kind,
            "source_slug": slug,
            "title": scanner.title,
            "canonical_url": canonical,
            "source_file": str(Path(source_file).resolve().relative_to(source_root)) if source_file else "",
            "rendered_file": html_file.relative_to(public_dir).as_posix(),
            "in_sitemap": "yes" if canonical in sitemap_urls or canonical.rstrip("/") in sitemap_urls else "no",
            "referenced_asset_count": len(page_assets),
        })

    route_fields = ["route", "kind", "source_slug", "title", "canonical_url", "source_file", "rendered_file", "in_sitemap", "referenced_asset_count"]
    with (args.output_dir / "routes.csv").open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=route_fields, lineterminator="\n")
        writer.writeheader()
        writer.writerows(sorted(routes, key=lambda row: str(row["route"])))

    asset_fields = ["url", "local_path", "local", "exists", "size_bytes", "extension", "reference_count", "reference_types", "referenced_by_routes"]
    with (args.output_dir / "assets.csv").open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=asset_fields, lineterminator="\n")
        writer.writeheader()
        records = sorted(assets.values(), key=lambda row: (not row["local"], row["local_path"] or row["url"]))
        for row in records:
            writer.writerow({
                "url": row["url"], "local_path": row["local_path"], "local": str(row["local"]).lower(),
                "exists": str(row["exists"]).lower(), "size_bytes": row["size_bytes"], "extension": row["extension"],
                "reference_count": len(row["referenced_by_routes"]),
                "reference_types": ";".join(sorted(row["reference_types"])),
                "referenced_by_routes": ";".join(sorted(row["referenced_by_routes"])),
            })

    counts: dict[str, int] = defaultdict(int)
    for row in routes:
        counts[str(row["kind"])] += 1
    missing_local = [r for r in assets.values() if r["local"] and not r["exists"]]
    missing_sitemap = [r for r in routes if r["in_sitemap"] == "no" and r["kind"] not in {"legacy-html"}]
    summary = [
        "# Phase 1 URL and asset inventory",
        "",
        f"- Source commit: `{args.source_commit}`",
        f"- Site base URL: `{base_url}`",
        f"- Hugo output: `{public_dir}`",
        f"- HTML routes/pages inventoried: {len(routes)}",
        f"- Referenced assets (local and external): {len(assets)}",
        f"- Missing referenced local assets: {len(missing_local)}",
        f"- Non-alias pages absent from sitemap: {len(missing_sitemap)}",
        "",
        "## Route counts",
        "",
    ]
    summary.extend(f"- `{kind}`: {count}" for kind, count in sorted(counts.items()))
    summary += [
        "",
        "## Missing local assets",
        "",
    ]
    if missing_local:
        for asset in sorted(missing_local, key=lambda row: row["local_path"]):
            summary.append(f"- `{asset['local_path']}` — referenced by {len(asset['referenced_by_routes'])} page(s).")
    else:
        summary.append("- None.")
    summary += [
        "",
        "## Routes absent from sitemap",
        "",
    ]
    if missing_sitemap:
        for route in sorted(missing_sitemap, key=lambda row: str(row["route"])):
            title = route["title"] or route["kind"]
            summary.append(f"- `{route['route']}` — {title} (`{route['kind']}`).")
    else:
        summary.append("- None.")
    summary += [
        "",
        "## Review notes",
        "",
        "- `routes.csv` records rendered route, inferred kind/source slug, title, canonical URL, source file where it could be matched, output file, sitemap presence, and count of directly referenced assets.",
        "- `assets.csv` records local/external resources referenced by rendered HTML, including image/media sources, stylesheets, scripts, embeds, downloadable links, and CSS `url(...)` references; local resources are checked against the rendered output.",
        "- Taxonomy and generated routes may not have a single Markdown source file. An empty `source_file` means the mapping requires source review, not that the route is invalid.",
        "- Confirm whether the non-sitemap utility pages should remain excluded before the migration cutover.",
        "",
    ]
    (args.output_dir / "summary.md").write_text("\n".join(summary), encoding="utf-8")
    print(f"Wrote {len(routes)} routes and {len(assets)} referenced assets to {args.output_dir}")
    print(f"Missing local assets: {len(missing_local)}; non-alias pages missing from sitemap: {len(missing_sitemap)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
