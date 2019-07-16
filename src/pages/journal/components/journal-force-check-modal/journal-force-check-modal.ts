import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ModalEvent } from './journal-force-check-modal.constants';

@IonicPage()
@Component({
  selector: 'journal-force-check-modal',
  templateUrl: 'journal-force-check-modal.html',
})
export class JournalForceCheckModal {

  constructor(
    private viewCtrl: ViewController,
  ) { }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }
}
