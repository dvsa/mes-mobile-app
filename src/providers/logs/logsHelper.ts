import { LogType, Log } from '../../shared/models/log.model';
import { select, Store } from '@ngrx/store';
import { getAppInfoState } from '../../modules/app-info/app-info.reducer';
import { getVersionNumber, getEmployeeId } from '../../modules/app-info/app-info.selector';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { StoreModel } from '../../shared/models/store.model';
import { Device } from '@ionic-native/device';
import { Injectable } from '@angular/core';

@Injectable()
export class LogHelper {

  private appVersion: string;
  private employeeId: string;

  constructor(
    public device: Device,
    private store$: Store<StoreModel>,
  ) {
    const versionNumber$ = this.store$.pipe(
      select(getAppInfoState),
      map(getVersionNumber),
      map(appVersion => this.appVersion = appVersion),
    );
    const employeeId$ = this.store$.pipe(
      select(getAppInfoState),
      map(getEmployeeId),
      map(employeeId => this.employeeId = employeeId),
    );
    merge(
      versionNumber$,
      employeeId$,
    ).subscribe();
  }

  createLog(logType: LogType, desc: string, error: string): Log {
    return {
      message: error,
      type: logType,
      timestamp: Date.now(),
      description: desc,
      appVersion: this.appVersion,
      iosVersion: this.device.version,
      deviceId: this.device.uuid,
      drivingExaminerId: this.employeeId,
    };
  }
}
