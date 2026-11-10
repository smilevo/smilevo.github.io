import homepage from '../data/homepage.json';
import HighlightsCarousel from '../components/highlights-carousel';

export const metadata = {
  title: 'Home',
};

function SectionHeading({ eyebrow, title, id }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

export default function HomePage() {
  const { site, researchAreas, teamLead, highlights, publications, support, links } = homepage;

  return (
    <div className="home-page" id="home">
      <header className="hero">
        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src={site.heroImage}
            alt={site.heroImageAlt}
            width="1920"
            height="1080"
            fetchPriority="high"
          />
          <span className="hero-image-caption">SMILE at ASE 2022</span>
        </div>
        <div className="hero-copy">
          <p className="eyebrow">{site.institution} · {site.college}</p>
          <h1>{site.expandedName}</h1>
          <p className="hero-deck">SMILE Research Group</p>
          <p className="hero-description">{site.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={`mailto:${site.contactEmail}`}>
              Contact the group
            </a>
            <a className="text-link" href="#research">
              Explore our research <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </header>

      <HighlightsCarousel items={highlights} />

      <section className="section research-section" id="research" aria-labelledby="research-heading">
        <SectionHeading eyebrow="What we work on" title="Research directions" id="research-heading" />
        <div className="research-list">
          {researchAreas.map((area) => (
            <article className="research-card" key={area.number}>
              <span className="research-number">{area.number}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section team-section" id="team" aria-labelledby="team-heading">
        <SectionHeading eyebrow="People behind the work" title="Meet SMILE" id="team-heading" />
        <div className="team-feature">
          <img
            className="team-photo"
            src={teamLead.image}
            alt={teamLead.imageAlt}
            width="270"
            height="270"
            loading="lazy"
          />
          <div className="team-copy">
            <p className="eyebrow">Principal Investigator</p>
            <h3>{teamLead.name}</h3>
            <p className="team-role">{teamLead.role}</p>
            <p>{teamLead.biography}</p>
            <div className="inline-links">
              <a href={teamLead.directoryUrl} target="_blank" rel="noreferrer">
                University profile <span aria-hidden="true">↗</span>
              </a>
              <a href={site.teamUrl} target="_blank" rel="noreferrer">
                Current team directory <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
        <div className="profile-links" aria-label="Academic profiles">
          <a href={links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
          <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </section>

      <section className="section publications-section" id="publications" aria-labelledby="publications-heading">
        <div className="section-heading section-heading-row">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2 id="publications-heading">Recent publications</h2>
          </div>
          <a className="text-link" href={`${site.url}/publication/`} target="_blank" rel="noreferrer">
            Browse the full catalogue <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="publication-list">
          {publications.map((paper) => (
            <article className="publication-card" key={paper.doi}>
              <div className="publication-year">{paper.year}</div>
              <div className="publication-main">
                <h3>
                  <a href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer">
                    {paper.title}
                  </a>
                </h3>
                <p>{paper.authors}</p>
                <span className="venue-label">{paper.venue}</span>
              </div>
              <a className="doi-link" href={`https://doi.org/${paper.doi}`} target="_blank" rel="noreferrer" aria-label={`Open DOI for ${paper.title}`}>
                DOI <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section support-section" id="support" aria-labelledby="support-heading">
        <div className="support-card">
          <div className="support-copy">
            <p className="eyebrow">Past and present support</p>
            <h2 id="support-heading">{support.program}</h2>
            <h3>{support.title}</h3>
            <p className="support-award">NSF Award {support.awardNumber} · {support.period}</p>
            <p>{support.role}</p>
            <div className="inline-links">
              <a href={support.awardUrl} target="_blank" rel="noreferrer">
                NSF award record <span aria-hidden="true">↗</span>
              </a>
              <a href={support.announcementUrl} target="_blank" rel="noreferrer">
                UM–Flint announcement <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="support-mark" aria-hidden="true">
            <span>NSF</span>
            <span className="support-mark-rule" />
            <span>GRANTED</span>
          </div>
        </div>
      </section>

      <section className="contact-strip" aria-labelledby="contact-heading">
        <div>
          <p className="eyebrow">Collaborate or join us</p>
          <h2 id="contact-heading">Interested in software engineering research?</h2>
        </div>
        <a className="button button-light" href={`mailto:${site.contactEmail}`}>
          Email SMILE <span aria-hidden="true">↗</span>
        </a>
      </section>
    </div>
  );
}
