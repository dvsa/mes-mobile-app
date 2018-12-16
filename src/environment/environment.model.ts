export interface IEnvironment {
  isRemote: boolean;
  googleAnalyticsId: string;
  userIdDimensionIndex: number;
  dynamicAppSettingsUrl: string;
  getGoogleAnalyticsKey(): string;
  getGoogleAnalyticsUserIdDimension(): number;
}
