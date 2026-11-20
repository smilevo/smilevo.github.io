import { events, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
import EventDate from '@/components/event-date';
export const metadata = {
  title: 'Events',
  description: 'Talks and presentations by members of the SMILE Research Group.',
  alternates: { canonical: '/events/' },
};
export default function Events() {
  return (
    <>
      <PageHeading title="Events">
        Talks and presentations by members of the SMILE Research Group.
      </PageHeading>
      {events.map((e) => (
        <article className="news-item" key={e.id} id={e.id}>
          <EventDate date={e.date} />
          <div className="prose">
            <h2 className="award-title">
              {safeUrl(e.url) ? <a href={safeUrl(e.url)}>{e.title}</a> : e.title}
            </h2>
            {e.summary && <p>{e.summary}</p>}
            {e.location && <p>{e.location}</p>}
          </div>
        </article>
      ))}
    </>
  );
}
