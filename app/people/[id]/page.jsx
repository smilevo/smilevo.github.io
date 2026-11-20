import PersonPhoto from '@/components/person-photo';
import NewsList from '@/components/news-list';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { people, papers, safeUrl, awards, projects, news } from '@/lib/content';
import { paperBelongsTo, awardsFor, relatedNews } from '@/lib/relationships.mjs';
import AwardList from '@/components/award-list';
import ProjectList from '@/components/project-list';
import PaperCard from '@/components/paper-card';
import PageHeading from '@/components/page-heading';
export const dynamicParams = false;
const LINK_LABELS = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  scholar: 'Google Scholar',
  twitter: 'X (Twitter)',
  dblp: 'DBLP',
  researchgate: 'ResearchGate',
  orcid: 'ORCID',
  cv: 'CV / Résumé',
  email: 'Email',
};
function personLinks(p) {
  return Object.entries(LINK_LABELS)
    .map(([key, label]) => {
      const value = p.links?.[key];
      if (!value) return null;
      const href =
        key === 'email' ? `mailto:${value}` : safeUrl(value) && encodeURI(decodeURI(value));
      return href ? { key, label, href } : null;
    })
    .filter(Boolean);
}
export function generateStaticParams() {
  return people.map((p) => ({ id: p.id }));
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: people.find((p) => p.id === id)?.name || 'Person',
    alternates: { canonical: `/people/${id}/` },
  };
}
export default async function Person({ params }) {
  const { id } = await params;
  const p = people.find((p) => p.id === id);
  if (!p) notFound();
  const related = papers.filter((paper) => paperBelongsTo(paper, p));
  const updates = relatedNews(news, 'personIds', p.id, { awards, projects });
  return (
    <>
      <PageHeading
        title={p.name}
        eyebrow={
          p.status === 'alumni'
            ? 'Past member'
            : p.status === 'collaborator'
              ? 'Collaborator'
              : undefined
        }
      />
      <div className="profile">
        {p.image && <PersonPhoto person={p} />}
        <div>
          <h2>{p.role}</h2>
          {p.organization && (
            <p className="profile-org">
              {safeUrl(p.organizationUrl) ? (
                <a href={safeUrl(p.organizationUrl)}>{p.organization}</a>
              ) : (
                p.organization
              )}
            </p>
          )}
          {personLinks(p).length > 0 && (
            <ul className="profile-links" aria-label="Links">
              {personLinks(p).map((l) => (
                <li key={l.key}>
                  <a className="text-link" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {safeUrl(p.website) && (
            <a className="text-link" href={safeUrl(p.website)}>
              Personal website
            </a>
          )}
          {p.topics.length > 0 && (
            <>
              <h3 className="topics-heading">Research interests</h3>
              <div className="tags">
                {p.topics.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      {(p.bio || p.education?.length > 0) && (
        <section className="section profile-about">
          {p.bio && (
            <>
              <h2>About</h2>
              {p.bio.split(/\n{2,}/).map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </>
          )}
          {p.education?.length > 0 && (
            <>
              <h3 className="topics-heading">Education</h3>
              <ul className="education-list">
                {p.education.map((e) => (
                  <li key={`${e.degree}-${e.institution}`}>
                    <strong>{e.degree}</strong>
                    {e.institution ? `, ${e.institution}` : ''}
                    {e.years ? ` (${e.years})` : ''}
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
      {related.length > 0 && (
        <section className="section">
          <h2>Publications</h2>
          <div className="paper-list">
            {related.map((paper) => (
              <PaperCard key={paper.id} paper={paper} />
            ))}
          </div>
        </section>
      )}
      {updates.length > 0 && (
        <section className="section">
          <h2>News</h2>
          <NewsList news={updates} />
        </section>
      )}
      <AwardList awards={awardsFor(awards, 'personIds', p.id)} />
      <ProjectList projects={projects.filter((project) => project.personIds?.includes(p.id))} />
      <Link className="back-link" href="/team/">
        Team
      </Link>
    </>
  );
}
