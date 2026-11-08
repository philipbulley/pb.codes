import type { Config } from '@react-router/dev/config';

export default {
  appDirectory: 'src',
  // Static hosting (Netlify): no runtime server
  ssr: false,
  // Pre-render every static route to its own HTML file. The not-found splat
  // route is served via the SPA fallback (see netlify.toml).
  prerender: ({ getStaticPaths }) => getStaticPaths(),
} satisfies Config;
