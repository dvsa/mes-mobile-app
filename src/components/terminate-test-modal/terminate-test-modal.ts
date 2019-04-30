import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'terminate-test-modal',
  templateUrl: 'terminate-test-modal.html',
})
export class TerminateTestModal {

  onCancel: Function;

  constructor(
    private navParams: NavParams,
  ) {
    this.onCancel = this.navParams.get('onCancel');
  }

}
