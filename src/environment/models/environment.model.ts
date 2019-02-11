export interface EnvironmentFile {
  isRemote: boolean;
  configUrl: string;
  authentication: {
    context: string;
    resourceUrl: string;
    clientId: string;
    redirectUrl: string;
    logoutUrl: string;
    openIdConnectUrl: string;
    identityPoolId: string;
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
  loggingUrl: string;
}
