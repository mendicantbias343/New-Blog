import { PortableText as PortableTextInternal } from "astro-portabletext";
import { urlForImage } from "./urlForImage";

const customComponents = {
  types: {
    image: ({ value }) => {
      return `
        <picture>
          <source
            srcset="${urlForImage(value.asset).format("webp").url()}"
            type="image/webp"
          />
          <img
            class="responsive__img"
            src="${urlForImage(value.asset).url()}"
            alt="${value.alt}"
          />
        </picture>
      `;
    },
  },
};

export function sanityPortableText(portabletext) {
  return portableTextToHtml(portabletext, customComponents);
}
