import homepage from '../data/homepage.json';

const navigation = [
  ['#highlights', 'Group highlights'],
  ['#research', 'Research'],
  ['#team', 'People'],
  ['#publications', 'Publications'],
  ['#support', 'Support'],
];

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="SMILE site navigation">
      <a className="brand-link" href="#home" aria-label="SMILE Research Group home">
        <span className="brand-mark">SMILE</span>
        <span className="brand-description">Research Group</span>
      </a>
      <p className="brand-expanded">{homepage.site.expandedName}</p>

      <nav className="primary-nav" aria-label="Page sections">
        {navigation.map(([href, label]) => (
          <a href={href} key={href}>{label}</a>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <p>{homepage.site.college}</p>
        <a href={homepage.site.profileUrl} target="_blank" rel="noreferrer">
          {homepage.site.institution} <span aria-hidden="true">↗</span>
        </a>
        <a className="sidebar-site-link" href={homepage.site.url} target="_blank" rel="noreferrer">
          Current website <span aria-hidden="true">↗</span>
        </a>
      </div>
    </aside>
  );
}
