import { LocalEnvironmentFile } from './models/environment.model';

export const environment: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/dev',
  daysToCacheJournalData: 7,
  daysToCacheLogs: 7,
  googleAnalyticsId: 'UA-129489007-3',
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner://uk.gov.dvsa.mobile-examiner',
    logoutUrl: 'https://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
    employeeIdKey: 'extn.employeeId',
  },
  approvedDeviceIdentifiers: [
    'iPad7,4',
    'x86_64',
  ],
  journal: {
    journalUrl: '/assets/mock/local-journal.json',
    autoRefreshInterval: 1000 * 60 * 10,
    numberOfDaysToView: 7,
    allowTests: true,
    allowedTestCategories: ['B'],
    enableTestReportPracticeMode: true,
    enableEndToEndPracticeMode: true,
    enableLogoutButton: true,
  },
  tests: {
    testSubmissionUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/test-results',
    autoSendInterval: 900000,
  },
  logs: {
    url: 'https://dev.mes.dev-dvsacloud.uk/v1/logs/dev',
    autoSendInterval: 1000 * 60,
  },
};
