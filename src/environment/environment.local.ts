import { LocalEnvironmentFile } from './models/environment.model';
import { ExaminerRole } from '../providers/app-config/constants/examiner-role.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const environment: LocalEnvironmentFile = {
  isRemote: false,
  configUrl: 'https://dev.mes.dev-dvsacloud.uk/v1/configuration/dev',
  daysToCacheLogs: 7,
  enableDevTools: true,
  enableRehydrationPlugin: true,
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
    delegatedExaminerSearchBookingUrl: 'dummy/delegated-bookings/{applicationReference}',
    autoRefreshInterval: 1000 * 60 * 10,
    numberOfDaysToView: 7,
    daysToCacheJournalData: 14,
    allowTests: true,
    allowedTestCategories: [
      // Cat ADI2
      TestCategory.ADI2,
      // Cat B
      TestCategory.B,
      // Cat BE
      TestCategory.BE,
      // Cat C
      TestCategory.C, TestCategory.C1, TestCategory.CE, TestCategory.C1E,
      TestCategory.CM, TestCategory.C1M, TestCategory.CEM, TestCategory.C1EM,
      // Cat D
      TestCategory.D, TestCategory.D1, TestCategory.DE, TestCategory.D1E,
      TestCategory.DM, TestCategory.D1M, TestCategory.DEM, TestCategory.D1EM,
      // Cat CPC
      TestCategory.CCPC, TestCategory.DCPC,
      // Cat Home
      TestCategory.F, TestCategory.G, TestCategory.H, TestCategory.K,
      // Cat Mod1
      TestCategory.EUA1M1, TestCategory.EUA2M1, TestCategory.EUAM1, TestCategory.EUAMM1,
      // Cat Mod2
      TestCategory.EUA1M2, TestCategory.EUA2M2, TestCategory.EUAM2, TestCategory.EUAMM2,
    ],
    enableTestReportPracticeMode: true,
    enableEndToEndPracticeMode: true,
    enableLogoutButton: true,
    testPermissionPeriods: [
      {
        testCategory: 'ADI2',
        from: '2019-01-01',
        to: null,
      },
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
      {
        testCategory: 'CCPC',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'DCPC',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUAM1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUA1M1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUA2M1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUAMM1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUAM2',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUA1M2',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUA2M2',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'EUAMM2',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'D',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'D1',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'D1+E',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'D+E',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'F',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'G',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'H',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'K',
        from: '2019-01-01',
        to: null,
      },
      {
        testCategory: 'CM',
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
