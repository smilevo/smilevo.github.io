import { opportunities, people, safeUrl, pageContent } from '@/lib/content';
import { openOpportunities } from '@/lib/relationships.mjs';
import ReactMarkdown from 'react-markdown';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Join us',
  description:
    'Opportunities for students at all levels to join the SMILE Research Group at the University of Michigan-Flint.',
  alternates: { canonical: '/join/' },
};

export default function Join() {
  const open = openOpportunities(opportunities);
  return (
    <>
      <PageHeading title="Join us">
        We welcome motivated students at all levels (bachelor’s, master’s and PhD) to join the SMILE
        Research Group at the University of Michigan-Flint.
      </PageHeading>
      {pageContent.recruitment.trim() && (
        <section className="section prose">
          <ReactMarkdown>{pageContent.recruitment}</ReactMarkdown>
        </section>
      )}
      {open.length > 0 ? (
        <div className="opportunity-grid">
          {open.map((opportunity) => {
            const owner = people.find((person) => person.id === opportunity.ownerId);
            return (
              <article className="opportunity-card" key={opportunity.id}>
                <h2>{opportunity.title}</h2>
                {owner && <p className="opportunity-owner">Faculty lead: {owner.name}</p>}
                {opportunity.description && (
                  <div className="opportunity-description">
                    <ReactMarkdown>{opportunity.description}</ReactMarkdown>
                  </div>
                )}
                {opportunity.meta?.length > 0 && (
                  <ul className="opportunity-meta">
                    {opportunity.meta.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                <div className="opportunity-actions">
                  <a className="button" href={safeUrl(opportunity.url)}>
                    {opportunity.actionLabel}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
                <div className="opportunity-guidance">
                  {opportunity.sourceUrl && (
                    <a className="text-link" href={safeUrl(opportunity.sourceUrl)}>
                      {opportunity.sourceLabel}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </>
  );
}
