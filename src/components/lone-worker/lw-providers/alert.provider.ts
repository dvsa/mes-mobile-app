import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '@dvsa/lw-incident-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertSendReciept } from '../lw-store/alert/alert.model';

@Injectable()
export class AlertProvider {

  configuration = {
    apiRoot: 'localhost...',
  };

  constructor(
    public http: HttpClient,
  ) { }

  triggerAlert(incident: Incident): Observable<AlertSendReciept> {
    const postUri = `${this.configuration.apiRoot}/incident`;
    return this.http
      .post(postUri, incident)
      .pipe(map((value: AlertSendReciept) => value),
    );
  }
}
