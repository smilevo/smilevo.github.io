import { service, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Service',
  description: 'Professional and academic service by Mohamed Wiem Mkaouer.',
  alternates: { canonical: '/service/' },
};
export default function Service() {
  const years = [...new Set(service.map((s) => s.year))];
  return (
    <>
      <PageHeading title="Service">
        Conference organization, program committees, journal reviewing and department service.
      </PageHeading>
      {years.map((year) => (
        <section className="section" key={year} id={`y${year}`}>
          <h2>{year}</h2>
          <ul>
            {service
              .filter((s) => s.year === year)
              .map((s) => (
                <li key={s.id}>
                  {safeUrl(s.url) ? <a href={safeUrl(s.url)}>{s.text}</a> : s.text}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
