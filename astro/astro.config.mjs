import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import { sanityIntegration } from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://mendicantbias.com",
  integrations: [
    sitemap(),
    tailwind(),
    react(),
    sanityIntegration({
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
