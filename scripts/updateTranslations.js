// @flow

import fetch from "isomorphic-unfetch";
import dotenv from "dotenv";
import chalk from "chalk";
import fs from "fs";

dotenv.config();

const PHRASE_APP_BASE_URL = "https://api.phraseapp.com/api/v2/";
const PHRASE_APP_PROJECT_ID = process.env.PHRASE_APP_PROJECT_ID || "";
const PHRASE_APP_ACCESS_TOKEN = process.env.PHRASE_APP_ACCESS_TOKEN || "";
const FILE_FORMAT = "simple_json";

const url = `${PHRASE_APP_BASE_URL}projects/${PHRASE_APP_PROJECT_ID}/locales/`;
const getLocaleUrl = id => `${url}${id}/download?file_format=${FILE_FORMAT}`;
const headers = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${PHRASE_APP_ACCESS_TOKEN}`,
  },
};

(async () => {
  try {
    const getAllLocales = await fetch(url, headers);
    const allLocalesJson = await getAllLocales.json();

    const promises = allLocalesJson.map(async ({ id, code }) => {
      const response = await fetch(getLocaleUrl(id), headers);

      return {
        code,
        translation: await response.json(),
      };
    });

    const responses = await Promise.all(promises);

    responses.map(({ code, translation }: { code: string, translation: string }) => {
      fs.writeFile(
        `static/locales/${code}.json`,
        JSON.stringify(translation, null, 2),
        "utf8",
        err => {
          if (err) {
            return console.error(err); // eslint-disable-line no-console
          }

          // eslint-disable-next-line no-console
          return console.log(
            chalk.green.bold(`\nCongratulations! ${code} translations were updated\n`),
          ); // eslint-disable-line no-console
        },
      );
      return true;
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
})();
