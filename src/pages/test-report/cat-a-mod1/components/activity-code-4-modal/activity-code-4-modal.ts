import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
import { ModalReason } from './activity-code-4-modal.constants';

@IonicPage()
@Component({
  selector: 'activity-code-4-modal',
  templateUrl: 'activity-code-4-modal.html',
})
export class ActivityCode4Modal implements OnInit {

  modalReason: ModalReason;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {
  }

  ngOnInit() {
    this.modalReason = this.navParams.get('modalReason');
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onEndTest() {
    this.viewCtrl.dismiss();
  }

}
