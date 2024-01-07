import { fetchImageUrls } from "google-photos-album-image-url-fetch";
import { writeFile } from "node:fs";

const main = async () => {
  const re = await fetchImageUrls(
    "https://photos.app.goo.gl/tj7Ay5shCsyC648x7"
  );
  writeFile(
    "photos.json",
    JSON.stringify(re),
    (err) => {
      if (err) {
        console.error(err);
      }
    }
  );
};
main().catch((er) => console.error(er));
