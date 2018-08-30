/* eslint-disable flowtype/require-valid-file-annotation */
module.exports = {
  setupFiles: ["raf/polyfill", "./etc/jestSetup.js"],
  setupTestFrameworkScriptFile: "./etc/jestSetupFramework.js",
  snapshotSerializers: ["enzyme-to-json/serializer"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "dist"],
  coverageReporters: ["json", "lcov", "text-summary"],
  coverageThreshold: {
    global: {
      // branches: 100,
      // functions: 100,
      // lines: 100,
      // statements: 100,
    },
  },
};
