export const environmentResponseMock = {
  googleAnalyticsId: 'TEST-GA-ID',
  approvedDeviceIdentifiers: ['iPad7,4'],
  journal: {
    journalUrl: 'remote-journal-url',
    autoRefreshInterval: 5000,
    numberOfDaysToView: 7,
    allowTests: true,
    allowedTestCategories: ['B'],
  },
  tests: {
    testSubmissionUrl: 'https://example.com/api/v1/test-result',
    autoSendInterval: 900000,
  },
  logs: {
    url: 'https://example.com/api/vi/logs',
    autoSendInterval: 60000,
  },
};
