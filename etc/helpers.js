// @flow

import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type BrandLanguage } from "@kiwicom/nitro/lib/records/BrandLanguage";
import cookies from "js-cookie";

import languages from "../static/languages.json";
import brandLanguages from "../static/brandLanguages.json";

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

export function filterLanguages(usedLocales: string[]): LangInfos {
  return pick(languages, usedLocales, "iso");
}

export function getLanguage(langId: string, supportedLangs: LangInfos): LangInfo {
  const initialLang = languages[langId];
  const supportedLangIds = Object.keys(supportedLangs);
  const isLangSupported = supportedLangIds.includes(langId);
  const fallbackLangId = initialLang && initialLang.translations;
  const isFallbackSupported = fallbackLangId && supportedLangIds.includes(fallbackLangId);
  const language =
    (isLangSupported && initialLang) ||
    (isFallbackSupported && languages[fallbackLangId]) ||
    languages.en;
  return {
    ...language,
    name: language.displayName,
  };
}

export function getBrandLanguage(langId: string, supportedLangs: LangInfos): BrandLanguage {
  const brandLanguage = brandLanguages.kiwicom[langId];
  const supportedLangIds = Object.keys(supportedLangs);
  return {
    ...brandLanguage,
    languages: pick(brandLanguage.languages, supportedLangIds),
  };
}

export function getCurrentUrlParams(): Object {
  const params = {};
  new URL(window.location.href).searchParams.forEach((value, key) => {
    if (key === "return") {
      params.returnDate = value;
    } else {
      params[key] = value;
    }
  });
  return params;
}

export function generateUserId() {
  return "xx-x-x-x-xxx".replace(/x/g, () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1),
  );
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
