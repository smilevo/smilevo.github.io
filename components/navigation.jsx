'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const links = [
  ['/', 'Home'],
  ['/team/', 'Team'],
  ['/publications/', 'Publications'],
  ['/news/', 'News'],
  ['/social/', 'Social media'],
  ['/events/', 'Events'],
  ['/funding/', 'Funding'],
  ['/teaching/', 'Teaching'],
  ['/talks/', 'Talks'],
  ['/service/', 'Service'],
  ['/join/', 'Join us'],
];
export default function Navigation({ extraLinks = [] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main navigation">
      {[...links, ...extraLinks].map(([href, title]) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            pathname === href.slice(0, -1) ||
            (href !== '/' && pathname.startsWith(href)) ||
            (href === '/team/' && pathname.startsWith('/people/')) ||
            (href === '/news/' && pathname.startsWith('/awards'))
              ? 'page'
              : undefined
          }
        >
          {title}
        </Link>
      ))}
    </nav>
  );
}
