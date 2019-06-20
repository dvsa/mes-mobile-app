import { EnvironmentFile, LocalEnvironmentFile } from '../../../environment/models/environment.model';

export const remoteEnvironmentMock: EnvironmentFile = {
  isRemote: true,
  configUrl: 'remote-url',
  daysToCacheJournalData: 14,
  daysToCacheLogs: 14,
  logsPostApiKey: '',
  logsApiUrl: 'remote-logs-url',
  logsAutoSendInterval: 6000,
  authentication: {
    context: 'remote-authentication-context',
    resourceUrl: 'remote-authentication-resource-url',
    clientId: 'remote-authentication-client-id',
    redirectUrl: 'remote-authentication-redirect-url',
    logoutUrl: 'remote-logout-url',
    employeeIdKey: 'remote-employeeIdKey',
  },
};

export const localEnvironmentMock: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://www.example.com/api/v1/config/dev',
  daysToCacheJournalData: 14,
  daysToCacheLogs: 14,
  googleAnalyticsId: 'local-ga-id',
  timeTravelDate: '2019-02-01',
  logsPostApiKey: '',
  logsApiUrl: 'https://www.example.com/api/v1/logs',
  logsAutoSendInterval: 6000,
  authentication: {
    context: 'local-authentication-context',
    resourceUrl: 'local-authentication-resource-url',
    clientId: 'local-authentication-client-id',
    redirectUrl: 'local-authentication-redirect-url',
    logoutUrl: 'local-logout-url',
    employeeIdKey: 'local-employeeIdKey',
  },
  approvedDeviceIdentifiers: [
    'iPad7,4',
    'x86_64',
  ],
  journal: {
    journalUrl: 'https://www.example.com/api/v1/journals/{staffNumber}/personal',
    autoRefreshInterval: 1000 * 60 * 15,
    numberOfDaysToView: 7,
    allowTests: true,
    allowedTestCategories: ['B'],
    enableTestReportPracticeMode: true,
    enableEndToEndPracticeMode: true,
    enableLogoutButton: true,
  },
  tests: {
    testSubmissionUrl: 'https://www.example.com/api/v1/test-result',
    autoSendInterval: 900000,
  },
  logs: {
    url: 'https://www.example.com/api/v1/logs',
    autoSendInterval: 1000 * 60,
  },
};
