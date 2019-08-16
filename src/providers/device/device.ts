import { IDeviceProvider } from './device.model';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogType } from '../../shared/models/log.model';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { LogHelper } from '../logs/logsHelper';

declare let cordova: any;

@Injectable()
export class DeviceProvider implements IDeviceProvider {
  private supportedDevices: string[] = [];

  constructor(
    public appConfig: AppConfigProvider,
    public device: Device,
    private store$: Store<StoreModel>,
    private logHelper: LogHelper,
  ) {
  }

  validDeviceType = (): boolean => {
    const model = this.getDeviceType();
    this.supportedDevices = this.appConfig.getAppConfig().approvedDeviceIdentifiers;
    if (this.supportedDevices.findIndex(device => device === model) > -1) {
      return true;
    }
    return false;
  }

  getDeviceType = (): string => {
    return this.device.model;
  }

  getUniqueDeviceId = (): string => {
    return this.device.uuid;
  }

  enableSingleAppMode = async (): Promise<boolean> => {
    return await this.setSingleAppMode(true);
  }

  disableSingleAppMode = async (): Promise<boolean> => {
    return await this.setSingleAppMode(false);
  }

  setSingleAppMode = (enabled: boolean): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (cordova && cordova.plugins && cordova.plugins.ASAM) {
        cordova.plugins.ASAM.toggle(enabled, (didSucceed: boolean) => {
          const logMessage = `Call to ${enabled ? 'enable' : 'disable'} ASAM ${didSucceed ? 'succeeded' : 'failed'}`;
          console.log(logMessage);
          if (!didSucceed) {
            const logError = `${enabled ? 'Enabling' : 'Disabling'} ASAM`;
            this.store$.dispatch(new SaveLog(this.logHelper.createLog(LogType.ERROR, logError, logMessage)));
          }
          return resolve(didSucceed);
        });
      } else {
        return reject(false);
      }
    });
  }

}
