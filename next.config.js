// @flow

require("dotenv").config();
const fs = require("fs-extra");
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
    const allLangs = Object.values(langsData).map(({ id, phraseApp, iso }) => ({
      id,
      phraseApp,
      iso,
    }));
    const cityTags = Object.keys(cmsData);
    return allLangs.reduce((mapping, lang) => {
      const langCitiesMap = cityTags.reduce((result, cityTag) => {
        const localeFiles = fs.readdirSync(`./static/cities/${cityTag}/locales`);
        const usedLocales = localeFiles.map(fileName => fileName.split(".")[0]);
        const cityName = cityTag.split("_")[0];
        const cityTypes = cmsData[cityTag].isStopover ? "stopovers" : "destinations";
        return {
          ...result,
          [`/${lang.id}/${cityTypes}/${cityName}`]: {
            page: "/",
            query: { usedLocales, langId: lang.id, cityTag },
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
