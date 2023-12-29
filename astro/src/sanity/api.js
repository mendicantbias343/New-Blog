import { useSanityClient, groq } from "astro-sanity";

export async function getPosts(types) {
  let query = "";
  if (types == "post") {
    query = groq`*[_type == "post"] {
      _createdAt,
        "cats":categories[]->{title, slug},
        title,
        "slug" : slug.current,
        summary,
        body,
        "image" : mainImage.asset._ref,
        readtime,
        _type
    } | order(_createdAt desc)`;
  } else if (types == "note") {
    query = groq`*[_type == "note"] {
      title,
    _createdAt,
    _id,
    body,
    "slug" : slug.current,
    "notetags" : notetags[]{label} ,
    _type,
    readingtime,
    summary
    } | order(_createdAt desc)`;
  } else {
    //homepage view
    query = groq`*[_type == "post" || _type=="note"] {
      _createdAt,
        title,
        "slug" : slug.current,
        summary,
        "image" : mainImage.asset._ref,
        readtime,
        _type

    } | order(_createdAt desc)`;
  }

  const posts = await useSanityClient().fetch(query);
  return posts;
}

export async function getSlugs(contentType) {
  const query =
    groq`*[_type == "` +
    contentType +
    `"] {
    "slug":slug.current
  }`;
  const slugList = await useSanityClient().fetch(query);
  return slugList.map((slug) => slug.slug);
}

export async function getNotesForListingPage() {
  // we don't want body in this
  // to be done later
}
