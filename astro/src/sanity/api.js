import { sanityClient } from "sanity:client";

export async function getSiteSettings() {
  let response = await sanityClient.fetch(`*[_id == "siteSettings"]`);
  return response[0];
}

export async function getPosts(types) {
  let query = "";
  if (types == "post") {
    query = `*[_type == "post"] {
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
    query = `*[_type == "note"] {
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
    query = `*[_type == "post" || _type=="note"] {
      _createdAt,
        title,
        "slug" : slug.current,
        summary,
        "image" : mainImage.asset._ref,
        readtime,
        _type

    } | order(_createdAt desc)`;
  }

  const posts = await sanityClient.fetch(query);
  return posts;
}

export async function getSlugs(contentType) {
  const query =
    `*[_type == "` +
    contentType +
    `"] {
    "slug":slug.current
  }`;
  const slugList = await sanityClient.fetch(query);
  return slugList.map((slug) => slug.slug);
}

export async function getLatestNotesWithPagination(countToShare) {
  let query = `*[_type == "note"] | order(_createdAt desc) [0...${countToShare}] {
    title,
  _createdAt,
  _id,
  body,
  "slug" : slug.current,
  "notetags" : notetags[]{label} ,
  _type,
  readingtime,
  summary
  } `;

  const posts = await sanityClient.fetch(query);
  return posts;
}

export async function getLatestArticlesWithPagination(countToShare) {
  let query = `*[_type == "post"] | order(_createdAt desc) [0...${countToShare}] {
    _createdAt,
      "cats":categories[]->{title, slug},
      title,
      "slug" : slug.current,
      summary,
      body,
      "image" : mainImage.asset._ref,
      readtime,
      _type
  } `;

  const posts = await sanityClient.fetch(query);
  return posts;
}
