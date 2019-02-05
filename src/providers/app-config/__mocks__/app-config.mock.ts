import { Observable } from 'rxjs/Observable';

import { EnvironmentFile } from '../../../environment/models/environment.model';
import { localEnvironmentMock } from './environment.mock';
import { AppConfig } from '../app-config.model';

export class AppConfigProviderMock {

  environmentFile: EnvironmentFile = localEnvironmentMock;

  public refreshConfigSettings = (): Observable<any> => {
    return;
  }

  public getAppConfig(): AppConfig {
    return {
      googleAnalyticsId: localEnvironmentMock.googleAnalyticsId,
      userIdDimensionIndex: localEnvironmentMock.userIdDimensionIndex,
      authentication: {
        clientId: localEnvironmentMock.authentication.clientId,
        context: localEnvironmentMock.authentication.context,
        redirectUrl: localEnvironmentMock.authentication.redirectUrl,
        resourceUrl: localEnvironmentMock.authentication.resourceUrl,
        logoutUrl: localEnvironmentMock.authentication.logoutUrl,
        openIdConnectUrl: localEnvironmentMock.authentication.openIdConnectUrl,
        identityPoolId: localEnvironmentMock.authentication.identityPoolId,
        employeeIdKey: localEnvironmentMock.authentication.employeeIdKey
      },
      aws: {
        region: localEnvironmentMock.aws.region
      },
      journal: {
        journalUrl: localEnvironmentMock.journal.journalUrl,
        autoRefreshInterval: localEnvironmentMock.journal.autoRefreshInterval
      }
    };
  }
}
