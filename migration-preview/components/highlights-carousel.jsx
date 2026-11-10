'use client';

import { useState } from 'react';

function readableDate(value) {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T12:00:00Z`));
}

export default function HighlightsCarousel({ items }) {
  const [active, setActive] = useState(0);
  if (!items.length) return null;

  const item = items[active];
  const previous = () => setActive((index) => Math.max(0, index - 1));
  const next = () => setActive((index) => Math.min(items.length - 1, index + 1));

  return (
    <section
      className="section highlights-section"
      id="highlights"
      aria-label="SMILE group highlights"
      aria-roledescription="carousel"
    >
      <div className="section-heading section-heading-row">
        <div>
          <p className="eyebrow">From the group archive</p>
          <h2>SMILE highlights</h2>
        </div>
        <div className="carousel-controls" aria-label="Highlight controls">
          <button type="button" onClick={previous} disabled={active === 0} aria-label="Previous highlight">
            <span aria-hidden="true">←</span>
          </button>
          <span className="carousel-count" aria-live="polite">{active + 1} / {items.length}</span>
          <button type="button" onClick={next} disabled={active === items.length - 1} aria-label="Next highlight">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <article className="highlight-card" aria-live="polite" aria-atomic="true">
        <a className="highlight-image-link" href={item.sourceUrl} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden="true">
          <img src={item.image} alt="" width="1200" height="800" loading="lazy" />
        </a>
        <div className="highlight-copy">
          <p className="eyebrow">{item.label}</p>
          <h3><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.title}</a></h3>
          <p>{item.description}</p>
          <p className="highlight-date"><time dateTime={item.date}>{readableDate(item.date)}</time></p>
          <a className="text-link" href={item.sourceUrl} target="_blank" rel="noreferrer">
            Read the archive post <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  );
}
