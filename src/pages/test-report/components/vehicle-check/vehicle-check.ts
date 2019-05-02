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
  ShowMeQuestionPassed,
  ShowMeQuestionRemoveFault,
} from '../../../../modules/tests/test-data/test-data.actions';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../test-report.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode, isDangerousMode, isRemoveFaultMode } from '../../test-report.selector';
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

    const isRemoveFaultMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isRemoveFaultMode),
    );

    const merged$ = merge(
      vehicleChecks$.pipe(map((vehicleChecks: VehicleChecks) => {
        this.tellMeQuestionFault = vehicleChecks.tellMeQuestion.outcome;
        this.showMeQuestionFault = vehicleChecks.showMeQuestion.outcome;

        this.selectedShowMeQuestion = !isEmpty(vehicleChecks.showMeQuestion.outcome);
      })),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
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

  toggleShowMeQuestion = (): void => {
    if (this.hasShowMeDrivingFault() || this.hasSeriousFault() || this.hasDangerousFault()) {
      return;
    }

    if (this.showMeQuestionFault === CompetencyOutcome.P) {
      this.store$.dispatch(new ShowMeQuestionRemoveFault());
      return;
    }

    this.store$.dispatch(new ShowMeQuestionPassed());
  }

  canButtonRipple = () => {
    if (this.isRemoveFaultMode) {
      if (this.hasDangerousFault() && this.isDangerousMode) {
        return true;
      }

      if (this.hasSeriousFault() && this.isSeriousMode) {
        return true;
      }

      if (this.hasShowMeDrivingFault() && !this.isSeriousMode && !this.isDangerousMode) {
        return true;
      }

      return false;
    }

    return !(this.hasDangerousFault() || this.hasSeriousFault() || this.hasShowMeDrivingFault());
  }

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
      return;
    }

    this.addFault(wasPress);
  }

  removeFault = (): void => {
    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new ShowMeQuestionPassed());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new ShowMeQuestionPassed());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.hasShowMeDrivingFault()) {
      this.store$.dispatch(new ShowMeQuestionPassed());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.hasShowMeDrivingFault() || this.hasSeriousFault() || this.hasDangerousFault()) {
      return;
    }

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
