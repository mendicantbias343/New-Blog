import { sanityClient } from "sanity:client";

export async function getSiteSettings() {
  let response = await sanityClient.fetch(`*[_id == "siteSettings"]`);
  return response[0];
}

export async function getPosts(types) {
  let query = "";
  if (types == "post") {
    query = `*[_type == "post"] {
      publishedAt,
        "cats":categories[]->{title, slug},
        title,
        "slug" : slug.current,
        summary,
        body,
        "image" : mainImage.asset._ref,
        readtime,
        _type
    } | order(publishedAt desc)`;
  } else if (types == "note") {
    query = `*[_type == "note"] {
      title,
    publishedAt,
    _id,
    body,
    "slug" : slug.current,
    "notetags" : notetags[]{label} ,
    _type,
    readtime,
    summary
    } | order(publishedAt desc)`;
  } else {
    //homepage view
    query = `*[_type == "post" || _type=="note"] {
      publishedAt,
        title,
        "slug" : slug.current,
        summary,
        "image" : mainImage.asset._ref,
        readtime,
        _type

    } | order(publishedAt desc)`;
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
  let query = `*[_type == "note"] | order(publishedAt desc) [0...${countToShare}] {
    title,
  publishedAt,
  _id,
  body,
  "slug" : slug.current,
  "notetags" : notetags[]{label} ,
  _type,
  readtime,
  summary
  } `;

  const posts = await sanityClient.fetch(query);
  return posts;
}

export async function getLatestArticlesWithPagination(countToShare) {
  let query = `*[_type == "post"] | order(publishedAt desc) [0...${countToShare}] {
    publishedAt,
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

export async function getArticlesForCategory(category) {
  let query = `*[_type=="category" && title == '${category}']{
    title,
      slug,
    "post": *[_type=="post" && references(^._id)] {
    title, slug, mainImage, summary
  }
}`;
  const articles = await sanityClient.fetch(query);
  return articles;
}

export async function getAllCategoriesAndArticles() {
  let query = `*[_type=="category"]{
    
    title,
      slug,
      
      readtime,
    "post": *[_type=="post" && references(^._id)][0...10] {
      publishedAt, title, slug, readtime,mainImage, summary,"cats":categories[]->{title, slug},
  }| order(publishedAt desc)
}`;
  const categories = await sanityClient.fetch(query);
  return categories;
}

/*

For getting articles against a tag:
*[_type=="note" && 'Product Management' in notetags[].label ]

*/

export async function getNotesFromTag(tag) {
  let query =
    `*[_type=="note" && '` +
    tag +
    `' in notetags[].label ]{
    title,
  publishedAt,
  _id,
  "slug" : slug.current,
  "notetags" : notetags[]{label} ,
  _type,
  readtime,
  summary
  } | order(publishedAt desc)`;
  const notes = await sanityClient.fetch(query);
  return notes;
}
