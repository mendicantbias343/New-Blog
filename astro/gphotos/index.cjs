const GooglePhotosAlbum = require("../node_modules/google-photos-album-image-url-fetch");
const fs = require("node:fs");

const main = async () => {
  const re = await GooglePhotosAlbum.fetchImageUrls(
    "https://photos.app.goo.gl/tj7Ay5shCsyC648x7"
  );
  fs.writeFile(
    "../astro/public/gphotos/photos.json",
    JSON.stringify(re),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
main().catch((er) => console.error(er));
