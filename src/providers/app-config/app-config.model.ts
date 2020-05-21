import { ExaminerRole, TestPermissionPeriod } from '@dvsa/mes-config-schema/remote-config';

export type AppConfig = {
  configUrl: string
  googleAnalyticsId: string,
  daysToCacheLogs: number,
  logoutClearsTestPersistence?: boolean;
  logsPostApiKey: string;
  logsApiUrl: string;
  logsAutoSendInterval: number;
  // TODO LW-114: Uncomment this when raiseIncidentApiBaseUrl is added to remote config
  raiseIncidentApiBaseUrl: string;
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
    employeeIdKey: string,
    employeeNameKey: string,
  },
  approvedDeviceIdentifiers: string[],
  timeTravelDate?: string,
  role: ExaminerRole;
  journal: {
    journalUrl: string,
    searchBookingUrl: string,
    autoRefreshInterval: number
    numberOfDaysToView: number,
    daysToCacheJournalData: number,
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
  user: {
    findUserUrl: string,
  }
  requestTimeout: number
};
