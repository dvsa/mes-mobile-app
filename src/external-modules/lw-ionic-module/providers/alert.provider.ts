import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentCore, Incident, Severity } from '@dvsa/lw-incident-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertSendReciept } from '../store/raised-alert/raised-alert.model';
import { loneWorkerConfigService, LoneWorkerConfig } from '../lone-worker-config.service';
// TODO LW-114: Use AppConfigProvider when raiseIncidentApiBaseUrl is added to remote config
// import { AppConfigProvider } from '../../../providers/app-config/app-config';

@Injectable()
export class AlertProvider {

  // // TODO LW-114: Update to read from config
  // configuration = {
  //   apiRoot: 'https://b7d9614c-d93c-4d01-9240-066175c35eef.mock.pstmn.io',
  // };

  constructor(
    @Inject(loneWorkerConfigService) private configuration: LoneWorkerConfig,
    public http: HttpClient,
) { }

  triggerAlert(
    incident: IncidentCore,
    // TODO LW-114: Use AppConfigProvider when raiseIncidentApiBaseUrl is added to remote config
    // appConfig: AppConfigProvider,
  ): Observable<AlertSendReciept> {
    console.log('### Sending alert');
    const postUri = `${this.configuration.apiRoot}/incident`;
    // TODO LW-114: Use AppConfigProvider when raiseIncidentApiBaseUrl is added to remote config
    // const postURI = `${appConfig.getAppConfig().raiseIncidentApiBaseUrl}/incident`;
    return this.http
      .post(postUri, incident)
      .pipe(map((value: AlertSendReciept) => value),
    );
  }

  fetchAmberAlerts(testCentreId: string): Observable<Incident[]> {
    const getUri = `${this.configuration.apiRoot}/recent-incidents/${Severity.Amber}/${testCentreId}`;

    return this.http
      .get(getUri)
      .pipe(map((value: Incident[]) => value));
  }
}
