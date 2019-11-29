// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  displayName: 'jsdom',
  clearMocks: true,
  collectCoverage: true,
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  moduleFileExtensions: [
    "js",
    "json",
    "jsx",
    "ts",
    "tsx",
    "node"
  ],
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-global',
  // testEnvironmentOptions: {
  //   userAgent: 'Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13'
  // },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
    '\\.(ts|tsx|js)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
