// @flow

const cleanEmptyValues = data =>
  typeof data !== "object"
    ? data
    : Object.keys(data).reduce(
        (obj, key) => ({
          ...obj,
          ...(data[key] ? { [key]: cleanEmptyValues(data[key]) } : null),
        }),
        {},
      );

const filterByKeys = (data, filterKeys, areIncluded) =>
  Object.keys(data)
    .filter(key => areIncluded === filterKeys.includes(key))
    .reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});

const listToObj = (list, filterKeys, areIncluded, getID) =>
  list.reduce((obj, item) => {
    const id = item.id || getID(item);
    return {
      ...obj,
      [id]: filterByKeys(item, filterKeys, areIncluded),
    };
  }, {});

const formatImage = (data, isTranslatedPart, getPhoto) => {
  const photo = getPhoto ? getPhoto(data) : data.photo;
  if (!photo) return data;

  // For articles, titles and alt text of pictures don't need to be translated.
  if (data.itemType === "article") {
    return isTranslatedPart ? null : photo;
  }

  return filterByKeys(photo, ["alt", "title"], isTranslatedPart);
};

const formatImages = (images, isTranslatedPart, getPhoto) => {
  const getImageId = img => img.url.match(/(\d+)[^/]+(?=\.\w+$)/)[1];
  return images.reduce((obj, image) => {
    const formattedImage = cleanEmptyValues(formatImage(image, isTranslatedPart, getPhoto));
    return {
      ...obj,
      [getImageId(image)]: formattedImage,
    };
  }, {});
};

const formatItineraries = (itineraries, isTranslatedPart) =>
  itineraries.reduce((result, itinerary) => {
    const tips = cleanEmptyValues(
      listToObj(itinerary.tips, ["title", "description"], isTranslatedPart),
    );

    itinerary.tips.forEach(tip => {
      tips[tip.id].photo = formatImage(tip, isTranslatedPart);
    });

    return {
      ...result,
      [itinerary.id]: {
        ...filterByKeys(itinerary, ["title"], isTranslatedPart),
        tips,
      },
    };
  }, {});

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
      const translatedData = filterByKeys(allData, nonTranslatedKeys, false);
      const nonTranslatedData = filterByKeys(allData, nonTranslatedKeys, true);
      const cityTag = `${city.name.replace(/ /g, "-").toLowerCase()}_${city.id}`;
      const translatedTagFields = ["value"];

      return {
        translated: {
          ...aggregated.translated,
          [cityTag]: {
            ...translatedData,
            itineraries: formatItineraries(nonTranslatedData.itineraries, true),
            otherMetaTags: listToObj(nonTranslatedData.otherMetaTags, translatedTagFields, true),
            sliderPhotos: formatImages(nonTranslatedData.sliderPhotos, true, photo => photo),
            mainPhoto: formatImage(nonTranslatedData, true, data => data.mainPhoto),
          },
        },
        nonTranslated: {
          ...aggregated.nonTranslated,
          [cityTag]: {
            ...nonTranslatedData,
            articles: listToObj(nonTranslatedData.articles, [], false),
            itineraries: formatItineraries(nonTranslatedData.itineraries, false),
            otherMetaTags: listToObj(nonTranslatedData.otherMetaTags, translatedTagFields, false),
            sliderPhotos: formatImages(nonTranslatedData.sliderPhotos, false, photo => photo),
            mainPhoto: formatImage(nonTranslatedData, false, data => data.mainPhoto),
            name: translatedData.name,
          },
        },
      };
    },
    { translated: {}, nonTranslated: {} },
  );

  formattedData.translated = cleanEmptyValues(formattedData.translated);

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
