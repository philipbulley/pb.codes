import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  define: {
    // See src/shared/use-today.ts
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
