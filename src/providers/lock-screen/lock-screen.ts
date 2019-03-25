import { Injectable } from '@angular/core';

declare let cordova: any;

@Injectable()
export class LockScreenProvider {

  constructor() { }

  triggerLockScreen = async (): Promise<any> => {

    return new Promise((resolve, reject) => {

      if (cordova && cordova.plugins && cordova.plugins.DeviceAuthentication) {

        cordova.plugins.DeviceAuthentication.runAuthentication(
          'Please enter your passcode',
          (successful: boolean) => {
            return successful ? resolve(true) : reject(false);
          },
          () => {
            return reject(false);
          },
        );

      } else {
        return reject(false);
      }
    });
  }
}
