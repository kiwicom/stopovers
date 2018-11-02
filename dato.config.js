// @flow

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

// TODO: write proper flow types
// $FlowFixMe
module.exports = (dato, root) => {
  const formattedData = dato.stopovers.reduce(
    (aggregated, stopover) => {
      const allData = stopover.toMap();

      const translatedData = filterByKeys(allData, nonTranslatedKeys);
      const nonTranslatedData = filterByKeys(allData, nonTranslatedKeys, true);
      const cityTag = `${stopover.cityName.replace(/ /g, "-").toLowerCase()}_${stopover.id}`;

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
      return {
        translated: {
          ...aggregated.translated,
          [cityTag]: {
            ...translatedData,
            itineraries: formatItineraries(nonTranslatedData.itineraries, true),
            otherMetaTags: formatList(nonTranslatedData.otherMetaTags, translatedTagFields, true),
          },
        },
        nonTranslated: {
          ...aggregated.nonTranslated,
          [cityTag]: {
            ...nonTranslatedData,
            articles: formatList(nonTranslatedData.articles, []),
            itineraries: formatItineraries(nonTranslatedData.itineraries),
            otherMetaTags: formatList(nonTranslatedData.otherMetaTags, translatedTagFields),
          },
        },
      };
    },
    { translated: {}, nonTranslated: {} },
  );
  root.createDataFile(`dato/en-GB.json`, "json", formattedData.translated);
  const cityTags = Object.keys(formattedData.nonTranslated);
  cityTags.forEach(cityTag => {
    root.createDataFile(
      `static/cities/${cityTag}/cms_data.json`,
      "json",
      formattedData.nonTranslated[cityTag],
    );
  });
};
