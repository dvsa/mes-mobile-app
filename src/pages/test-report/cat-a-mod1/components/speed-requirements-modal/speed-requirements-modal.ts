import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
import { ModalReason } from './speed-requirements-modal.constants';

@IonicPage()
@Component({
  selector: 'speed-requirements-modal',
  templateUrl: 'speed-requirements-modal.html',
})
export class SpeedRequirementsModal implements OnInit {

  modalReason: ModalReason;

  faultType: any;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {
    this.faultType = this.navParams.get('legalRequirements');
  }

  ngOnInit() {
    this.modalReason = this.navParams.get('modalReason')
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onTerminate() {
    this.viewCtrl.dismiss();
  }

}
