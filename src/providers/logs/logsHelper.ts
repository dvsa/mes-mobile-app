import { LogType, Log } from '../../shared/models/log.model';
import { select, Store } from '@ngrx/store';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber } from '../../modules/app-info/app-info.selector';
import { map } from 'rxjs/operators';
import { StoreModel } from '../../shared/models/store.model';
import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';

@Injectable()
export class LogHelper {

  private appVersion: string;

  constructor(
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

  createLog(logType: LogType, desc: string, error: string): Log {
    return {
      message: error,
      type: logType,
      timestamp: Date.now(),
      description: desc,
      appVersion: this.appVersion,
      iosVersion: this.device.version,
    };
  }
}
