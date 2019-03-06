export interface EnvironmentFile {
  isRemote: boolean;
  configUrl: string;
  approvedDeviceIdentifiers: string[];
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
  journal: {
    journalUrl: string;
    autoRefreshInterval: number;
    numberOfDaysToView: number;
  };
  logs: {
    url: string,
    autoSendInterval: number;
  };
}
