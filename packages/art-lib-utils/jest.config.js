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
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  transform: {
    '\\.(ts|tsx|js)$': 'ts-jest'
  },
  transformIgnorePatterns: [
    "/node_modules/"
  ]
};
