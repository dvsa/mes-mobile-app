import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { ModalEvent } from './practice-test-modal.constants';

@IonicPage()
@Component({
  selector: 'practice-test-modal',
  templateUrl: 'practice-test-modal.html',
})
export class PracticeTestModal {

  constructor(
    private viewCtrl: ViewController,
  ) {}

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onNoFault() {
    this.viewCtrl.dismiss(ModalEvent.NO_FAULT);
  }

  onFault() {
    this.viewCtrl.dismiss(ModalEvent.FAULT);
  }

}
