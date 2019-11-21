import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  ToggleLegalRequirement,
} from '../../../../modules/tests/test-data/test-requirements/test-requirements.actions';
import { LegalRequirements } from '../../../../modules/tests/test-data/test-data.constants';
import { legalRequirementLabels } from './legal-requirement.constants';

@Component({
  selector: 'legal-requirement',
  templateUrl: 'legal-requirement.html',
})
export class LegalRequirementComponent {

  @Input()
  legalRequirement: LegalRequirements;
  @Input()
  ticked: boolean;

  constructor(
    private store$: Store<StoreModel>,
  ) {}

  getLabel = (): string => legalRequirementLabels[this.legalRequirement];

  toggleLegalRequirement = (): void => {
    this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement));
  }

  /**
   * Function to check if a legal requirement should use the normal-start-label class
   */
  getLegalRequirementClass(): string {
    let cssClass: string = 'label';
    if (this.legalRequirement.indexOf('normalStart') >= 0) {
      cssClass = 'normal-start-label';
    }

    return cssClass;
  }
}
