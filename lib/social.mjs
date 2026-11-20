// Helpers for the social media carousel and feed (Facebook and LinkedIn). Posts must be public to be embedded.
export const FACEBOOK_POST_URL =
  /^https:\/\/www\.facebook\.com\/[A-Za-z0-9.\-_]+\/posts\/(\d+|pfbid[A-Za-z0-9]+)\/?$/;
export const LINKEDIN_URN = /^urn:li:(share|ugcPost|activity):\d+$/;
export const LINKEDIN_DEFAULT_HEIGHT = 600;
// Tall LinkedIn posts scroll inside the homepage carousel instead of stretching it.
export const CAROUSEL_MAX_HEIGHT = 700;
export const CAROUSEL_COUNT = 5;
export const FEED_PAGE_SIZE = 10;
// Same SDK version the previous Hugo site used. Meta's embedded-posts docs still show it.
export const FACEBOOK_SDK_VERSION = 'v3.2';

export function validFacebookPostUrl(value) {
  return typeof value === 'string' && FACEBOOK_POST_URL.test(value);
}

export function paginate(items, page, size = FEED_PAGE_SIZE) {
  const pages = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, Math.trunc(page) || 1), pages);
  return { page: current, pages, items: items.slice((current - 1) * size, current * size) };
}

export function wrapIndex(index, length) {
  return length ? ((index % length) + length) % length : 0;
}

export function validLinkedInUrn(value) {
  return typeof value === 'string' && LINKEDIN_URN.test(value);
}

/** Address of the embeddable (iframe) version of a LinkedIn post. */
export function linkedInEmbedUrl(urn) {
  return `https://www.linkedin.com/embed/feed/update/${urn}?collapsed=1`;
}

/** Address of the post on LinkedIn itself, for the "View on LinkedIn" link. */
export function linkedInPostUrl(urn) {
  return `https://www.linkedin.com/feed/update/${urn}/`;
}

export const PLATFORMS = ['facebook', 'linkedin'];
export const PLATFORM_LABELS = { facebook: 'Facebook', linkedin: 'LinkedIn' };

/** Newest first by `date`. Posts with the same date keep the order they have in the file. */
export function sortNewestFirst(posts) {
  return posts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => b.post.date.localeCompare(a.post.date) || a.index - b.index)
    .map(({ post }) => post);
}
