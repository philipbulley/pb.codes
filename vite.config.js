import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  define: {
    // See shared/use-today.js
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
