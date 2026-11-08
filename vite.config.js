import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [reactRouter()],
  // styled-components' CJS default export doesn't survive Node's ESM interop
  ssr: { noExternal: ['styled-components'] },
});
