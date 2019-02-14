import { IAnalyticsProvider } from '../analytics.model';

export class AnalyticsProviderMock implements IAnalyticsProvider {

  googleAnalyticsKey: string = 'UA-12345678';

  setCurrentPage(name: string):void {}

  initialiseAnalytics = (): Promise<any> =>
    new Promise((resolve) => {
      resolve();
    });

  logEvent(category: string, event: string, params?: any) {}

  addCustomDimension(key: number, value: string) {}

  logError(message: string) {}

  logException(message: string, fatal: boolean) {}

  setUserId(userId: string) {}
}
