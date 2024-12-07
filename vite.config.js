import { defineConfig } from 'vite';
export default defineConfig({
  server: {
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
