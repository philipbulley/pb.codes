import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import { ThemeProvider } from 'styled-components';
import SiteLayout from './components/layout';
import GlobalStyle from './shared/global-style';
import theme, {
  themeBlueAccent,
  themeRedAccent,
  themeYellowAccent,
} from './shared/theme';

const themeOverrides = {
  '/projects': themeBlueAccent,
  '/about': themeYellowAccent,
  '/contact': themeRedAccent,
};

const getTheme = pathname =>
  themeOverrides[
    Object.keys(themeOverrides).find(key => pathname.startsWith(key))
  ] || theme;

export const meta = ({ location }) => [
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
  { name: 'theme-color', content: getTheme(location.pathname).color.accent },
];

export const links = () => [
  { rel: 'icon', type: 'image/png', href: '/favicon.png' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/manifest.webmanifest' },
];

export function Layout({ children }) {
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
      </body>
    </html>
  );
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <ThemeProvider theme={getTheme(pathname)}>
      <GlobalStyle />
      <SiteLayout>
        <Outlet />
      </SiteLayout>
    </ThemeProvider>
  );
}
