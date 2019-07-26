import { IAnalyticsProvider } from '../analytics.model';

export class AnalyticsProviderMock implements IAnalyticsProvider {

  googleAnalyticsKey: string = 'UA-12345678';

  setCurrentPage(name: string):void {}

  initialiseAnalytics = (): Promise<any> =>
    new Promise((resolve) => {
      resolve();
    })

  logEvent(category: string, event: string, label?: string, value?: number) {}

  addCustomDimension(key: number, value: string) {}

  logError(message: string) {}

  logException(message: string, fatal: boolean) {}

  setUserId(userId: string) {}

  setDeviceId(deviceId: string) {}

  getDescriptiveDate(userDate: string) { return 'Tomorrow'; }

  getDiffDays(userDate: string) { return '4'; }
}
