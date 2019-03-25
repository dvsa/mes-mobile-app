import { Injectable } from '@angular/core';

declare let cordova: any;

@Injectable()
export class LockScreenProvider {

  constructor(
    ) { }

  triggerLockScreen = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (cordova && cordova.plugins && cordova.plugins.DeviceAuthentication) {

        console.log('start ');
        cordova.plugins.DeviceAuthentication.runAuthentication('Please authenticate yourself to proceed')
                .then((isAuthenticated: boolean) => {
                  console.log(`${isAuthenticated} - is authenticated`);
                  return resolve(isAuthenticated);
                })
                .catch((errorMsg: string) => {
                  console.log('is not authenticated');
                  return reject(false);
                });
      }else {
        console.log('not cordova');
        return reject(false);
      }
    });
  }
}
