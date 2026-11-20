import FacebookPost from '@/components/facebook-post';
import LinkedInPost from '@/components/linkedin-post';
import { PLATFORM_LABELS } from '@/lib/social.mjs';

/** One post from either network, with a small label saying where it comes from. */
export default function SocialPost({ post, maxHeight }) {
  return (
    <div className={`social-post social-${post.platform}`}>
      <span className="social-badge">{PLATFORM_LABELS[post.platform]}</span>
      {post.platform === 'linkedin' ? (
        <LinkedInPost urn={post.urn} height={post.height} maxHeight={maxHeight} />
      ) : (
        <FacebookPost url={post.url} />
      )}
    </div>
  );
}
