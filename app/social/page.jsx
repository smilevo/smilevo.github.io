import { socialPosts } from '@/lib/content';
import PageHeading from '@/components/page-heading';
import SocialFeed from '@/components/social-feed';
export const metadata = {
  title: 'Social media newsfeed',
  description:
    'Posts from the group’s Facebook and LinkedIn accounts, shown live with their reactions and comments.',
  alternates: { canonical: '/social/' },
};
export default function Social() {
  return (
    <>
      <PageHeading title="Social media newsfeed">
        Posts from Facebook and LinkedIn, shown live with their reactions and comments. Loading them
        contacts those sites.
      </PageHeading>
      {socialPosts.length > 0 ? <SocialFeed posts={socialPosts} /> : <p>No posts available.</p>}
    </>
  );
}
