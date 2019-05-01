import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getVehicleChecks } from '../../../../modules/tests/test-data/test-data.selector';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

@Component({
  selector: 'vehicle-check',
  templateUrl: 'vehicle-check.html',
})
export class VehicleCheckComponent implements OnInit {

  selectedShowMeQuestion: boolean = false;

  tellMeQuestionFault: string;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {

    const vehicleChecks$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
    );

    vehicleChecks$.subscribe((vehicleChecks: VehicleChecks) => {
      this.tellMeQuestionFault = vehicleChecks.tellMeQuestion.outcome;
    });

  }

  ngOnDestroy(): void {
  }

  onTap = () => {
    console.log('competency tapped');
  }

  onPress = () => {
    console.log('competency pressed');
  }

  canButtonRipple = () => {
    return true;
  }

  hasDrivingFault = (): number => {
    const hasDrivingFault = this.tellMeQuestionFault === CompetencyOutcome.DF;
    return hasDrivingFault ? 1 : 0;
  }

  hasSeriousFault = (): boolean => {
    return false;
  }

  hasDangerousFault = (): boolean => {
    return false;
  }
}
