// @flow

import "isomorphic-unfetch";
import pick from "lodash.pick";
import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Language } from "@kiwicom/nitro/lib/records/Languages";
import { type BrandLanguages } from "@kiwicom/nitro/lib/records/BrandLanguage";
import cookies from "js-cookie";

export const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

export const UTM_PARAMS = process.env.UTM_PARAMS ? `?${process.env.UTM_PARAMS}` : "";

export function filterLanguages(langsData: LangInfos) {
  return pick(langsData, usedLangIds);
}

export function filterBrandLanguage(brandLangsData: BrandLanguages, langId: string) {
  const brandLanguage = brandLangsData.kiwicom[langId];
  const languages = pick(brandLanguage.languages, usedLangIds);
  return { ...brandLanguage, languages };
}

export function mapLanguage(lang: Language, langInfo: LangInfo) {
  return {
    ...langInfo,
    name: langInfo.displayName,
    flag: lang.flag || langInfo.id,
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
