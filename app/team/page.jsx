import PersonPhoto from '@/components/person-photo';
import Link from 'next/link';
import { people, alumni, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = { title: 'People', alternates: { canonical: '/team/' } };
function PersonGrid({ members, headingLevel = 3, compact = false }) {
  const Heading = `h${headingLevel}`;
  return (
    <div className={compact ? 'people-grid people-grid-compact' : 'people-grid'}>
      {members.map((p) => (
        <article className="person-card" key={p.id}>
          <Link href={`/people/${p.id}/`}>
            {p.image ? (
              <PersonPhoto person={p} loading="lazy" />
            ) : (
              <div className="person-placeholder" />
            )}
            <Heading>{p.name}</Heading>
          </Link>
          <p>{p.role}</p>
        </article>
      ))}
    </div>
  );
}
// Alphabetical by the name shown on the card, ignoring case and accents.
const byName = (a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });

export default function Team() {
  const members = people.filter((p) => p.status === 'member');
  const visitors = people.filter((p) => p.status === 'visitor');
  const collaborators = people.filter((p) => p.status === 'collaborator').sort(byName);
  const pastMembers = people.filter((p) => p.status === 'alumni').sort(byName);
  // Entries in content/alumni.json that have no profile of their own stay as a plain list.
  const listOnly = alumni.filter(
    (a) => !pastMembers.some((p) => p.name.toLowerCase() === a.name.toLowerCase()),
  );
  return (
    <>
      <PageHeading title="Our Group" />
      <PersonGrid members={members} headingLevel={2} />
      {visitors.length > 0 && (
        <section className="section">
          <h2>Current Visitors</h2>
          <PersonGrid members={visitors} />
        </section>
      )}
      {collaborators.length > 0 && (
        <section className="section">
          <h2>Collaborators</h2>
          <PersonGrid members={collaborators} compact />
        </section>
      )}
      <section className="section">
        <h2>Past members</h2>
        <PersonGrid members={pastMembers} compact />
        {listOnly.length > 0 && (
          <ul className="alumni-list">
            {listOnly.map((a) => (
              <li key={a.name}>
                {safeUrl(a.site) ? <a href={safeUrl(a.site)}>{a.name}</a> : a.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
