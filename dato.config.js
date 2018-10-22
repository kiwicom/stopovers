// @flow

// TODO: write proper flow types
// $FlowFixMe
module.exports = (dato, root) => {
  root.directory("dato", stopoversDir => {
    dato.stopovers.forEach(stopover => {
      const allData = stopover.toMap();
      const nonTranslatedKeys = [
        "id",
        "itemType",
        "updatedAt",
        "createdAt",
        "searchWidgetDataAffilid",
        "searchWidgetDataStopoverLocation",
        "videoYoutubeUrl",
        "articles",
        "partnerLogos",
        "itineraries",
        "sliderPhotos",
        "cityLogo",
        "mainPhoto",
        "photoForTwitterCard",
        "photoForFacebookCard",
        "otherMetaTags",
      ];

      const filterByKeys = (data, filterKeys, areIncluded) =>
        Object.keys(data)
          .filter(key => (areIncluded ? filterKeys.includes(key) : !filterKeys.includes(key)))
          .reduce(
            (obj, key) => ({
              ...obj,
              [key]: data[key],
            }),
            {},
          );
      const formatList = (list, translatedFields, isTranslatedPart) =>
        list.reduce(
          (result, item) => ({
            ...result,
            [item.id]: filterByKeys(item, translatedFields, isTranslatedPart),
          }),
          {},
        );
      const translatedData = filterByKeys(allData, nonTranslatedKeys);
      const nonTranslatedData = filterByKeys(allData, nonTranslatedKeys, true);
      const cityTag = `${stopover.cityName.replace(/ /g, "_").toLowerCase()}_${stopover.id}`;

      const translatedArticleFields = ["linkText", "description", "title"];
      const translatedTagFields = ["value"];
      const translatedItineraryFields = ["title"];
      const translatedTipFields = ["title", "description"];

      const formatItineraries = (rawItineraries, isTranslatedPart) =>
        rawItineraries.reduce(
          (result, itinerary) => ({
            ...result,
            [itinerary.id]: {
              ...filterByKeys(itinerary, translatedItineraryFields, isTranslatedPart),
              tips: formatList(itinerary.tips, translatedTipFields, isTranslatedPart),
            },
          }),
          {},
        );

      stopoversDir.createDataFile(`${cityTag}_en-GB.json`, "json", {
        [cityTag]: {
          ...translatedData,
          articles: formatList(nonTranslatedData.articles, translatedArticleFields, true),
          itineraries: formatItineraries(nonTranslatedData.itineraries, true),
          otherMetaTags: formatList(nonTranslatedData.otherMetaTags, translatedTagFields, true),
        },
      });

      stopoversDir.createDataFile(`${cityTag}.json`, "json", {
        [cityTag]: {
          ...nonTranslatedData,
          articles: formatList(nonTranslatedData.articles, translatedArticleFields),
          itineraries: formatItineraries(nonTranslatedData.itineraries),
          otherMetaTags: formatList(nonTranslatedData.otherMetaTags, translatedTagFields),
        },
      });
    });
  });
};
