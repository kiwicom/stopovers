// @flow

import "isomorphic-unfetch";

/**
 * Fetch translation file(s).
 * @function getTranslations
 * @param {string} lang - Language to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translations.
 */

export async function getTranslations(url: string, lang: string) {
  try {
    const response = await fetch(`${url}${lang}.json`);
    if (!response.ok) {
      return response.statusText;
    }
    return response.json();
  } catch (error) {
    return error;
  }
}

export async function getLanguages(url: string) {
  const response = await fetch(`${url}languages.json`);
  return response.json();
}
