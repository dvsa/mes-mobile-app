import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'end-test-modal',
  templateUrl: 'end-test-modal.html',
})
export class EndTestModal {

  onContinue: Function;
  onTerminate: Function;
  onCancel: Function;

  constructor(
    private navParams: NavParams,
  ) {
    this.onContinue = this.navParams.get('onContinue');
    this.onTerminate = this.navParams.get('onTerminate');
    this.onCancel = this.navParams.get('onCancel');
  }

}
