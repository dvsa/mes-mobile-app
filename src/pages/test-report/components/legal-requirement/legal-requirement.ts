import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import {
  getTestRequirements,
  hasLegalRequirementBeenCompleted,
} from '../../../../modules/tests/test-data/test-data.selector';
import {
  ToggleLegalRequirement,
} from '../../../../modules/tests/test-data/test-requirements/test-requirements.actions';
import { LegalRequirements, CatBeLegalRequirements } from '../../../../modules/tests/test-data/test-data.constants';
import { catBlegalRequirementLabels, catBelegalRequirementLabels } from './legal-requirement.constants';

interface LegalRequirementComponentState {
  ticked$: Observable<boolean>;
}

@Component({
  selector: 'legal-requirement',
  templateUrl: 'legal-requirement.html',
})
export class LegalRequirementComponent {

  @Input()
  legalRequirement: LegalRequirements | CatBeLegalRequirements;

  componentState: LegalRequirementComponentState;
  subscription: Subscription;

  constructor(
    private store$: Store<StoreModel>,
  ) {}

  ngOnInit(): void {

    this.componentState = {
      ticked$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getTestRequirements),
        select(testrequirements => hasLegalRequirementBeenCompleted(testrequirements, this.legalRequirement)),
      ),
    };
  }

  getLabel = (): string =>
  catBlegalRequirementLabels[this.legalRequirement] || catBelegalRequirementLabels[this.legalRequirement]

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
