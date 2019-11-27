import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../test-report.constants';

@IonicPage()
@Component({
  selector: 'legal-requirements-modal',
  templateUrl: 'legal-requirements-modal.html',
})
export class LegalRequirementsModal {

  legalRequirements: string[];

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {
    this.legalRequirements = this.navParams.get('legalRequirements');
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onTerminate() {
    this.viewCtrl.dismiss(ModalEvent.TERMINATE);
  }

}
