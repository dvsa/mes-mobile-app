import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ModalEvent } from './journal-rekey-modal.constants';

@IonicPage()
@Component({
  selector: 'journal-rekey-modal',
  templateUrl: 'journal-rekey-modal.html',
})
export class JournalRekeyModal {

  constructor(
    private viewCtrl: ViewController,
  ) {}

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onStartTest() {
    this.viewCtrl.dismiss(ModalEvent.START);
  }

  onRekeyTest() {
    this.viewCtrl.dismiss(ModalEvent.REKEY);
  }
}
