import { defineConfig } from 'cypress';

export default defineConfig({
  experimentalWebKitSupport: true,
  e2e: {
    video: false,
    baseUrl: 'http://localhost:5173',
  },
});
