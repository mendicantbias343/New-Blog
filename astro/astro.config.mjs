import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import sanity from "astro-sanity";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [
    sitemap(),
    tailwind(),
    react(),
    sanity({
      projectId: "1s3iny7g",
      dataset: "production",
      apiVersion: "2021-03-25",
      useCdn: true,
    }),
  ],
  build: {
    inlineStylesheets: "always",
  },
});
