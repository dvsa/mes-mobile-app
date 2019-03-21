export interface EnvironmentFile {
  isRemote: boolean;
  configUrl: string;
  daysToCacheJournalData: number;
  daysToCacheLogs: number;
  authentication: {
    context: string;
    resourceUrl: string;
    clientId: string;
    redirectUrl: string;
    logoutUrl: string;
    employeeIdKey: string;
  };
}

export interface LocalEnvironmentFile extends EnvironmentFile {
  googleAnalyticsId: string;
  approvedDeviceIdentifiers: string[];
  journal: {
    journalUrl: string;
    autoRefreshInterval: number;
    numberOfDaysToView: number;
    allowTests: boolean;
    allowedTestCategories: string[];
  };
  logs: {
    url: string,
    autoSendInterval: number;
  };
}
