import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const data = JSON.parse(readFileSync(path.join(projectDir, 'data/homepage.json'), 'utf8'));

function nonEmpty(value, label) {
  assert.equal(typeof value, 'string', `${label} must be a string`);
  assert.ok(value.trim().length > 0, `${label} must not be empty`);
}

function httpsUrl(value, label) {
  nonEmpty(value, label);
  const parsed = new URL(value);
  assert.equal(parsed.protocol, 'https:', `${label} must use HTTPS`);
  assert.ok(!parsed.username && !parsed.password, `${label} must not contain credentials`);
}

function localImage(value, label) {
  nonEmpty(value, label);
  assert.ok(value.startsWith('/') && !value.startsWith('//'), `${label} must be an absolute public path`);
  const resolved = path.resolve(projectDir, 'public', `.${value}`);
  assert.ok(resolved.startsWith(path.resolve(projectDir, 'public') + path.sep), `${label} must stay inside public/`);
  assert.ok(existsSync(resolved), `${label} not found: ${resolved}`);
}

for (const key of ['name', 'expandedName', 'institution', 'college', 'description', 'contactEmail', 'heroImage', 'heroImageAlt', 'profileUrl', 'teamUrl']) {
  nonEmpty(data.site?.[key], `site.${key}`);
}
httpsUrl(data.site.url, 'site.url');
httpsUrl(data.site.profileUrl, 'site.profileUrl');
httpsUrl(data.site.teamUrl, 'site.teamUrl');
assert.match(data.site.contactEmail, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'site.contactEmail must be a valid email address');
localImage(data.site.heroImage, 'site.heroImage');

assert.ok(Array.isArray(data.researchAreas) && data.researchAreas.length > 0, 'researchAreas must not be empty');
for (const [index, area] of data.researchAreas.entries()) {
  nonEmpty(area.number, `researchAreas[${index}].number`);
  nonEmpty(area.title, `researchAreas[${index}].title`);
  nonEmpty(area.description, `researchAreas[${index}].description`);
}

for (const key of ['name', 'role', 'image', 'imageAlt', 'biography', 'directoryUrl']) {
  nonEmpty(data.teamLead?.[key], `teamLead.${key}`);
}
localImage(data.teamLead.image, 'teamLead.image');
httpsUrl(data.teamLead.directoryUrl, 'teamLead.directoryUrl');

assert.ok(Array.isArray(data.highlights) && data.highlights.length > 0, 'highlights must not be empty');
let previousHighlightDate = '9999-12-31';
for (const [index, item] of data.highlights.entries()) {
  for (const key of ['title', 'date', 'label', 'description', 'image', 'imageAlt', 'sourceUrl']) {
    nonEmpty(item[key], `highlights[${index}].${key}`);
  }
  assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(item.date) && !Number.isNaN(Date.parse(`${item.date}T00:00:00Z`)), `highlights[${index}].date must be YYYY-MM-DD`);
  assert.ok(item.date <= previousHighlightDate, 'highlights must be ordered newest first');
  previousHighlightDate = item.date;
  localImage(item.image, `highlights[${index}].image`);
  httpsUrl(item.sourceUrl, `highlights[${index}].sourceUrl`);
}

assert.ok(Array.isArray(data.publications) && data.publications.length > 0, 'publications must not be empty');
const seenDois = new Set();
let previousPublicationYear = Infinity;
for (const [index, paper] of data.publications.entries()) {
  for (const key of ['title', 'venue', 'doi', 'authors']) {
    nonEmpty(paper[key], `publications[${index}].${key}`);
  }
  assert.ok(Number.isInteger(paper.year) && paper.year >= 1900, `publications[${index}].year must be a valid year`);
  assert.ok(paper.year <= previousPublicationYear, 'publications must be ordered newest first');
  previousPublicationYear = paper.year;
  assert.ok(!seenDois.has(paper.doi), `duplicate DOI: ${paper.doi}`);
  seenDois.add(paper.doi);
}

for (const key of ['program', 'awardNumber', 'title', 'period', 'role', 'awardUrl', 'announcementUrl']) {
  nonEmpty(data.support?.[key], `support.${key}`);
}
httpsUrl(data.support.awardUrl, 'support.awardUrl');
httpsUrl(data.support.announcementUrl, 'support.announcementUrl');
for (const key of ['scholar', 'linkedin', 'github']) {
  httpsUrl(data.links?.[key], `links.${key}`);
}

const routeManifest = JSON.parse(readFileSync(path.join(projectDir, 'public/manus-routes.json'), 'utf8'));
assert.deepEqual(routeManifest.routes, [{ path: '/', title: 'SMILE Research Group' }], 'route manifest must match the Phase 2 homepage-only scope');

console.log(`Validated homepage content, ${data.researchAreas.length} research areas, ${data.highlights.length} highlights, ${data.publications.length} publications, local image assets, and the homepage route manifest.`);
