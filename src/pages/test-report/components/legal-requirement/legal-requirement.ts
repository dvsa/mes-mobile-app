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
} from '../../../../modules/tests/test-data/test-data.selector';
import {
  hasLegalRequirementBeenCompleted,
} from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import {
  ToggleLegalRequirement,
} from '../../../../modules/tests/test-data/test-requirements/test-requirements.actions';
import { LegalRequirements } from '../../../../modules/tests/test-data/test-data.constants';
import { legalRequirementLabels } from './legal-requirement.constants';

interface LegalRequirementComponentState {
  ticked$: Observable<boolean>;
}

@Component({
  selector: 'legal-requirement',
  templateUrl: 'legal-requirement.html',
})
export class LegalRequirementComponent {

  @Input()
  legalRequirement: LegalRequirements;

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

  getLabel = (): string => legalRequirementLabels[this.legalRequirement];

  toggleLegalRequirement = (): void => {
    this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement));
  }

}
