import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { Subscription } from 'rxjs/Subscription';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { FaultCountProvider } from '../../../../providers/fault-count/fault-count';
import { withLatestFrom, map } from 'rxjs/operators';
import { TestCategory } from '../../../../shared/models/test-category';
import { getTestCategory } from '../../../../modules/tests/category/category.reducer';

interface DrivingFaultSummaryState {
  count$: Observable<number>;
}

@Component({
  selector: 'driving-fault-summary',
  templateUrl: 'driving-fault-summary.html',
})
export class DrivingFaultSummaryComponent implements OnInit {

  componentState: DrivingFaultSummaryState;
  subscription: Subscription;

  constructor(
    private store$: Store<StoreModel>,
    private faultCountProvider: FaultCountProvider,
  ) { }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const category$ = currentTest$.pipe(
      select(getTestCategory),
    );
    this.componentState = {
      count$: currentTest$.pipe(
        select(getTestData),
        withLatestFrom(category$),
        map(([testData, category]) => {
          return this.faultCountProvider.getDrivingFaultSumCount(category as TestCategory, testData);
        }),
      ),
    };
  }

  ionViewWillEnter(): void {
    if (this.componentState && this.componentState.count$) {
      this.subscription = this.componentState.count$.subscribe();
    }
  }

  ionViewDidLeave(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
