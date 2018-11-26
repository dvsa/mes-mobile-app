export interface IAnalyticsProvider {
  setCurrentPage(name: string);
  logEvent(category: string, event: string, params?: any);
  logError(message: string);
  setUserId(userId: string);
}

export enum AnalyticsScreenNames {
  WELCOME = <any>'welcome page',
  JOURNAL = <any>'journal page'
}
