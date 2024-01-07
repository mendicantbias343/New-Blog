import { fetchImageUrls } from "google-photos-album-image-url-fetch";

export async function getImages() {
  const re = await fetchImageUrls(
    "https://photos.app.goo.gl/tj7Ay5shCsyC648x7"
  );
  return re.map((item) => item.url);
}

export async function getRandomImage() {
  const images = await getImages();
  return images[Math.floor(Math.random() * images.length)];
}

export const get = ({ params, request }) => {
  return {
    body: "get404",
  };
};

export const post = ({ params, request }) => {
  return {
    body: "post404",
  };
};

export async function getImagesWithEverything() {
  const re = await fetchImageUrls(
    "https://photos.app.goo.gl/tj7Ay5shCsyC648x7"
  );

  return re
    ? re
    : [
        {
          uid: "AF1QipMunWiumBlIxze4tgYDgs9qeCF_o0UtOAZmnK8O",
          url: "https://lh3.googleusercontent.com/pw/ABLVV84I4inbWVB67S-W6hOruMcc8P5TbSi9kL_X1TfGZpFdbqCdHpBWn5TD1EVMF2ZHjdS-85TZiurGBoMqn3v5HKhXSIbkXinDeMehc9-FkgAlLxPrn-AB",
          width: 3024,
          height: 4032,
          imageUpdateDate: 1682684990000,
          albumAddDate: 1704443560147,
        },
        {
          uid: "AF1QipMcPEbgIZg28kwZFS7QyxKo4k7zDbA739lVeCRo",
          url: "https://lh3.googleusercontent.com/pw/ABLVV87aHS2gpDBnEGDSTqrXEsfY2YNG2AsbPDtjn1d6gcBVSfQWsDOyjW_6qePzVumAuyFtp3t5Pdas0RjGHQJZDwIztFbWMb8xrWuRdpuLclChxkkgetAy",
          width: 3024,
          height: 4032,
          imageUpdateDate: 1682879539000,
          albumAddDate: 1704443560147,
        },
      ];
}
