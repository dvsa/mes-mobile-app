import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { LegalRequirements } from '../../../../modules/tests/test-data/test-data.models';
import { legalRequirementsLabels } from '../../../../shared/constants/legal-requirements/legal-requirements.constants';
import { ModalEvent } from '../../test-report.constants';

@IonicPage()
@Component({
  selector: 'legal-requirements-modal',
  templateUrl: 'legal-requirements-modal.html',
})
export class LegalRequirementsModal {

  legalRequirements: LegalRequirements;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
  ) {
    this.legalRequirements = this.navParams.get('legalRequirements');
  }

  getLegalRequirementsText(): string[] {
    return Object.keys(this.legalRequirements)
      .map(req => !this.legalRequirements[req] ? legalRequirementsLabels[req] : null)
      .filter((val, i, arr) => arr.indexOf(val) === i && val !== null);
  }

  onCancel() {
    this.viewCtrl.dismiss(ModalEvent.CANCEL);
  }

  onTerminate() {
    this.viewCtrl.dismiss(ModalEvent.TERMINATE);
  }

}
