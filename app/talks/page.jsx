import { talks, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Talks',
  description: 'Invited talks and tutorials by Mohamed Wiem Mkaouer.',
  alternates: { canonical: '/talks/' },
};
export default function Talks() {
  const years = [...new Set(talks.map((t) => t.year))];
  return (
    <>
      <PageHeading title="Talks">
        Selected invited talks and tutorials. Earlier talks (2016–2019) covered performance
        regression, API migration, cyberinfrastructure, software quality, refactoring, testing AI
        systems and software evolution.
      </PageHeading>
      {years.map((year) => (
        <section className="section" key={year} id={`y${year}`}>
          <h2>{year}</h2>
          <ul>
            {talks
              .filter((t) => t.year === year)
              .map((t) => (
                <li key={t.id}>
                  {safeUrl(t.url) ? <a href={safeUrl(t.url)}>“{t.title}”</a> : <>“{t.title}”</>},{' '}
                  {t.venue}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
