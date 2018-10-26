// @flow

import fetch from "isomorphic-unfetch";
import dotenv from "dotenv";
import chalk from "chalk";
import fs from "fs-extra";

dotenv.config();

const PHRASE_APP_BASE_URL = "https://api.phraseapp.com/api/v2/";
const PHRASE_APP_PROJECT_ID = process.env.PHRASE_APP_PROJECT_ID || "";
const PHRASE_APP_ACCESS_TOKEN = process.env.PHRASE_APP_ACCESS_TOKEN || "";
const FILE_FORMAT = "nested_json";

const url = `${PHRASE_APP_BASE_URL}projects/${PHRASE_APP_PROJECT_ID}/locales/`;
const getLocaleUrl = id => `${url}${id}/download?file_format=${FILE_FORMAT}?encoding=UTF-8`;
const headers = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${PHRASE_APP_ACCESS_TOKEN}`,
  },
};

// PhraseApp has limits on parallel requests
// that's why we process requests in sequence
async function processResponses(allLocalesJson) {
  const results = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of allLocalesJson) {
    const response = await fetch(getLocaleUrl(locale.id), headers);

    results.push({
      code: locale.code,
      translation: await response.json(),
    });
  }
  return results;
}

(async () => {
  try {
    const getAllLocales = await fetch(url, headers);
    const allLocalesJson = await getAllLocales.json();

    const responses = await processResponses(allLocalesJson);

    responses.map(({ code, translation }: { code: string, translation: string }) => {
      const { menuItems, ...cities } = translation;
      const cityTags = Object.keys(cities);
      cityTags.forEach(cityTag => {
        const path = `static/cities/${cityTag}/locales/`;
        fs.outputFile(`${path}/${code}.json`, JSON.stringify(cities[cityTag], null, 2), err => {
          if (err) {
            return console.error(err); // eslint-disable-line no-console
          }

          // eslint-disable-next-line no-console
          return console.log(
            chalk.green.bold(`\nCongratulations! ${code} translations were updated\n`),
          );
        });
      });
      fs.outputFile(
        `static/locales/menuItems/${code}.json`,
        JSON.stringify(menuItems, null, 2),

        err => {
          if (err) {
            return console.error(err); // eslint-disable-line no-console
          }

          // eslint-disable-next-line no-console
          return console.log(
            chalk.green.bold(`\nCongratulations! ${code} translations were updated\n`),
          );
        },
      );
      return true;
    });
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
})();
