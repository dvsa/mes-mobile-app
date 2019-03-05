import { IDeviceProvider } from './device.model';
import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

const supportedDevices: string[] = [
  'iPad7,4',
];

@Injectable()
export class DeviceProvider implements IDeviceProvider {
  constructor(
    private device: Device,
    ) { }

  validDeviceType = (): boolean => {
    const model = this.device.model;
    if (supportedDevices.findIndex(device => device === model) > -1) {
      return true;
    }
    return false;
  }

  getDeviceType = (): string => {
    return this.device.model;
  }

}
