import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getVehicleChecks } from '../../../../modules/tests/test-data/test-data.selector';
import { getShowMeQuestionText, tellMeQuestionHasFault, hasVehicleChecksFault } from './vehicle-checks-card.selector';
import { Subscription } from 'rxjs/Subscription';

interface VehicleChecksCardComponentState {
  showMeQuestion$: Observable<string>;
  tellMeQuestionHasFault$: Observable<boolean>;
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

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );
    const vehicleChecks$: Observable<VehicleChecks> = currentTest$.pipe(
      select(getTestData),
      select(getVehicleChecks),
    );

    this.componentState = {
      showMeQuestion$: vehicleChecks$.pipe(
        select(getShowMeQuestionText),
      ),
      tellMeQuestionHasFault$: vehicleChecks$.pipe(
        select(tellMeQuestionHasFault),
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
