import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import {
  ToggleLegalRequirement,
} from '../../../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import { LegalRequirements } from '../../../../modules/tests/test-data/test-data.constants';
@Component({
  selector: 'multi-legal-requirement',
  templateUrl: 'multi-legal-requirement.html',
})
export class MultiLegalRequirementComponent {

  @Input()
  legalRequirement1: LegalRequirements;
  @Input()
  legalRequirement2: LegalRequirements;
  @Input()
  requirement1Ticked: boolean;
  @Input()
  requirement2Ticked: boolean;
  @Input()
  label: string;
  constructor(
    private store$: Store<StoreModel>,
  ) {}

  getLabel = (): string => this.label;

  toggleLegalRequirement = (): void => {
    if (!this.requirement1Ticked && !this.requirement2Ticked) {
      this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement1));
    }
    if (this.requirement1Ticked && !this.requirement2Ticked) {
      this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement2));
    }
    if (this.requirement1Ticked && this.requirement2Ticked) {
      this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement1));
      this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement2));
    }
  }

  /**
   * Function to check if a legal requirement should use the normal-start-label class
   */
  getLegalRequirementClass(): string {
    let cssClass: string = 'label';
    if (this.legalRequirement1.indexOf('normalStart') >= 0) {
      cssClass = 'normal-start-label';
    }

    return cssClass;
  }
}
