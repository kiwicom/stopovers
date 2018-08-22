// @flow

require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

const langsData = require("./static/languages.json");

const allLangIds = Object.keys(langsData);
const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

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
  useFileSystemPublicRoutes: (process.env.NODE_ENV !== "production"),
  exportPathMap() {
    return allLangIds.reduce((mapping, lang) => {
      const translateTo = usedLangIds.includes(lang) ? lang : "en";
      return {
        ...mapping,
        [`/${lang}/stopovers/dubai`]: { page: "/", query: { lang: translateTo } },
      };
    }, {});
  },
};
