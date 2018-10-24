import { Injectable } from '@angular/core';
import { Plugin, Cordova, IonicNativePlugin } from '@ionic-native/core';

/**
 * @name Autonomous Single App Mode
 * @description
 * This plugin provide API to enable Autonomous Single App Mode (Guided Access)
 *
 * @usage
 * ```typescript
 * import { ASAM } from '@ionic-native/asam';
 *
 *
 * constructor(private aSAM: ASAM) { }
 *
 * ...
 *
 *
 * this.aSAM.toggle(true)
 *     .then((didSucceeded)=> console.log(didSucceeded))
 * ```
 */
@Plugin({
  pluginName: 'ASAM',
  plugin: 'cordova-plugin-autonomous-single-app-mode',
  pluginRef: 'cordova.plugins.ASAM', // the variable reference to call the plugin, example: navigator.geolocation
  repo: 'https://github.com/dvsa/cordova-plugin-autonomous-single-app-mode',
  platforms: ['iOS']
})
@Injectable()
export class ASAM extends IonicNativePlugin {
  /**
   * Tries to toggle ASAM.
   * @param flag {boolean} true enables ASAM, false disable ASAM
   * @return {Promise<boolean>} Returns a promise that resolves with boolean value that describes if toggle succeeded
   */
  @Cordova()
  toggle(flag: boolean): Promise<boolean> {
    return;
  }
}
