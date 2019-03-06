import { IDeviceProvider } from './device.model';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';
import { AppConfigProvider } from '../../providers/app-config/app-config';

@Injectable()
export class DeviceProvider implements IDeviceProvider {
  private supportedDevices: string[] = [];

  constructor(
    public appConfig: AppConfigProvider,
    private device: Device,
    ) {
    this.supportedDevices = this.appConfig.getAppConfig().approvedDeviceIdentifiers;
  }

  validDeviceType = (): boolean => {
    const model = this.getDeviceType();
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

}
