// @flow

const filterByKeys = (data, filterKeys, areIncluded, noEmptyValues) =>
  Object.keys(data)
    .filter(key => (areIncluded ? filterKeys.includes(key) : !filterKeys.includes(key)))
    .reduce((obj, key) => {
      if (noEmptyValues && !data[key]) {
        return obj;
      }
      return {
        ...obj,
        [key]: data[key],
      };
    }, {});

const formatList = (list, translatedFields, isTranslatedPart, callback) =>
  list.reduce((result, item) => {
    const id = item.id || callback(item);
    return {
      ...result,
      [id]: filterByKeys(item, translatedFields, isTranslatedPart, isTranslatedPart),
    };
  }, {});

const getSlideId = slide => slide.url.match(/(\d+)[^/]+(?=\.\w+$)/)[1];

const nonTranslatedKeys = [
  "id",
  "isStopover",
  "itemType",
  "updatedAt",
  "createdAt",
  "searchWidgetDataAffilid",
  "searchWidgetDataLocation",
  "videoYoutubeUrl",
  "articles",
  "partnerLogos",
  "itineraries",
  "sliderPhotos",
  "cityLogo",
  "mainPhoto",
  "departureForLowestPrice",
  "photoForTwitterCard",
  "photoForFacebookCard",
  "otherMetaTags",
];

// TODO: write proper flow types
// $FlowFixMe
module.exports = (dato, root) => {
  const formattedData = dato.cities.reduce(
    (aggregated, city) => {
      const allData = city.toMap();
      const translatedData = filterByKeys(allData, nonTranslatedKeys, false, true);
      const nonTranslatedData = filterByKeys(allData, nonTranslatedKeys, true);
      const cityTag = `${city.name.replace(/ /g, "-").toLowerCase()}_${city.id}`;

      const translatedTagFields = ["value"];
      const translatedItineraryFields = ["title"];
      const translatedTipFields = ["title", "description"];
      const translatedSlideFields = ["alt", "title"];

      const formatItineraries = (rawItineraries, isTranslatedPart) =>
        rawItineraries.reduce(
          (result, itinerary) => ({
            ...result,
            [itinerary.id]: {
              ...filterByKeys(
                itinerary,
                translatedItineraryFields,
                isTranslatedPart,
                isTranslatedPart,
              ),
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
            sliderPhotos: formatList(
              nonTranslatedData.sliderPhotos,
              translatedSlideFields,
              true,
              getSlideId,
            ),
          },
        },
        nonTranslated: {
          ...aggregated.nonTranslated,
          [cityTag]: {
            ...nonTranslatedData,
            articles: formatList(nonTranslatedData.articles, []),
            itineraries: formatItineraries(nonTranslatedData.itineraries),
            otherMetaTags: formatList(nonTranslatedData.otherMetaTags, translatedTagFields),
            sliderPhotos: formatList(
              nonTranslatedData.sliderPhotos,
              translatedSlideFields,
              false,
              getSlideId,
            ),
          },
        },
      };
    },
    { translated: {}, nonTranslated: {} },
  );

  // en-GB translation for all cities as a source of truth
  // sent to phraseApp on each build (pushTranslations script)
  root.createDataFile(`dato/en-GB.json`, "json", formattedData.translated);

  // all non-translated data to use as as reference
  // and to get city names and types in next.config.js
  root.createDataFile(`dato/allCities.json`, "json", formattedData.nonTranslated);

  // here we write separate data file for each city to use in getInitialProps
  const cityTags = Object.keys(formattedData.nonTranslated);
  cityTags.forEach(cityTag => {
    root.createDataFile(
      `static/cities/${cityTag}/cms_data.json`,
      "json",
      formattedData.nonTranslated[cityTag],
    );
  });
};
