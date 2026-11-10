import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    // Ship one stylesheet, linked from every pre-rendered page. Per-route CSS
    // is otherwise fetched on client navigation, and WebKit (all iOS
    // browsers) paints the new route before that stylesheet applies, which
    // flashes unstyled content. The site's CSS is small enough to load once.
    cssCodeSplit: false,
  },
  define: {
    // See src/shared/use-today.ts
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
