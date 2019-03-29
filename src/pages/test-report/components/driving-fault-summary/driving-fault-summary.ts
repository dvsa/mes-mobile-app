import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getDrivingFaultSummaryCount } from '../../../../modules/tests/test_data/test-data.selector';
import { Subscription } from 'rxjs/Subscription';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { NavController } from 'ionic-angular';

interface DrivingFaultSummaryState {
  count$: Observable<number>;
}

@Component({
  selector: 'driving-fault-summary',
  templateUrl: 'driving-fault-summary.html',
})
export class DrivingFaultSummaryComponent implements OnInit, OnDestroy {

  componentState: DrivingFaultSummaryState;
  subscription: Subscription;

  constructor(
    private store$: Store<StoreModel>,
    private navController: NavController) {}

  ngOnInit(): void {
    this.componentState = {
      count$: this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestData),
        select(getDrivingFaultSummaryCount),
      ),
    };

    const { count$ } = this.componentState;

    this.subscription = count$.subscribe();
  }

  pass(): void {
    this.navController.push('DebriefPage', { outcome: 'pass' });

  }

  fail(): void {
    this.navController.push('DebriefPage', { outcome: 'fail' });

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
