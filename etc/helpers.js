// @flow

import "isomorphic-unfetch";
import pick from "lodash.pick";
import { type LangInfos, type LangInfo } from "@kiwicom/nitro/lib/records/LangInfo";
import { type Language } from "@kiwicom/nitro/lib/records/Languages";
import { type BrandLanguages } from "@kiwicom/nitro/lib/records/BrandLanguage";

export const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

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
