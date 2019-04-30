import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'terminate-test-modal',
  templateUrl: 'terminate-test-modal.html',
})
export class TerminateTestModal {

  constructor(
    public navCtrl: NavController,
  ) {
  }

  popToRoot() {
    this.navCtrl.popToRoot();
  }
}
