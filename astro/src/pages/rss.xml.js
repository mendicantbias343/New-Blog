import rss from "@astrojs/rss";
import { getSiteSettings, getItemsWithLimit } from "../sanity/api";

const data = await getSiteSettings();
const posts = await getItemsWithLimit(20);

const items = posts.map((item) => {
  return {
    title: item.title,
    ////
  };
});

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: "Mendicant Bias - A blog by Rameez Kakodker",
    // `<description>` field in output xml
    description: data.description,
    link: data.url,
    copyright: "Copyright 2024, Rameez Kakodker",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: items,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
