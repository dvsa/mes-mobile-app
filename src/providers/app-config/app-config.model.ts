export type AppConfig = {
  configUrl: string
  googleAnalyticsId: string,
  daysToCacheJournalData: number,
  daysToCacheLogs: number,
  logoutClearsTestPersistence?: boolean;
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
  journal: {
    journalUrl: string,
    autoRefreshInterval: number
    numberOfDaysToView: number,
    allowTests: boolean,
    allowedTestCategories: string [],
    enableTestReportPracticeMode: boolean,
    enableEndToEndPracticeMode: boolean,
    enableLogoutButton: boolean,
  },
  tests: {
    testSubmissionUrl: string,
    autoSendInterval: number,
  },
  logs: {
    url: string,
    autoSendInterval: number,
  },
};
