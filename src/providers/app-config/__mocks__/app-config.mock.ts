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
      googleAnalyticsId: 'test',
      userIdDimensionIndex: 102
    } ;
  }
}
