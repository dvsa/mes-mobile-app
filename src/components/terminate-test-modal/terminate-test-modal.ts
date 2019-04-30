import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { DeviceAuthenticationProvider } from '../../providers/device-authentication/device-authentication';

@IonicPage()
@Component({
  selector: 'terminate-test-modal',
  templateUrl: 'terminate-test-modal.html',
})
export class TerminateTestModal {

  onCancel: Function;

  onTerminate: Function;

  constructor(
    private navParams: NavParams,
    private deviceAuthenticationProvider: DeviceAuthenticationProvider,
  ) {
    this.onCancel = this.navParams.get('onCancel');
  }

  /**
   * Fired when the termination of the test is confirmed.
   * Handles re-authentication and subsequent delegation to the onTerminate callback.
   */
  terminationWrapper(): Promise<void> {
    return this.deviceAuthenticationProvider.triggerLockScreen()
      .then(() => {
        this.onTerminate();
      });
  }

}
