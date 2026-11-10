import homepage from '../data/homepage.json';
import Sidebar from '../components/sidebar';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || homepage.site.url;

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${homepage.site.name} | ${homepage.site.institution}`,
    template: `%s | ${homepage.site.name}`,
  },
  description: homepage.site.description,
  alternates: { canonical: '/' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="site-layout">
          <Sidebar />
          <div className="site-column">
            <main id="main" tabIndex={-1}>
              {children}
            </main>
            <footer className="site-footer">
              <div>
                <p className="footer-brand">{homepage.site.name}</p>
                <p>
                  {homepage.site.college}
                  <br />
                  {homepage.site.institution}
                </p>
              </div>
              <p className="footer-note">
                Migration preview only. The existing Hugo site remains the production website.
              </p>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
