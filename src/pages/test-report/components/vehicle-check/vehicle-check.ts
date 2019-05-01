import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getVehicleChecks } from '../../../../modules/tests/test-data/test-data.selector';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Subscription } from 'rxjs/Subscription';
import {
  ShowMeQuestionSeriousFault,
  ShowMeQuestionDangerousFault,
  ShowMeQuestionDrivingFault,
} from '../../../../modules/tests/test_data/test-data.actions';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { isEmpty } from 'lodash';

@Component({
  selector: 'vehicle-check',
  templateUrl: 'vehicle-check.html',
})
export class VehicleCheckComponent implements OnInit {

  selectedShowMeQuestion: boolean = false;

  tellMeQuestionFault: string;
  showMeQuestionFault: string;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;

  subscription: Subscription;

  constructor(private store$: Store<StoreModel>) {}

  ngOnInit(): void {

    const vehicleChecks$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      select(getVehicleChecks),
    );

    const isSeriousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isSeriousMode),
    );

    const isDangerousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isDangerousMode),
    );

    const merged$ = merge(
      vehicleChecks$.pipe(map((vehicleChecks: VehicleChecks) => {
        this.tellMeQuestionFault = vehicleChecks.tellMeQuestion.outcome;
        this.showMeQuestionFault = vehicleChecks.showMeQuestion.outcome;

        this.selectedShowMeQuestion = !isEmpty(vehicleChecks.showMeQuestion.outcome);
      })),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onTap = () => {
    this.addOrRemoveFault();
  }

  onPress = () => {
    this.addOrRemoveFault(true);
  }

  canButtonRipple = () => {
    // TODO: Implement this
    return true;
  }

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
      return;
    }

    this.addFault(wasPress);
  }

  removeFault = (): void => {
    // TODO: Implement this
  }

  addFault = (wasPress: boolean): void => {
    if (this.isDangerousMode) {
      this.store$.dispatch(new ShowMeQuestionDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new ShowMeQuestionSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new ShowMeQuestionDrivingFault());
    }
  }

  getDrivingFaultCount = (): number => {
    if (this.hasDangerousFault() || this.hasSeriousFault()) {
      return 0;
    }

    if (this.hasShowMeDrivingFault() || this.hasTellMeDrivingFault()) {
      return 1;
    }

    return 0;
  }

  hasShowMeDrivingFault = (): boolean => {
    return this.showMeQuestionFault === CompetencyOutcome.DF;
  }

  hasTellMeDrivingFault = (): boolean => {
    return this.tellMeQuestionFault === CompetencyOutcome.DF;
  }

  hasSeriousFault = (): boolean => {
    return this.showMeQuestionFault === CompetencyOutcome.S;
  }

  hasDangerousFault = (): boolean => {
    return this.showMeQuestionFault === CompetencyOutcome.D;
  }
}
