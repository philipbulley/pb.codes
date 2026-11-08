import type { ReactNode } from 'react';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { Route } from './+types/root';
import SiteLayout from './components/layout';
import { getAccentColor } from './shared/theme';
import './shared/fonts.css';
import './shared/theme.css';
import './shared/global.css';

export const meta = ({ location }: Route.MetaArgs) => [
  { title: 'pb.codes' },
  {
    name: 'description',
    content:
      'Freelance front-end web developer, Philip Bulley, London. TypeScript, JavaScript and React web development.',
  },
  {
    name: 'keywords',
    content:
      'Philip Bulley, web developer London, freelance web developer, React, Redux, RxJS, TypeScript, JavaScript',
  },
  { name: 'theme-color', content: getAccentColor(location.pathname) },
];

export const links: Route.LinksFunction = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {import.meta.env.PROD && (
          // Cloudflare Web Analytics: cookieless, and follows client-side
          // navigation by itself
          <script
            type="module"
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "76113e784ac243e695209ae79585327a"}'
          />
        )}
      </body>
    </html>
  );
}

export default function App() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
