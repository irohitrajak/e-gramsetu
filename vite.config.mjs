import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
// NOTE: If you deploy to GitHub Pages under a repository (https://<user>.github.io/<repo>/)
// you must set the base path to '/<repo>/' so that assets load correctly.
// Change 'e-gramsetu' below to match your repository name OR set BASE_PATH env var in CI.
const repoBase = process.env.BASE_PATH || '/e-gramsetu/';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? repoBase : '/',
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
}); 
