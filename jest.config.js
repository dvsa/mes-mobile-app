module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  transformIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic)'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts}', '!**/node_modules/**', '!**/*.module.ts', '!**/main.ts'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov']
};
