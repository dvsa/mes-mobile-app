import { Injectable } from '@angular/core';
import { AppConfigProvider } from '../app-config/app-config';

@Injectable()
export class DeviceAuthenticationProvider {

  constructor(
    public appConfig: AppConfigProvider,
  ) { }

  triggerLockScreen = async (): Promise<boolean> => {
    return Promise.resolve(false);
  }
}
