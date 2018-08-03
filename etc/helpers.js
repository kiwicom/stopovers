// @flow

import "isomorphic-unfetch";
import pick from "lodash.pick";

/**
 * Fetch translation file(s).
 * @function getTranslations
 * @param {string} lang - Language to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translations.
 */

const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

const langSources = {
  en: "en-GB",
  cz: "cs-CZ",
  ro: "ro-RO",
  hu: "hu-HU",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  ru: "ru-RU",
  it: "it-IT",
};

export async function getTranslations(baseUrl: string, langId: string) {
  try {
    const response = await fetch(`${baseUrl}${langSources[langId]}.json`);
    if (!response.ok) {
      return response.statusText;
    }
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getLanguages(baseUrl: string) {
  const response = await fetch(`${baseUrl}languages.json`);
  const allLangs = await response.json();

  return pick(allLangs, usedLangIds);
}
