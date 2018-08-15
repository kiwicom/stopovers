// @flow

const langsData = require("./static/languages.json");

const allLangIds = Object.keys(langsData);
const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

module.exports = {
  exportPathMap() {
    return allLangIds.reduce((mapping, lang) => {
      const translateTo = usedLangIds.includes(lang) ? lang : "en";
      return {
        ...mapping,
        [`/${lang}/stopovers/dubai/index.html`]: { page: "/", query: { lang: translateTo } },
      };
    }, {});
  },
};
