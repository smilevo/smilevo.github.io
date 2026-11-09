#!/usr/bin/env python3
"""Convert the legacy Hugo/Wowchemy content in this repo into the template's JSON content model.

Usage (from the repo root, with the Hugo folders still present):

    pip install pyyaml
    python3 scripts/migrate_hugo.py                # write to _migration/ for review
    python3 scripts/migrate_hugo.py --apply        # write straight into content/ and public/
    python3 scripts/migrate_hugo.py --collaborators visitor|alumni|skip

Nothing in the Hugo folders is modified or deleted. Re-running is safe (output is regenerated).
A human-readable report of everything that needs review is written to _migration/REPORT.md.
"""
import argparse
import json
import re
import shutil
import sys
import unicodedata
from datetime import date
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("PyYAML is required: pip install pyyaml")

ROOT = Path(__file__).resolve().parents[1]
SITE_URL = "https://mkaouer.net"
SITE_NAME = "SMILE Research Group"
SITE_DESC = (
    "The Software Maintenance and Intelligent Evolution (SMILE) Research Group at the "
    "University of Michigan-Flint designs intelligent algorithms to tackle software engineering problems."
)
HOME_TEXT = (
    "The **Software Maintenance and Intelligent Evolution** (SMILE) Research Group at the "
    "[University of Michigan-Flint](https://umflint.edu/) focuses on designing and implementing "
    "intelligent algorithms to tackle software engineering problems. Our goal is to help developers "
    "better maintain and evolve software systems.\n\n"
    "We welcome motivated students at all levels (bachelor’s, master’s, and PhD) who are interested "
    "in joining the group. To inquire, contact Mohamed Wiem Mkaouer at "
    "[mmkaouer@umich.edu](mailto:mmkaouer@umich.edu)."
)
GROUP_STATUS = {
    "Principal Investigators": ("member", 1),
    "PhD Students": ("member", 3),
    "MSc Students": ("member", 4),
    "Developers": ("member", 4),
    "Alumni": ("alumni", 5),
    "Collaborators": (None, 5),  # decided by --collaborators
}
GROUP_ROLE = {
    "Principal Investigators": "Principal Investigator",
    "PhD Students": "PhD Student",
    "MSc Students": "MSc Student",
    "Developers": "Developer",
    "Alumni": "Alumnus",
    "Collaborators": "Collaborator",
}
PUB_TYPES = {"1": "conference", "2": "article", "3": "preprint", "5": "book"}
BIB_TYPES = {"inproceedings": "conference", "article": "article", "book": "book", "misc": "other"}
NON_PERSONAL_HOSTS = ("github.com", "scholar.google", "linkedin.com", "twitter.com", "x.com",
                      "researchgate.net", "orcid.org", "dblp.org", "facebook.com", "mailto:")

report = []
# Extra spellings of the same person seen in publication author lists.
EXTRA_ALIASES = {
    "moataz-chouchen": ["Motaz Chouchen"],
    "alexander-bogart": ["Alex Bogart"],
    "marouane-kessentini": ["M Kessentini"],
    "mohamed-wiem-mkaouer": ["Wiem Mkaouer", "Mohamed Mkaouer", "MW Mkaouer", "Mohamed W. Mkaouer"],
}


def note(msg):
    report.append(msg)


def fold(text):
    text = unicodedata.normalize("NFKD", text)
    return "".join(c for c in text if not unicodedata.combining(c))


def slug(text):
    s = re.sub(r"[^a-z0-9_-]+", "-", fold(text).lower()).strip("-")
    return re.sub(r"-{2,}", "-", s)


def norm_name(name):
    return re.sub(r"[^a-z ]", "", fold(name).lower().replace("-", " ")).strip()


def front_matter(path):
    raw = path.read_text(encoding="utf-8", errors="replace")
    if not raw.startswith("---"):
        return {}, raw
    parts = raw.split("---", 2)
    try:
        data = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as exc:
        note(f"- YAML error in `{path.relative_to(ROOT)}`: {exc}")
        data = {}
    return data, parts[2] if len(parts) > 2 else ""


def clean_str(value):
    if value is None:
        return ""
    return re.sub(r"\s+", " ", str(value).replace("*", "")).strip().strip("'\"")


def http(value):
    return bool(value) and bool(re.match(r"^https?://[^\s/]+\.[^\s]*$", str(value).strip()))


def copy_asset(src, dest_dir, dest_name, out_public):
    dest = out_public / dest_dir / dest_name
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    return f"/{dest_dir}/{dest_name}"


# --------------------------------------------------------------------------- people
def load_people(out_public, collab_mode):
    people, name_index = [], {}
    for folder in sorted((ROOT / "content/authors").iterdir()):
        idx = folder / "_index.md"
        if not idx.is_file():
            continue
        fm, _ = front_matter(idx)
        name = clean_str(fm.get("title") or folder.name)
        groups = fm.get("user_groups") or []
        group = groups[0] if groups else "Alumni"
        status, priority = GROUP_STATUS.get(group, ("alumni", 5))
        if status is None:
            if collab_mode == "skip":
                note(f"- Collaborator skipped (no profile): {name}")
                # keep a minimal record so paper links still resolve
            status = "alumni" if collab_mode in ("alumni", "skip") else "visitor"
        pid = slug(folder.name)
        role = clean_str(fm.get("role")) or GROUP_ROLE.get(group, "Member")
        topics = []
        for t in fm.get("interests") or []:
            t = clean_str(t)
            if t and t not in topics:
                topics.append(t)
        website = ""
        for s in fm.get("social") or []:
            link = str(s.get("link", "")).strip()
            if http(link) and not any(h in link for h in NON_PERSONAL_HOSTS) and "USERNAME" not in link:
                website = link
                break
        person = {"id": pid, "name": name, "role": role, "status": status, "priority": priority, "topics": topics}
        if website:
            person["website"] = website
        for ext in ("jpg", "jpeg", "png"):
            av = folder / f"avatar.{ext}"
            if av.is_file():
                person["image"] = copy_asset(av, "resources/headshots", f"{pid}.{ext}", out_public)
                break
        else:
            note(f"- No avatar: {name} ({pid})")
        people.append(person)
        keys = {norm_name(name)} | {norm_name(a) for a in EXTRA_ALIASES.get(pid, [])} | {norm_name(a) for a in (fm.get("aliases") or []) if isinstance(a, str)}
        for k in keys:
            name_index.setdefault(k, set()).add(pid)
    return people, name_index


def match_person(name, name_index, first_last_index):
    key = norm_name(name)
    if key in name_index and len(name_index[key]) == 1:
        return next(iter(name_index[key])), "exact"
    toks = key.split()
    if len(toks) >= 2:
        fl = (toks[0], toks[-1])
        if fl in first_last_index and len(first_last_index[fl]) == 1:
            return next(iter(first_last_index[fl])), "first-last"
    return None, None


# --------------------------------------------------------------------------- publications
def bib_info(folder):
    bib = folder / "cite.bib"
    if not bib.is_file():
        return {}
    txt = bib.read_text(encoding="utf-8", errors="replace")
    m = re.match(r"\s*@(\w+)", txt)
    info = {"type": m.group(1).lower() if m else ""}
    for field in ("journal", "booktitle"):
        m = re.search(field + r"\s*=\s*[{\"](.+?)[}\"],?\s*\n", txt, re.I)
        if m:
            info["venue"] = m.group(1)
    return info


def load_publications(out_public, name_index):
    first_last = {}
    for k, ids in name_index.items():
        toks = k.split()
        if len(toks) >= 2:
            first_last.setdefault((toks[0], toks[-1]), set()).update(ids)
    pubs, seen_dois, unmatched, fuzzy = [], set(), {}, []
    for folder in sorted((ROOT / "content/publication").iterdir()):
        idx = folder / "index.md"
        if not idx.is_file():
            continue
        fm, _ = front_matter(idx)
        if fm.get("draft") is True:
            continue
        pid = slug(folder.name)
        title = clean_str(fm.get("title"))
        authors = [clean_str(a) for a in (fm.get("authors") or []) if clean_str(a)]
        m = re.search(r"(\d{4})", str(fm.get("date", "")))
        if not m:  # a few legacy entries have date "-01-01": recover the year from the folder or title
            m = re.search(r"-(\d{4})-", f"-{folder.name}-") or re.search(r"\((\d{4})\)", title)
            if m:
                note(f"- Year inferred as {m.group(1)} for `{pid}` (date field was `{fm.get('date')}`)")
        cleaned = re.sub(r"^[^()]{1,40}\(\d{4}\)\s+", "", title)
        if cleaned != title and len(cleaned) > 15:
            note(f"- Title cleaned on `{pid}`: “{title[:60]}…” → “{cleaned[:60]}…”")
            title = cleaned
        if not (title and authors and m):
            note(f"- Skipped `{folder.name}`: missing title, authors or year")
            continue
        bib = bib_info(folder)
        ptypes = fm.get("publication_types") or []
        ptype = PUB_TYPES.get(str(ptypes[0])) if ptypes else None
        ptype = ptype or BIB_TYPES.get(bib.get("type", ""), "article")
        venue = clean_str(fm.get("publication")) or clean_str(bib.get("venue"))
        pub = {"id": pid, "title": title, "authors": " and ".join(authors), "authorNames": authors,
               "year": int(m.group(1)), "type": ptype}
        if venue:
            pub["venue"] = venue
        if clean_str(fm.get("abstract")):
            pub["description"] = str(fm["abstract"]).strip()
        doi = re.sub(r"^https?://(?:dx\.)?doi\.org/", "", clean_str(fm.get("doi")), flags=re.I).lower()
        if doi:
            if not re.fullmatch(r"10\.\d{4,9}/\S+", doi):
                note(f"- Invalid DOI dropped on `{pid}`: {doi}")
            elif doi in seen_dois:
                note(f"- Duplicate DOI dropped on `{pid}`: {doi} (check for a duplicate paper entry)")
            else:
                seen_dois.add(doi)
                pub["doi"] = doi
                pub["url"] = f"https://doi.org/{doi}"
        pdfs = sorted(folder.glob("*.pdf")) + sorted(folder.glob("*.PDF"))
        url_pdf = clean_str(fm.get("url_pdf"))
        if pdfs:
            pub["pdf"] = copy_asset(pdfs[0], "resources/pubpdfs", f"{pid}.pdf", out_public)
        elif http(url_pdf):
            pub["pdf"] = url_pdf
        for ext in ("jpg", "jpeg", "png"):
            img = folder / f"featured.{ext}"
            if img.is_file():
                pub["image"] = copy_asset(img, "resources/thumbnails", f"{pid}.{ext}", out_public)
                break
        ids = []
        for a in authors:
            person, how = match_person(a, name_index, first_last)
            if person:
                if person not in ids:
                    ids.append(person)
                if how == "first-last":
                    fuzzy.append((pid, a, person))
            else:
                unmatched[a] = unmatched.get(a, 0) + 1
        pub["personIds"] = ids
        pubs.append(pub)
    pubs.sort(key=lambda p: (-p["year"], p["title"].lower()))
    last_names = {}
    for k, ids in name_index.items():
        last_names.setdefault(k.split()[-1], set()).update(ids)
    variants = [(n, sorted(last_names[norm_name(n).split()[-1]])) for n in unmatched
                if norm_name(n).split() and norm_name(n).split()[-1] in last_names]
    if variants:
        note(f"\n### Unmatched authors sharing a last name with a profile ({len(variants)}) – possible spelling variants")
        note("Add confirmed ones to `EXTRA_ALIASES` in this script and re-run.")
        for n, ids in variants[:40]:
            note(f"- “{n}” ({unmatched[n]} papers) ~ {', '.join(ids)}")
    note(f"\n### Authors with no profile ({len(unmatched)}; expected for external coauthors)")
    top = sorted(unmatched.items(), key=lambda kv: -kv[1])[:25]
    note("Most frequent: " + "; ".join(f"{n} ({c})" for n, c in top))
    if fuzzy:
        note(f"\n### Matched by first+last name only ({len(fuzzy)}) – please spot-check")
        for pid, a, person in fuzzy[:40]:
            note(f"- `{pid}`: “{a}” → `{person}`")
    return pubs


# --------------------------------------------------------------------------- news / events
def first_paragraph(body, limit=320):
    for para in re.split(r"\n\s*\n", body.strip()):
        para = re.sub(r"\s+", " ", re.sub(r"!\[.*?\]\(.*?\)", "", para)).strip()
        if para:
            return para if len(para) <= limit else para[: limit - 1].rsplit(" ", 1)[0] + "…"
    return ""


def load_news():
    news, redirects = [], []
    for folder in sorted((ROOT / "content/post").iterdir()):
        idx = folder / "index.md"
        if not idx.is_file():
            continue
        fm, body = front_matter(idx)
        d = str(fm.get("date", ""))[:10]
        title = clean_str(fm.get("title"))
        if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", d):
            note(f"- News `{folder.name}` has unusable date `{d}`")
            continue
        text = first_paragraph(body)
        news.append({"id": slug(folder.name), "date": d,
                     "headline": f"**{title}.** {text}" if text else f"**{title}.**"})
        redirects.append((f"/post/{folder.name}/", "/news/"))
    news.sort(key=lambda n: n["date"], reverse=True)
    return news, redirects


def load_events():
    events = []
    for folder in sorted((ROOT / "content/event").iterdir()):
        idx = folder / "index.md"
        if not idx.is_file():
            continue
        fm, _ = front_matter(idx)
        events.append({"id": slug(folder.name), "title": clean_str(fm.get("title")),
                       "date": str(fm.get("date", ""))[:10], "summary": clean_str(fm.get("summary")),
                       "location": clean_str(fm.get("location")), "url": clean_str(fm.get("event_url"))})
    events.sort(key=lambda e: e["date"], reverse=True)
    return events


# --------------------------------------------------------------------------- projects / code / teaching / service
def load_projects(out_public, valid_people):
    projects, seen = [], set()
    for fname, kind in (("project.json", "project"), ("code.json", "code")):
        path = ROOT / "static/files" / fname
        if not path.is_file():
            continue
        for group in json.loads(path.read_text(encoding="utf-8")):
            for item in group.get("data", []):
                title = clean_str(item.get("title"))
                pid = slug(title)
                if not pid or pid in seen:
                    continue
                seen.add(pid)
                proj = {"id": pid, "title": title}
                desc = str(item.get("description", "")).strip()
                if group.get("title"):
                    desc = f"*{clean_str(group['title'])}*\n\n{desc}" if desc else f"*{clean_str(group['title'])}*"
                if desc:
                    proj["description"] = desc
                url = clean_str(item.get("url"))
                if http(url):
                    if "github.com" in url:
                        proj["code"] = url
                    else:
                        proj["url"] = url
                img = Path(clean_str(item.get("imageURL")).split("/main/")[-1])
                src = ROOT / img
                if src.is_file():
                    proj["image"] = copy_asset(src, "resources/projects", src.name, out_public)
                ids = []
                for a in item.get("author") or []:
                    m = re.search(r"/author/([^/]+)/", a.get("url", ""))
                    cand = slug(m.group(1)) if m else None
                    if cand in valid_people and cand not in ids:
                        ids.append(cand)
                if ids:
                    proj["personIds"] = ids
                projects.append(proj)
    return projects


def load_teaching():
    path = ROOT / "data/courses.yaml"
    return (yaml.safe_load(path.read_text(encoding="utf-8")) or {}).get("courses", []) if path.is_file() else []


def load_service():
    path = ROOT / "static/files/service.json"
    out = []
    if path.is_file():
        for group in json.loads(path.read_text(encoding="utf-8")):
            for it in group.get("data", [group]):
                out.append(it)
    return out


# --------------------------------------------------------------------------- main
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true", help="write into content/ and public/ instead of _migration/")
    ap.add_argument("--collaborators", choices=["alumni", "visitor", "skip"], default="alumni")
    args = ap.parse_args()

    out = ROOT if args.apply else ROOT / "_migration"
    out_content = out / "content"
    out_public = out / "public"
    if not args.apply and out.exists():
        shutil.rmtree(out)
    out_content.mkdir(parents=True, exist_ok=True)
    work_public = out_public

    people, name_index = load_people(work_public, args.collaborators)
    valid_people = {p["id"] for p in people}
    pubs = load_publications(work_public, name_index)
    news, redirects = load_news()
    events = load_events()
    projects = load_projects(work_public, valid_people)

    # keep legacy /files/ URLs (CVs, resumes, bib files)
    files_src = ROOT / "static/files"
    if files_src.is_dir():
        for f in files_src.iterdir():
            if f.is_file() and f.suffix.lower() in {".pdf", ".bib"}:
                (work_public / "files").mkdir(parents=True, exist_ok=True)
                shutil.copy2(f, work_public / "files" / f.name)

    loose = ROOT / "content/publication/preprint"
    if loose.is_dir():
        for f in loose.glob("*.pdf"):
            (work_public / "publication/preprint").mkdir(parents=True, exist_ok=True)
            shutil.copy2(f, work_public / "publication/preprint" / f.name)
        note(f"- {len(list(loose.glob('*.pdf')))} loose PDFs in `content/publication/preprint/` copied to "
             "`public/publication/preprint/` (old URLs preserved) but NOT linked to papers; link them by hand or by filename.")
    pages = {k: "" for k in ("home", "recruitment", "idiofid", "research", "pictures", "about")}
    pages["home"] = HOME_TEXT
    site = {"url": SITE_URL, "repository": "https://github.com/smilevo/smilevo.github.io",
            "name": SITE_NAME, "description": SITE_DESC, "signupUrl": ""}

    def dump(name, data):
        (out_content / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    dump("people.json", people)
    dump("publications.json", pubs)
    dump("news.json", news)
    dump("projects.json", projects)
    for empty in ("alumni", "awards", "gallery", "opportunities", "sponsors"):
        dump(f"{empty}.json", [])
    dump("pages.json", pages)
    dump("site.json", site)
    # Sections the template has no page for yet
    extra = out / "_migration_extra" if args.apply else out / "extra"
    extra.mkdir(parents=True, exist_ok=True)
    (extra / "events.json").write_text(json.dumps(events, ensure_ascii=False, indent=2), encoding="utf-8")
    (extra / "teaching.json").write_text(json.dumps(load_teaching(), ensure_ascii=False, indent=2), encoding="utf-8")
    (extra / "service.json").write_text(json.dumps(load_service(), ensure_ascii=False, indent=2), encoding="utf-8")

    redirects += [("/newsfeed/", "/news/"), ("/people/", "/team/"), ("/publication/", "/publications/"),
                  ("/event/", "/news/"), ("/project/", "/research/"), ("/code/", "/research/"),
                  ("/contact/", "/join/")]
    redirects += [(f"/publication/{p['id']}/", f"/publications/{p['id']}/") for p in pubs]
    redirects += [(f"/author/{p['id']}/", f"/people/{p['id']}/") for p in people]
    # Consumed by scripts/export-aliases.mjs, which writes a meta-refresh page for each legacy URL.
    dump("redirects.json", [{"from": a, "to": b} for a, b in redirects])

    by_status = {}
    for p in people:
        by_status[p["status"]] = by_status.get(p["status"], 0) + 1
    summary = (f"# Migration report ({date.today()})\n\n"
               f"- People: {len(people)} {by_status}\n- Publications: {len(pubs)} "
               f"({sum(1 for p in pubs if 'pdf' in p)} with PDF, {sum(1 for p in pubs if p['personIds'])} linked to a profile)\n"
               f"- News: {len(news)}  Events: {len(events)}  Projects/code: {len(projects)}\n"
               f"- Redirect rules: {len(redirects)}\n\n## Items needing review\n\n")
    (out / "REPORT.md").write_text(summary + "\n".join(report) + "\n", encoding="utf-8")
    print(summary + "\n".join(report[:15]))
    print(f"\nWrote {'into repo' if args.apply else '_migration/'}; full report: {out / 'REPORT.md'}")


if __name__ == "__main__":
    main()
