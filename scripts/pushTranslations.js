// @flow

import fetch from "isomorphic-unfetch";
import dotenv from "dotenv";
import fs from "fs";
import FormData from "form-data";

dotenv.config();
const env = name => process.env[name] || "";

const PHRASE_APP_BASE_URL = "https://api.phraseapp.com/api/v2";
const URL = `${PHRASE_APP_BASE_URL}/projects/${env("PHRASE_APP_PROJECT_ID")}/uploads`;

const filenames = ["static/locales/cms_en-GB.json"];
const options = {
  method: "POST",
  headers: {
    // `Content-Type` must not be specified when using FormData.
    Authorization: `token ${env("PHRASE_APP_ACCESS_TOKEN")}`,
  },
};

(async () => {
  try {
    const results = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const filename of filenames) {
      const file = fs.createReadStream(filename);
      const body = new FormData();
      body.append("file_format", "nested_json");
      body.append("file", file);
      body.append("locale_id", "en-GB");

      const response = await fetch(URL, { ...options, body });
      results[filename] = (await response.json()).summary;
    }

    console.table(results); // eslint-disable-line no-console
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
})();
