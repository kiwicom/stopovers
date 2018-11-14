// @flow

import "isomorphic-unfetch";
import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Language, type Languages } from "@kiwicom/nitro/lib/records/Languages";
import { type BrandLanguages, type BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
import cookies from "js-cookie";

export const UTM_PARAMS = process.env.UTM_PARAMS ? `?${process.env.UTM_PARAMS}` : "";

export function pick(obj: Object, paths: string[], deepKey?: string) {
  return Object.keys(obj).reduce((result, key) => {
    const value = deepKey ? obj[key][deepKey] : key;
    if (paths.includes(value))
      return {
        ...result,
        [key]: obj[key],
      };
    return result;
  }, {});
}

export function filterLanguages(langsData: LangInfos, usedLocales: string[]): LangInfos {
  return pick(langsData, usedLocales, "iso");
}

export function getCurrentLanguage(supportedLanguages: LangInfos, locale: string): string {
  return (
    Object.keys(supportedLanguages).find(langId => supportedLanguages[langId].iso === locale) ||
    "en"
  );
}

export function filterBrandLanguages(allBrandLangs: Languages, supportedLangIds: string[]) {
  return pick(allBrandLangs, supportedLangIds);
}

export function getBrandLanguage(
  brandLangsData: BrandLanguages,
  langId: string,
  supportedLangs: LangInfos,
): BrandLanguage {
  const brandLanguage = brandLangsData.kiwicom[langId];
  const supportedLangIds = Object.keys(supportedLangs);
  const allBrandLangs = brandLanguage.languages;
  const languages = filterBrandLanguages(allBrandLangs, supportedLangIds);
  return { ...brandLanguage, languages };
}

export function mapLanguage(lang: Language, langInfo: LangInfo) {
  return {
    ...langInfo,
    name: langInfo.displayName,
    defaultCountry: lang.defaultCountry,
  };
}

export function parseQuery(queryString: string): Object {
  const pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
  return pairs.reduce((query, pair) => {
    const parts = pair.split("=");
    if (parts[0] !== "") {
      const key = decodeURIComponent(parts[0]);

      return {
        ...query,
        [key === "return" ? "returnDate" : key]: decodeURIComponent(parts[1] || ""),
      };
    }
    return query;
  }, {});
}

export function getCurrentUrlParams() {
  return parseQuery(window.location.search);
}

export function generateUserId() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}

export const getUserId = () => {
  const userId = cookies.get("SKYPICKER_VISITOR_UNIQID");
  if (!userId) {
    const newId = generateUserId();
    cookies.set("SKYPICKER_VISITOR_UNIQID", newId, { expires: 365 * 4 });
    return newId;
  }
  return userId;
};
