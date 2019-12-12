import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getVehicleChecks } from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
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
        select(VehicleChecksCardComponent.getShowMeQuestionOutcome),
      ),
      tellMeQuestionHasFault$: vehicleChecks$.pipe(
        select(VehicleChecksCardComponent.tellMeQuestionHasFault),
      ),
      hasVehicleChecksFault$: vehicleChecks$.pipe(
        select(VehicleChecksCardComponent.hasVehicleChecksFault),
      ),
    };

    const { hasVehicleChecksFault$, showMeQuestionOutcome$ } = this.componentState;

    this.subscription = merge(
      hasVehicleChecksFault$.pipe(map(val => this.hasFault = val)),
      showMeQuestionOutcome$.pipe(map(val => this.hasShowMeFault = val !== CompetencyOutcome.P)),
    ).subscribe();

  }

  static tellMeQuestionHasFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean =>
    vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF

  static getShowMeQuestionOutcome = (vehicleChecks: CatBUniqueTypes.VehicleChecks): QuestionOutcome =>
    vehicleChecks.showMeQuestion.outcome

  static hasVehicleChecksFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean =>
  (vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P)
      || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
