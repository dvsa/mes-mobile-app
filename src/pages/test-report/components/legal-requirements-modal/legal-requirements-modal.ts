import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { CatBLegalRequirements } from '../../../../modules/tests/test-data/test-data.models';
import { legalRequirementsLabels } from '../../../../shared/constants/legal-requirements/catb-legal-requirements';
import { ModalEvent } from '../../test-report.constants';

@IonicPage()
@Component({
  selector: 'legal-requirements-modal',
  templateUrl: 'legal-requirements-modal.html',
})
export class LegalRequirementsModal {

  // TODO - Change the type to make this generic for other test categories
  legalRequirements: CatBLegalRequirements;

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
