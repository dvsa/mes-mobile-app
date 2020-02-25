import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod2/test-data.cat-a-mod2.reducer';
import { getTestCategory } from '../../../../../modules/tests/category/category.reducer';
import { map, withLatestFrom } from 'rxjs/operators';
import { getSafetyAndBalanceQuestions }
  from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.selector';
import { FaultCountProvider } from '../../../../../providers/fault-count/fault-count';
import { Observable } from 'rxjs/Observable';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

interface ComponentState {
  safetyAndBalanceDrivingFaultCount$: Observable<number>;
}

@Component({
  selector: 'safety-and-balance',
  templateUrl: 'safety-and-balance.html',
})
export class SafetyAndBalanceComponent implements OnInit {
  componentState: ComponentState;
  category: TestCategory = TestCategory.EUAM2;

  constructor(
    private store$: Store<StoreModel>,
    public faultCountProvider: FaultCountProvider) {}

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const category$ = currentTest$.pipe(
      select(getTestCategory),
      map((result => this.category = result as TestCategory)),
    );

    this.componentState = {
      safetyAndBalanceDrivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(getSafetyAndBalanceQuestions),
        withLatestFrom(category$),
        map(([safetyAndBalance, category]) => {
          return this.faultCountProvider
            .getSafetyAndBalanceFaultCount(category, safetyAndBalance)
            .drivingFaults;
        }),
      ),
    };
  }
}
