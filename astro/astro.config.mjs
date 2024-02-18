import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import robots from "astro-robots"; // Add code manually
import { sanityIntegration } from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://mendicantbias.com",
  integrations: [
    sitemap(),
    tailwind(),
    robots({
      host: "https://mendicantbias.com",
      sitemap: [
        "https://mendicantbias.com/sitemap.xml",
        "https://www.mendicantbias.com/sitemap.xml",
      ],
      policy: [
        {
          userAgent: [
            "Applebot",
            "Googlebot",
            "bingbot",
            "Yandex",
            "Yeti",
            "Baiduspider",
            "360Spider",
            "*",
          ],
          allow: ["/"],
          disallow: ["/admin", "/login"],
          crawlDelay: 5,
          cleanParam: ["sid /", "s /forum/showthread"],
        },
        {
          userAgent: "BLEXBot",
          disallow: ["/assets", "/uploades/1989-08-21/*jpg$"],
        },
      ],
    }),
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
  redirects: {
    "/tag/": "/notes",
  },
});
