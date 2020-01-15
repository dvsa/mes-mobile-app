import { LocalEnvironmentFile } from './models/environment.model';
import { ExaminerRole } from '../providers/app-config/constants/examiner-role.constants';

export const environment: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/dev',
  daysToCacheLogs: 7,
  enableDevTools: true,
  googleAnalyticsId: 'UA-129489007-3',
  logsPostApiKey: '',
  logsApiUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/logs',
  logsAutoSendInterval: 6000,
  employeeNameKey: 'name',
  authentication: {
    context: 'https://login.windows.net/common',
    resourceUrl: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    clientId: '09fdd68c-4f2f-45c2-be55-dd98104d4f74',
    redirectUrl: 'x-msauth-uk-gov-dvsa-mobile-examiner-app://uk.gov.dvsa.mobile-examiner-app',
    logoutUrl: 'https://login.windows.net/6c448d90-4ca1-4caf-ab59-0a2aa67d7801/oauth2/logout',
    employeeIdKey: 'extn.employeeId',
  },
  approvedDeviceIdentifiers: [
    'iPad7,4',
    'x86_64',
  ],
  role: ExaminerRole.DE,
  journal: {
    journalUrl: '/assets/mock/local-journal.json',
    searchBookingUrl: 'dummy/search/booking/url',
    autoRefreshInterval: 1000 * 60 * 10,
    numberOfDaysToView: 7,
    daysToCacheJournalData: 14,
    allowTests: true,
    allowedTestCategories: ['B'],
    enableTestReportPracticeMode: true,
    enableEndToEndPracticeMode: true,
    enableLogoutButton: true,
    testPermissionPeriods: [
      {
        testCategory: 'B',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'B+E',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'C',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'C1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'C1+E',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'C+E',
        from: '2019-01-01',
        to: null,
      },
    ],
  },
  tests: {
    testSubmissionUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/test-results',
    autoSendInterval: 900000,
  },
  user: {
    findUserUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/users/{staffNumber}',
  },
  requestTimeout: 20000,
};
