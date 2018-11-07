// @flow

require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

const langsData = require("./static/languages.json");
const cmsData = require("./dato/allCities.json");

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true,
      }),
    ];

    return config;
  },
  useFileSystemPublicRoutes: process.env.NODE_ENV !== "production",
  exportPathMap() {
    const usedLangIds = [
      "en",
      "ca",
      "us",
      "sg",
      "es",
      "it",
      "fr",
      "de",
      "pl",
      "cz",
      "ru",
      "ro",
      "hu",
    ];

    const allLangs = Object.values(langsData).map(({ id, phraseApp, iso }) => ({
      id,
      phraseApp,
      iso,
    }));
    return allLangs.reduce((mapping, lang) => {
      const fallbackLang = allLangs.find(fb => fb.iso === lang.phraseApp);
      const fallbackId = (fallbackLang && fallbackLang.id) || "en";
      const translateTo = usedLangIds.includes(lang.id) ? lang.id : fallbackId;
      const cityTags = Object.keys(cmsData);
      const langCitiesMap = cityTags.reduce((result, cityTag) => {
        const cityName = cityTag.split("_")[0];
        const cityTypes = cmsData[cityTag].isStopover ? "stopovers" : "destinations";
        return {
          ...result,
          [`/${lang.id}/${cityTypes}/${cityName}`]: {
            page: "/",
            query: { lang: translateTo, cityTag },
          },
        };
      }, {});
      return {
        ...mapping,
        ...langCitiesMap,
      };
    }, {});
  },
};
