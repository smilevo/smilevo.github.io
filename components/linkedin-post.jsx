import { LINKEDIN_DEFAULT_HEIGHT, linkedInEmbedUrl, linkedInPostUrl } from '@/lib/social.mjs';

/** One LinkedIn post, shown with LinkedIn's own embed (an iframe). Needs no script. */
export default function LinkedInPost({ urn, height, maxHeight }) {
  const frameHeight = Math.min(height || LINKEDIN_DEFAULT_HEIGHT, maxHeight || Infinity);
  return (
    <div className="li-post-wrap">
      <iframe
        className="li-post"
        src={linkedInEmbedUrl(urn)}
        height={frameHeight}
        width="504"
        loading="lazy"
        allowFullScreen
        title="Embedded LinkedIn post"
      />
      <a
        className="text-link fb-fallback"
        href={linkedInPostUrl(urn)}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on LinkedIn<span aria-hidden="true"> ↗</span>
      </a>
    </div>
  );
}
