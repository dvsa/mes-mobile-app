import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Log } from '../../shared/models/log.model';
import { UrlProvider } from '../url/url';
import { Observable } from 'rxjs/Observable';
import { AuthenticationProvider } from '../authentication/authentication';
import { Device } from '@ionic-native/device';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { map } from 'rxjs/operators';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { cloneDeep } from 'lodash';

@Injectable()
export class LogsProvider {

  private appVersion: string;

  constructor(
    public http: HttpClient,
    public urlProvider: UrlProvider,
    public authProvider: AuthenticationProvider,
    public device: Device,
    private store$: Store<StoreModel>,
  ) {
    this.store$.pipe(
      select(getAppInfoState),
      map(getVersionNumber),
    ).subscribe(
      (appVersion) => {
        this.appVersion = appVersion;
      },
    );
  }

  public sendLogs = (logs: Log[]): Observable<Object> => {
    if (logs.length > 0) {
      const logsServiceUrl = this.urlProvider.getLogsServiceUrl();
      let newLogs: Log[] = cloneDeep(logs);

      newLogs = newLogs.map((log) => {
        return {
          ...log,
          appVersion: this.appVersion,
          iosVersion: this.device.version,
        } as Log;
      });
      return this.http.post(logsServiceUrl, newLogs);
    }
    return of();
  }

}
