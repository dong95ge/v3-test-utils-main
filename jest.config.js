module.exports = {
  testEnvironment: "jsdom",
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  coverageReporters: ["lcov", "text"],
  coveragePathIgnorePatterns: ["<rootDir>/tests/"],
};
