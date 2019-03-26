import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

declare let cordova: any;

@Injectable()
export class DeviceAuthenticationProvider {

  constructor(
    private platform: Platform,
  ) { }

  triggerLockScreen = async (): Promise<boolean> => {

    return new Promise<boolean>((resolve, reject) => {

      this.platform.ready().then(() => {

        if (!this.platform.is('ios')) {
          return(resolve(true));
        }
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
    });
  }
}
