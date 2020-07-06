import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';

@IonicPage()
@Component({
  selector: 'terminate-test-modal',
  templateUrl: 'terminate-test-modal.html',
})
export class TerminateTestModal {

  onCancel: Function;

  onTerminate: Function;

  shouldAuthenticate: boolean = true;

  constructor(
    private navParams: NavParams,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
  ) {
    this.onCancel = this.navParams.get('onCancel');
    this.onTerminate = this.navParams.get('onTerminate');
    this.shouldAuthenticate = this.navParams.get('shouldAuthenticate');
  }

  /**
   * Fired when the termination of the test is confirmed.
   * Handles re-authentication and subsequent delegation to the onTerminate callback.
   */
  terminationWrapper(): Promise<void> {
    if (this.shouldAuthenticate) {
      return this.deviceAuthenticationProvider.triggerLockScreen()
        .then(() => {
          this.onTerminate();
        }).catch(err => console.error(err));
    }
    this.onTerminate();
    return Promise.resolve();
  }

}
