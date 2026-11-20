import { funding, safeUrl } from '@/lib/content';
import PageHeading from '@/components/page-heading';
export const metadata = {
  title: 'Funding',
  description: 'Externally funded research awards.',
  alternates: { canonical: '/funding/' },
};
const money = (n) => `$${n.toLocaleString('en-US')}`;
function Awards({ rows }) {
  return rows.map((f) => (
    <article className="news-item" key={f.id} id={f.id}>
      <span className="event-date">{f.period}</span>
      <div className="prose">
        <h3 className="award-title">
          {safeUrl(f.url) ? <a href={safeUrl(f.url)}>{f.title}</a> : f.title}
        </h3>
        <p>
          {f.sponsor} · {money(f.amount)} · {f.role}
        </p>
      </div>
    </article>
  ));
}
export default function Funding() {
  const active = funding.filter((f) => f.status === 'active');
  const completed = funding.filter((f) => f.status === 'completed');
  return (
    <>
      <PageHeading title="Funding">
        Externally funded research awards. Amounts are the total award; the role is Mohamed Wiem
        Mkaouer’s role on the project.
      </PageHeading>
      {active.length > 0 && (
        <section className="section" id="current">
          <h2>Current awards</h2>
          <Awards rows={active} />
        </section>
      )}
      {completed.length > 0 && (
        <section className="section" id="past">
          <h2>Past awards</h2>
          <Awards rows={completed} />
        </section>
      )}
    </>
  );
}
