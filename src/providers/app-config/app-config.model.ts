export type AppConfig = {
  configUrl: string
  googleAnalyticsId: string,
  daysToCacheJournalData: number,
  daysToCacheLogs: number,
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
    employeeIdKey: string,
  },
  approvedDeviceIdentifiers: string[],
  timeTravelDate: string,
  journal: {
    journalUrl: string,
    autoRefreshInterval: number
    numberOfDaysToView: number,
    allowTests: boolean,
    allowedTestCategories: string [],
  },
  logs: {
    url: string,
    autoSendInterval: number,
  },
};
