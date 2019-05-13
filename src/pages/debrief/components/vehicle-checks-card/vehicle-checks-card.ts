import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getVehicleChecks } from '../../../../modules/tests/test-data/test-data.selector';
import { getShowMeQuestionText, getTellMeQuestionText, hasVehicleChecksFault } from './vehicle-checks-card.selector';
import { Subscription } from 'rxjs/Subscription';

interface VehicleChecksCardComponentState {
  showMeQuestion$: Observable<string>;
  tellMeQuestion$: Observable<string>;
  hasVehicleChecksFault$: Observable<boolean>;
}

@Component({
  selector: 'vehicle-checks-card',
  templateUrl: 'vehicle-checks-card.html',
})
export class VehicleChecksCardComponent implements OnInit, OnDestroy {

  componentState: VehicleChecksCardComponentState;
  hasFault: boolean = false;

  subscription: Subscription;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {
    const vehicleChecks$: Observable<VehicleChecks> = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
    );

    this.componentState = {
      showMeQuestion$: vehicleChecks$.pipe(
        select(getShowMeQuestionText),
      ),
      tellMeQuestion$: vehicleChecks$.pipe(
        select(getTellMeQuestionText),
      ),
      hasVehicleChecksFault$: vehicleChecks$.pipe(
        select(hasVehicleChecksFault),
      ),
    };

    const { hasVehicleChecksFault$ } = this.componentState;

    this.subscription = hasVehicleChecksFault$.subscribe(val => this.hasFault = val);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
