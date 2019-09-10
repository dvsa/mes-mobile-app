import { ExaminerRole } from './constants/examiner-role.constants';

export type AppConfig = {
  configUrl: string
  googleAnalyticsId: string,
  daysToCacheJournalData: number,
  daysToCacheLogs: number,
  logoutClearsTestPersistence?: boolean;
  logsPostApiKey: string;
  logsApiUrl: string;
  logsAutoSendInterval: number;
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
    employeeIdKey: string,
  },
  approvedDeviceIdentifiers: string[],
  timeTravelDate?: string,
  role: ExaminerRole;
  journal: {
    journalUrl: string,
    searchBookingUrl: string,
    autoRefreshInterval: number
    numberOfDaysToView: number,
    allowTests: boolean,
    allowedTestCategories: string[],
    enableTestReportPracticeMode: boolean,
    enableEndToEndPracticeMode: boolean,
    enableLogoutButton: boolean,
    testPermissionPeriods: TestPermissionPeriod[],
  },
  tests: {
    testSubmissionUrl: string,
    autoSendInterval: number,
  },
  logs: {
    url: string,
    autoSendInterval: number,
  },
  user: {
    findUser: string,
  }
  requestTimeout: number
};

export interface TestPermissionPeriod {
  testCategory: string;
  from: string;
  to: string | null;
}
