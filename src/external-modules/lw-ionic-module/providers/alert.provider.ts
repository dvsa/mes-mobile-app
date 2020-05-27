import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IncidentCore, Incident, Severity, Location } from '@dvsa/lw-incident-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertSendReciept } from '../store/raised-alert/raised-alert.model';
import { LoneWorkerConfigProvider } from './lone-worker-config.provider';

@Injectable()
export class AlertProvider {

  constructor(
    public configProvider: LoneWorkerConfigProvider,
    public http: HttpClient,
  ) { }

  triggerAlert(
    incident: IncidentCore,
  ): Observable<AlertSendReciept> {
    console.log('### Sending alert');
    const postUri = `${this.configProvider.apiRoot()}/incident`;
    // TODO LW-114: Use AppConfigProvider when raiseIncidentApiBaseUrl is added to remote config
    // const postURI = `${appConfig.getAppConfig().raiseIncidentApiBaseUrl}/incident`;
    return this.http
      .post(postUri, incident)
      .pipe(map((value: AlertSendReciept) => value),
      );
  }

  fetchAmberAlerts(testCentreId: string): Observable<Incident[]> {
    const getUri = `${this.configProvider.apiRoot()}/recent-incidents/${Severity.Amber}/${testCentreId}`;

    return this.http
      .get(getUri)
      .pipe(map((value: Incident[]) => value));
  }

  updateIncidentLocation(incidentId: string, location: Location): Observable<Incident> {
    const patchUri = `${this.configProvider.apiRoot()}/incident/location/${incidentId}`;

    return this.http
      .patch(patchUri, location)
      .pipe(map((value: Incident) => value));
  }
}
