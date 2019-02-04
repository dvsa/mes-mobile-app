import { IAnalyticsProvider } from '../analytics.model';

export class AnalyticsProviderMock implements IAnalyticsProvider {
  
  googleAnalyticsKey: string = 'UA-12345678';

  setCurrentPage(name: string):void {}

  logEvent(category: string, event: string, params?: any) {}

  logError(message: string) {}

  setUserId(userId: string) {}

}
