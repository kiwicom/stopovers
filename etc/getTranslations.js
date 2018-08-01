/* global fetch */
import "isomorphic-unfetch";

/**
 * Fetch translation file(s).
 * @function getTranslations
 * @param {string} lang - Language to fetch.
 * @param {string} baseUrl - Locale location.
 * @return {object} Fetched translations.
 */

export default async function getTranslations(baseUrl, lang) {
  try {
    const response = await fetch(`${baseUrl}/${lang}.json`);
    if (!response.ok) {
      return response.statusText;
    }
    return response.json();
  } catch (error) {
    return error;
  }
}
