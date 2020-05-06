import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Incident } from '@dvsa/lw-incident-model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AlertSendReciept } from '../lw-store/alert/alert.model';

@Injectable()
export class AlertProvider {

  // TODO: Update to read from config
  configuration = {
    apiRoot: 'localhost...',
  };

  constructor(
    public http: HttpClient,
  ) { }

  triggerAlert(incident: Incident): Observable<AlertSendReciept> {
    console.log('### Sending alert');
    const postUri = `${this.configuration.apiRoot}/incident`;
    return this.http
      .post(postUri, incident)
      .pipe(map((value: AlertSendReciept) => value),
    );
  }
}
