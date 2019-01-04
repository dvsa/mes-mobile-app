export type EnvironmentFile = {
  isRemote: boolean,
  remoteSettingsUrl?: string,
  googleAnalyticsId?: string,
  userIdDimensionIndex?: number,
  authentication?: {
    context: string,
    resourceUrl: string,
    clientId: string,
    redirectUrl: string,
    logoutUrl: string,
  },
  journal?: {
    journalUrl: string
  }
}
