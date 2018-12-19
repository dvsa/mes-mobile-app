export type AppConfig = {
  googleAnalyticsId: string,
  userIdDimensionIndex : number,
  authentication: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
  },
};
