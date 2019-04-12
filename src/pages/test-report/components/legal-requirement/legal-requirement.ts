import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import {
  getTestRequirements,
  hasLegalRequirementBeenCompleted,
} from '../../../../modules/tests/test_data/test-data.selector';
import { ToggleLegalRequirement } from '../../../../modules/tests/test_data/test-data.actions';
import { LegalRequirements } from '../../../../modules/tests/test_data/test-data.constants';
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

  touchStateDelay: number = 100;

  touchState: boolean = false;
  touchTimeout: any;

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

  toggleLegalRequirement(): void {
    this.store$.dispatch(new ToggleLegalRequirement(this.legalRequirement));
  }

  onTouchStart():void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
  }

  onTouchEnd():void {
    // defer the removal of the touch state to allow the page to render
    this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
  }

}
