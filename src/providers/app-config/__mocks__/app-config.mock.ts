import { Observable } from 'rxjs';

import { EnviromentFile } from '../../../environment/models/environment.model';
import { localEnvironmentMock } from './environment.mock';
import { AppConfig } from '../app-config.model';

export class AppConfigProviderMock {

  environmentFile: EnviromentFile = localEnvironmentMock;

  public refreshConfigSettings = (): Observable<any> => {
    return;
  }

  public getAppConfig(): AppConfig {
    return{
      googleAnalyticsId: localEnvironmentMock.googleAnalyticsId,
      userIdDimensionIndex: localEnvironmentMock.userIdDimensionIndex,
      authentication: {
        clientId: localEnvironmentMock.authentication.clientId,
        context: localEnvironmentMock.authentication.context,
        redirectUrl: localEnvironmentMock.authentication.redirectUrl,
        resourceUrl: localEnvironmentMock.authentication.resourceUrl,
        logoutUrl: localEnvironmentMock.authentication.logoutUrl,
      },
      journal: {
        journalUrl: localEnvironmentMock.journal.journalUrl
      }
    } ;
  }
}
