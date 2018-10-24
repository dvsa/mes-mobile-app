import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

/**
 * @name Device Authentication
 * @description
 * This plugin provide API to enable device authentication screen like TouchId, FaceId or passcode
 *
 * @usage
 * ```typescript
 * import { DeviceAuthentication } from '@ionic-native/device-authentication';
 *
 *
 * constructor(private deviceAuthentication: DeviceAuthentication) { }
 *
 * ...
 *
 *
 * this.deviceAuthentication.runAuthentication('Subtitle')
 *     .then((isAuthenticated)=> console.log(isAuthenticated))
 *     .catch((errorMsg) => console.log('error: ' + errorMsg))
 *
 * ```
 */
@Plugin({
  pluginName: 'DeviceAuthentication',
  plugin: 'device-authentication-plugin',
  pluginRef: 'cordova.plugins.DeviceAuthentication', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/dvsa/cordova-plugin-device-authentication',
  platforms: ['iOS']
})
@Injectable()
export class DeviceAuthentication extends IonicNativePlugin {
  /**
   * Run device authentication prompt. If FaceId/TouchId is set it shows prompt to use either one of them. If none of them are set it show passcode screen.
   * @param message {string} Message that is show in authentication prompt
   * @return {Promise<boolean>} Returns a promise that resolves when user tried to authenticate
   * @throws {Promise<string>} Returns a promise that rejects when there are some errors. Returned string contains localized message
   */
  /* istanbul ignore next */
  @Cordova()
  runAuthentication(message: string): Promise<boolean> {
    return;
  }
}
