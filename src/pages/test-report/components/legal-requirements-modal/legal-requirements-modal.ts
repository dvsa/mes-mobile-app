import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { CatBLegalRequirements } from '../../../../modules/tests/test-data/test-data.models';
import { legalRequirementsLabels } from '../../../../shared/constants/legal-requirements/catb-legal-requirements';

@IonicPage()
@Component({
  selector: 'legal-requirements-modal',
  templateUrl: 'legal-requirements-modal.html',
})
export class LegalRequirementsModal {

  onCancel: Function;
  onTerminate: Function;
  // TODO - Change the type to make this generic for other test categories
  legalRequirements: CatBLegalRequirements;

  constructor(
    private navParams: NavParams,
  ) {
    this.onCancel = this.navParams.get('onCancel');
    this.onTerminate = this.navParams.get('onTerminate');
    this.legalRequirements = this.navParams.get('legalRequirements');
  }

  getLegalRequirementsText(): string[] {
    return Object.keys(this.legalRequirements)
      .map(req => !this.legalRequirements[req] ? legalRequirementsLabels[req] : null)
      .filter((val, i, arr) => arr.indexOf(val) === i && val !== null);
  }

}
