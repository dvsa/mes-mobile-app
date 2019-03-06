export type AppConfig = {
  configUrl: string
  googleAnalyticsId: string,
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
    employeeIdKey: string,
  },
  approvedDeviceIdentifiers: string[],
  journal: {
    journalUrl: string,
    autoRefreshInterval: number
    numberOfDaysToView: number,
  },
  logs: {
    url: string,
    autoSendInterval: number,
  },
};
