// @flow

const usedLangIds = ["en", "cz", "ro", "hu", "es", "fr", "de", "ru", "it"];

module.exports = {
  exportPathMap() {
    return usedLangIds.reduce(
      (mapping, lang) => ({
        ...mapping,
        [`/${lang}/dubai/index.html`]: { page: "/", query: { lang } },
      }),
      {},
    );
  },
};
