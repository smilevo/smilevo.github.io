import { PLATFORMS, validFacebookPostUrl, validLinkedInUrn } from './social.mjs';
const idPattern = /^[a-zA-Z0-9_-]+$/;
export const collections = [
  'publications',
  'people',
  'news',
  'alumni',
  'sponsors',
  'awards',
  'projects',
  'opportunities',
  'gallery',
  'events',
  'teaching',
  'service',
  'funding',
  'talks',
  'social',
];
export function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}
export function validUrl(value) {
  try {
    const url = new URL(value);
    return (
      ['https:', 'http:'].includes(url.protocol) && !!url.hostname && !url.username && !url.password
    );
  } catch {
    return false;
  }
}
const PERSON_LINKS = [
  'linkedin',
  'github',
  'scholar',
  'twitter',
  'dblp',
  'researchgate',
  'orcid',
  'cv',
  'email',
];

export function validateContent(data, assetExists = () => true) {
  const errors = [];
  const fail = (label, message) => errors.push(`${label}: ${message}`);
  const text = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) fail(label, 'expected nonempty text');
  };
  const date = (value, label) => {
    if (!validDate(value)) fail(label, 'expected a real YYYY-MM-DD date');
  };
  const eventDate = (value, label) => {
    if (typeof value === 'string' && /^[1-9]\d{3}$/.test(value)) return;
    date(value, label);
  };
  const url = (value, label) => {
    if (value && !validUrl(value)) fail(label, 'expected an http(s) URL without credentials');
  };
  const asset = (value, label, external = false) => {
    if (!value) return;
    if (external && validUrl(value)) return;
    if (
      typeof value !== 'string' ||
      !value.startsWith('/') ||
      value.startsWith('//') ||
      /[\\?#]/.test(value) ||
      value.split('/').includes('..') ||
      !assetExists(value)
    )
      fail(label, 'missing or invalid asset');
  };
  const strings = (value, label) => {
    if (
      !Array.isArray(value) ||
      value.some((v) => typeof v !== 'string' || !v.trim()) ||
      new Set(value).size !== value.length
    )
      fail(label, 'expected unique text values');
  };
  for (const name of collections) if (!Array.isArray(data[name])) fail(name, 'expected an array');
  if (errors.length) return errors;
  const ids = {};
  for (const name of collections.filter((n) => !['alumni', 'sponsors'].includes(n))) {
    ids[name] = new Set();
    for (const row of data[name]) {
      if (!row || typeof row !== 'object' || Array.isArray(row)) {
        fail(name, 'expected records');
        continue;
      }
      if (!idPattern.test(row.id || '') || ids[name].has(row.id))
        fail(name, `invalid or duplicate ID ${row.id}`);
      ids[name].add(row.id);
    }
  }
  if (errors.length) return errors;
  const refs = (row, field, collection, label = row.id) => {
    if (row[field] === undefined) return;
    strings(row[field], `${label}.${field}`);
    if (Array.isArray(row[field]))
      for (const id of row[field])
        if (!ids[collection].has(id)) fail(label, `unknown ${field} reference ${id}`);
  };
  const common = (row) => {
    for (const field of ['reviewedOn', 'reviewOn'])
      if (row[field]) date(row[field], `${row.id}.${field}`);
    refs(row, 'personIds', 'people');
    refs(row, 'publicationIds', 'publications');
    refs(row, 'projectIds', 'projects');
    if (row.sourceUrl) url(row.sourceUrl, `${row.id}.sourceUrl`);
  };
  const dois = new Set();
  for (const p of data.publications) {
    if (!Array.isArray(p.personIds))
      fail(p.id, 'expected explicit personIds (use [] for no profiles)');
    for (const field of ['title', 'authors']) text(p[field], `${p.id}.${field}`);
    if (!Number.isInteger(p.year) || p.year < 1900 || p.year > new Date().getFullYear() + 2)
      fail(p.id, 'invalid year');
    if (
      p.authorNames !== undefined &&
      (!Array.isArray(p.authorNames) ||
        !p.authorNames.length ||
        p.authorNames.some((v) => typeof v !== 'string' || !v.trim()))
    )
      fail(p.id, 'expected authorNames');
    asset(p.image, p.id);
    asset(p.pdf, p.id, true);
    for (const field of ['url', 'code', 'dataset']) url(p[field], `${p.id}.${field}`);
    if (p.doi) {
      const doi = p.doi.replace(/^https?:\/\/(?:dx\.)?doi\.org\//i, '').toLowerCase();
      if (!/^10\.\d{4,9}\/\S+$/.test(doi) || dois.has(doi)) fail(p.id, 'invalid or duplicate DOI');
      dois.add(doi);
    }
    if (p.openalexId && !/^W\d+$/.test(p.openalexId)) fail(p.id, 'invalid OpenAlex work ID');
    if (p.arxivId && !/^(?:\d{4}\.\d{4,5}|[a-z.-]+\/\d{7})(?:v\d+)?$/i.test(p.arxivId))
      fail(p.id, 'invalid arXiv ID');
    if (
      p.status &&
      !['preprint', 'accepted', 'published', 'withdrawn', 'retracted'].includes(p.status)
    )
      fail(p.id, 'invalid publication status');
    if (
      p.type &&
      !['article', 'conference', 'preprint', 'book', 'dataset', 'other'].includes(p.type)
    )
      fail(p.id, 'invalid publication type');
    if (p.topics) strings(p.topics, `${p.id}.topics`);
    if (p.keywords) strings(p.keywords, `${p.id}.keywords`);
    for (const field of ['volume', 'issue', 'pages', 'publisher', 'imageCaption'])
      if (p[field] !== undefined) text(p[field], `${p.id}.${field}`);
    if (p.imageSource !== undefined && !['paper', 'generated'].includes(p.imageSource))
      fail(p.id, 'imageSource must be paper or generated');
    if (p.venueShort !== undefined) text(p.venueShort, `${p.id}.venueShort`);
    if (p.highlight !== undefined && typeof p.highlight !== 'boolean')
      fail(p.id, 'highlight must be boolean');
    common(p);
  }
  for (const p of data.people) {
    for (const field of ['name', 'role']) text(p[field], `${p.id}.${field}`);
    if (!['member', 'visitor', 'collaborator', 'alumni'].includes(p.status))
      fail(p.id, 'invalid membership status');
    if (!Number.isFinite(p.priority)) fail(p.id, 'priority must be numeric');
    strings(p.topics, `${p.id}.topics`);
    asset(p.image, p.id);
    url(p.website, p.id);
    if (p.bio !== undefined) text(p.bio, `${p.id}.bio`);
    if (p.organization !== undefined) text(p.organization, `${p.id}.organization`);
    url(p.organizationUrl, `${p.id}.organizationUrl`);
    if (p.education !== undefined) {
      if (!Array.isArray(p.education)) fail(p.id, 'education must be an array');
      for (const e of p.education) {
        text(e.degree, `${p.id}.education.degree`);
        text(e.institution, `${p.id}.education.institution`);
        if (e.years !== undefined) text(e.years, `${p.id}.education.years`);
      }
    }
    if (p.links !== undefined) {
      if (!p.links || typeof p.links !== 'object' || Array.isArray(p.links))
        fail(p.id, 'links must be an object');
      for (const [key, value] of Object.entries(p.links)) {
        if (!PERSON_LINKS.includes(key)) fail(p.id, `unknown link type ${key}`);
        if (key === 'email') {
          if (!/^[^@\s]+@[^@\s]+\.[A-Za-z]{2,}$/.test(value)) fail(p.id, 'invalid email');
        } else if (key === 'cv') {
          if (!/^(https?:\/\/|\/(?!\/))/.test(value)) fail(p.id, 'cv must be a URL or site path');
        } else url(value, `${p.id}.links.${key}`);
      }
    }
    if (p.photoCrop !== undefined) {
      const crop = p.photoCrop;
      if (
        !crop ||
        typeof crop !== 'object' ||
        Array.isArray(crop) ||
        !Number.isFinite(crop.scale) ||
        crop.scale < 1 ||
        crop.scale > 2 ||
        !Number.isFinite(crop.x) ||
        crop.x < 0 ||
        crop.x > 100 ||
        !Number.isFinite(crop.y) ||
        crop.y < 0 ||
        crop.y > 100
      )
        fail(p.id, 'photoCrop needs scale between 1 and 2 and x/y percentages between 0 and 100');
    }
    if (p.aliases) strings(p.aliases, `${p.id}.aliases`);
    if (p.memberships !== undefined) {
      if (!Array.isArray(p.memberships)) fail(p.id, 'memberships must be an array');
      else
        for (const period of p.memberships) {
          date(period.start, p.id);
          if (period.end) {
            date(period.end, p.id);
            if (period.end < period.start) fail(p.id, 'membership ends before it starts');
          }
        }
    }
    common(p);
  }
  for (const n of data.news) {
    text(n.headline, n.id);
    eventDate(n.date, n.id);
    common(n);
    refs(n, 'awardIds', 'awards');
  }
  for (const a of data.awards) {
    for (const field of ['title', 'organization', 'sourceUrl']) text(a[field], `${a.id}.${field}`);
    eventDate(a.date, a.id);
    common(a);
    if (a.recipientNames !== undefined) strings(a.recipientNames, `${a.id}.recipientNames`);
    if (a.recipientLabel !== undefined) text(a.recipientLabel, `${a.id}.recipientLabel`);
    if (a.kind !== undefined) text(a.kind, `${a.id}.kind`);
    if (a.highlight !== undefined && typeof a.highlight !== 'boolean')
      fail(a.id, 'highlight must be boolean');
    if (
      a.dateLabel !== undefined &&
      (typeof a.dateLabel !== 'string' ||
        !/^[1-9]\d{3}–[1-9]\d{3}$/.test(a.dateLabel) ||
        a.dateLabel.slice(0, 4) !== a.date ||
        a.dateLabel.slice(5) < a.date)
    )
      fail(a.id, 'dateLabel must be a year range starting with date');
    if (!(a.personIds?.length || a.publicationIds?.length || a.recipientNames?.length))
      fail(a.id, 'award needs a recipient or paper');
  }
  for (const p of data.projects) {
    text(p.title, p.id);
    url(p.url, p.id);
    url(p.code, p.id);
    url(p.dataset, p.id);
    asset(p.image, p.id);
    common(p);
  }
  for (const o of data.opportunities) {
    for (const field of ['title', 'ownerId', 'url', 'description', 'actionLabel'])
      text(o[field], `${o.id}.${field}`);
    if (!ids.people.has(o.ownerId)) fail(o.id, 'unknown ownerId');
    if (!['open', 'closed', 'draft'].includes(o.status)) fail(o.id, 'invalid opportunity status');
    if (!o.reviewedOn) fail(o.id, 'missing reviewedOn');
    if (o.meta !== undefined) strings(o.meta, `${o.id}.meta`);
    if (o.sourceUrl && !o.sourceLabel) fail(o.id, 'sourceUrl needs sourceLabel');
    if (o.sourceLabel) {
      text(o.sourceLabel, `${o.id}.sourceLabel`);
      if (!o.sourceUrl) fail(o.id, 'sourceLabel needs sourceUrl');
    }
    date(o.reviewOn, o.id);
    if (o.closesOn) date(o.closesOn, o.id);
    url(o.url, o.id);
    common(o);
  }
  for (const p of data.gallery) {
    text(p.image, p.id);
    text(p.alt, p.id);
    asset(p.image, p.id);
    if (p.date) date(p.date, p.id);
    common(p);
  }
  for (const a of data.alumni) {
    text(a.name, 'alumni');
    url(a.site, a.name);
  }
  for (const s of data.sponsors) {
    text(s.name, 'sponsor');
    text(s.path, s.name);
    asset(`/resources${s.path}`, s.name);
    url(s.url, s.name);
    if (s.reviewOn) date(s.reviewOn, s.name);
  }
  if (!data.site || typeof data.site !== 'object') fail('site', 'missing settings');
  else {
    for (const f of ['url', 'repository']) {
      text(data.site[f], `site.${f}`);
      url(data.site[f], `site.${f}`);
    }
    text(data.site.name, 'site.name');
  }
  if (
    !data.pages ||
    typeof data.pages !== 'object' ||
    ['home', 'recruitment', 'idiofid', 'research', 'pictures', 'about'].some(
      (k) => typeof data.pages[k] !== 'string',
    )
  )
    fail('pages', 'expected Markdown strings for every page');
  for (const e of data.events) {
    text(e.title, `${e.id}.title`);
    eventDate(e.date, `${e.id}.date`);
    url(e.url, `${e.id}.url`);
  }
  for (const c of data.teaching) {
    text(c.title, `${c.id}.title`);
    text(c.term, `${c.id}.term`);
    if (!Number.isInteger(c.year)) fail(c.id, 'invalid year');
    asset(c.image, c.id);
  }
  for (const r of data.service) {
    text(r.text, `${r.id}.text`);
    if (!Number.isInteger(r.year)) fail(r.id, 'invalid year');
    url(r.url, `${r.id}.url`);
  }
  for (const f of data.funding) {
    for (const field of ['title', 'sponsor', 'role', 'period']) text(f[field], `${f.id}.${field}`);
    if (!Number.isInteger(f.start)) fail(f.id, 'invalid start year');
    if (!Number.isFinite(f.amount) || f.amount < 0) fail(f.id, 'invalid amount');
    if (!['active', 'completed'].includes(f.status))
      fail(f.id, 'status must be active or completed');
    url(f.url, `${f.id}.url`);
  }
  for (const t of data.talks) {
    text(t.title, `${t.id}.title`);
    text(t.venue, `${t.id}.venue`);
    if (!Number.isInteger(t.year)) fail(t.id, 'invalid year');
    url(t.url, `${t.id}.url`);
  }
  const seenPosts = new Set();
  for (const post of data.social) {
    date(post.date, `${post.id}.date`);
    if (post.approxDate !== undefined && typeof post.approxDate !== 'boolean')
      fail(post.id, 'approxDate must be true or false');
    if (!PLATFORMS.includes(post.platform)) {
      fail(post.id, `platform must be one of: ${PLATFORMS.join(', ')}`);
      continue;
    }
    let key;
    if (post.platform === 'facebook') {
      if (!validFacebookPostUrl(post.url))
        fail(
          post.id,
          'expected a https://www.facebook.com/<profile>/posts/<number or pfbid...> URL',
        );
      key = post.url;
    } else {
      if (!validLinkedInUrn(post.urn))
        fail(post.id, 'expected a LinkedIn urn such as urn:li:share:1234567890');
      if (
        post.height !== undefined &&
        !(Number.isInteger(post.height) && post.height >= 200 && post.height <= 3000)
      )
        fail(post.id, 'height must be a whole number from 200 to 3000');
      key = post.urn;
    }
    if (seenPosts.has(key)) fail(post.id, 'duplicate post');
    seenPosts.add(key);
  }
  return errors;
}
