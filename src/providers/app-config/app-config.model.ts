export type AppConfig = {
  googleAnalyticsId: string,
  userIdDimensionIndex : number,
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
    openIdConnectUrl?: string,
    identityPoolId?: string,
    employeeIdKey: string
  },
  aws?: {
    region: string,
  }
  journal: {
    journalUrl: string,
    autoRefreshInterval: number
  }
};
