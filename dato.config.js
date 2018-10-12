// @flow

// $FlowFixMe
module.exports = (dato, root) => {
  root.directory("dato", stopoversDir => {
    dato.stopovers.forEach(stopover => {
      stopoversDir.createDataFile(`${stopover.cityName}.json`, "json", stopover.toMap());
    });
  });
};
