import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ExitRekeyModalEvent } from './exit-rekey-modal.constants';

@IonicPage()
@Component({
  selector: 'exit-rekey-modal',
  templateUrl: 'exit-rekey-modal.html',
})
export class ExitRekeyModal {

  constructor(
    private viewCtrl: ViewController,
    public params: NavParams,
  ) { }

  onCancel() {
    this.viewCtrl.dismiss(ExitRekeyModalEvent.CANCEL);
  }

  onExitRekey() {
    this.viewCtrl.dismiss(ExitRekeyModalEvent.EXIT_REKEY);
  }

}
