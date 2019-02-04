module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  modulePathIgnorePatterns: ["spec.ts"], // Migrated tests should be run by Jasmine
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**', '!**/*.module.ts', '!**/main.ts', '!**/*.d.{ts}'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov'],
  testURL: 'http://localhost'
};
