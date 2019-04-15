import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTestRequirements } from '../../../../modules/tests/test_data/test-data.selector';
import { map } from 'rxjs/operators';
import {
  ToggleNormalStart1,
  ToggleNormalStart2,
  ToggleAngledStart,
  ToggleHillStart,
} from '../../../../modules/tests/test_data/test-data.actions';

interface LegalRequirementsComponentState {
  normalStart1$: Observable<boolean>;
  normalStart2$: Observable<boolean>;
  angledStart$: Observable<boolean>;
  hillStart$: Observable<boolean>;
}

@Component({
  selector: 'legal-requirements',
  templateUrl: 'legal-requirements.html',
})
export class LegalRequirementsComponent implements OnInit {

  componentState: LegalRequirementsComponentState;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {

    const testRequirements$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getTestRequirements),
    );

    this.componentState = {
      normalStart1$: testRequirements$.pipe(
        map(testRequirements => testRequirements.normalStart1),
      ),
      normalStart2$: testRequirements$.pipe(
        map(testRequirements => testRequirements.normalStart2),
      ),
      angledStart$: testRequirements$.pipe(
        map(testRequirements => testRequirements.angledStart),
      ),
      hillStart$: testRequirements$.pipe(
        map(testRequirements => testRequirements.hillStart),
      ),
    };
  }

  toggleNormalStart1(): void {
    this.store$.dispatch(new ToggleNormalStart1());
  }

  toggleNormalStart2(): void {
    this.store$.dispatch(new ToggleNormalStart2());
  }

  toggleAngledStart(): void {
    this.store$.dispatch(new ToggleAngledStart());
  }

  toggleHillStart(): void {
    this.store$.dispatch(new ToggleHillStart());
  }

}
