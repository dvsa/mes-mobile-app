import { IDeviceProvider } from './device.model';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { AppConfigProvider } from '../../providers/app-config/app-config';

declare let cordova: any;

@Injectable()
export class DeviceProvider implements IDeviceProvider {
  private supportedDevices: string[] = [];

  constructor(
    public appConfig: AppConfigProvider,
    public device: Device,
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
          console.log(`Call to ${enabled ? 'enable' : 'disable'} ASAM ${didSucceed ? 'succeeded' : 'failed'}`);
          return resolve(didSucceed);
        });
      } else {
        return reject(false);
      }
    });
  }

}
