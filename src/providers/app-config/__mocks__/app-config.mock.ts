import { EnvironmentFile } from '../../../environment/models/environment.model';
import { localEnvironmentMock } from './environment.mock';
import { AppConfig } from '../app-config.model';

export class AppConfigProviderMock {

  environmentFile: EnvironmentFile = localEnvironmentMock;

  public loadRemoteConfig = jasmine.createSpy('loadRemoteConfig')
    .and
    .returnValue(Promise.resolve());

  public getAppConfig = jasmine.createSpy('getAppConfig')
    .and
    .returnValue({
      configUrl: localEnvironmentMock.configUrl,
      googleAnalyticsId: localEnvironmentMock.googleAnalyticsId,
      authentication: {
        clientId: localEnvironmentMock.authentication.clientId,
        context: localEnvironmentMock.authentication.context,
        redirectUrl: localEnvironmentMock.authentication.redirectUrl,
        resourceUrl: localEnvironmentMock.authentication.resourceUrl,
        logoutUrl: localEnvironmentMock.authentication.logoutUrl,
        employeeIdKey: localEnvironmentMock.authentication.employeeIdKey,
      },
      journal: {
        journalUrl: localEnvironmentMock.journal.journalUrl,
        autoRefreshInterval: localEnvironmentMock.journal.autoRefreshInterval,
        numberOfDaysToView: localEnvironmentMock.journal.numberOfDaysToView,
      },
      logging: {
        url: localEnvironmentMock.logging.url,
        autoSendInterval: localEnvironmentMock.logging.autoSendInterval,
      },
    } as AppConfig);
}
