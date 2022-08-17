import { defineConfig } from 'vite'
import { dirname, relative } from "path";
import preact from '@preact/preset-vite'

import { r, port, isDev } from './scripts/utils'

export const sharedConfig = {
  root: r("src"),
  define: {
    __DEV__: isDev,
  },
  resolve: {
    alias: {
      "~/": `${r("src")}/`,
    },
  },
  plugins: [
    preact(),
    {
      name: "assets-rewrite",
      enforce: "post",
      apply: "build",
      transformIndexHtml(html, { path }) {
        return html.replace(
          /"\/assets\//g,
          `"${relative(dirname(path), "/assets")}/`
        );
      },
    },
  ],
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  ...sharedConfig,
  server: {
    port,
    hmr: {
      host: "localhost",
    },
  },
  build: {
    outDir: r("extension/dist"),
    emptyOutDir: false,
    sourcemap: isDev ? "inline" : false,
  },
  plugins: [...sharedConfig.plugins],
}));
