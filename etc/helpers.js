// @flow

import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Language } from "@kiwicom/nitro/lib/records/Languages";
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

export function isoToLangId(languages: LangInfos, iso: string): string {
  return Object.keys(languages).find(langId => languages[langId].iso === iso) || "en";
}

export function getBrandLanguage(
  brandLangsData: BrandLanguages,
  langId: string,
  supportedLangs: LangInfos,
): BrandLanguage {
  const brandLanguage = brandLangsData.kiwicom[langId];
  const supportedLangIds = Object.keys(supportedLangs);
  const allBrandLangs = brandLanguage.languages;
  const languages = pick(allBrandLangs, supportedLangIds);
  return { ...brandLanguage, languages };
}

export function mapLanguage(lang: Language, langInfo: LangInfo) {
  return {
    ...langInfo,
    name: langInfo.displayName,
    defaultCountry: lang.defaultCountry,
  };
}

export function getCurrentUrlParams(): Object {
  const params = {};
  new URL(window.location.href).searchParams.forEach((value, key) => {
    params[key] = value;
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
