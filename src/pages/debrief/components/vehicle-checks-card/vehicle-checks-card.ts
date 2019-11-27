import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
// TODO: update import for category specific component
import { getVehicleChecks } from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import {
  tellMeQuestionHasFault,
  hasVehicleChecksFault,
  getShowMeQuestionOutcome,
} from './vehicle-checks-card.selector';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { map } from 'rxjs/operators';

interface VehicleChecksCardComponentState {
  showMeQuestionOutcome$: Observable<QuestionOutcome>;
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
  hasShowMeFault: boolean = false;

  subscription: Subscription;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    const vehicleChecks$: Observable<CatBUniqueTypes.VehicleChecks> = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
    );

    this.componentState = {
      showMeQuestionOutcome$: vehicleChecks$.pipe(
        select(getShowMeQuestionOutcome),
      ),
      tellMeQuestionHasFault$: vehicleChecks$.pipe(
        select(tellMeQuestionHasFault),
      ),
      hasVehicleChecksFault$: vehicleChecks$.pipe(
        select(hasVehicleChecksFault),
      ),
    };

    const { hasVehicleChecksFault$, showMeQuestionOutcome$ } = this.componentState;

    this.subscription = merge(
      hasVehicleChecksFault$.pipe(map(val => this.hasFault = val)),
      showMeQuestionOutcome$.pipe(map(val => this.hasShowMeFault = val !== CompetencyOutcome.P)),
    ).subscribe();

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
