import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "sanity:client";

export const imageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source) {
  return imageBuilder.image(source).toString();
}

export function getImageObj(source, width, height) {
  return imageBuilder.image(source);
}
export function heightForImage(source, width) {
  return null;
}
