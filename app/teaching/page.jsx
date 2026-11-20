import { teaching } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Teaching',
  description: 'Courses taught by Mohamed Wiem Mkaouer.',
  alternates: { canonical: '/teaching/' },
};
export default function Teaching() {
  const institutions = [...new Set(teaching.map((c) => c.institution))];
  return (
    <>
      <PageHeading title="Teaching">
        Courses taught by Mohamed Wiem Mkaouer. A star (*) marks a course that was newly developed.
      </PageHeading>
      {institutions.map((institution) => (
        <section
          className="section"
          key={institution}
          id={institution.toLowerCase().replace(/[^a-z]+/g, '-')}
        >
          <h2>{institution}</h2>
          {teaching
            .filter((c) => c.institution === institution)
            .map((c) => (
              <article className="news-item" key={c.id} id={c.id}>
                <span className="event-date">{c.term}</span>
                <div className="prose">
                  <h3 className="award-title">
                    {c.title}
                    {c.newlyDeveloped ? ' *' : ''}
                  </h3>
                  <p>
                    {c.level}
                    {c.sections ? ` · ${c.sections} section${c.sections > 1 ? 's' : ''}` : ''}
                  </p>
                </div>
              </article>
            ))}
        </section>
      ))}
    </>
  );
}
