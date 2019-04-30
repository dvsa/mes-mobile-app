import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../../shared/models/store.model';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getVehicleChecks } from '../../../../modules/tests/test_data/test-data.selector';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Subscription } from 'rxjs/Subscription';
import { ShowMeQuestionSeriousFault } from '../../../../modules/tests/test_data/test-data.actions';
import { ToggleSeriousFaultMode } from '../../test-report.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isSeriousMode } from '../../test-report.selector';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';

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

    const merged$ = merge(
      vehicleChecks$.pipe(map((vehicleChecks: VehicleChecks) => {
        this.tellMeQuestionFault = vehicleChecks.tellMeQuestion.outcome;
        this.showMeQuestionFault = vehicleChecks.showMeQuestion.outcome;
      })),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
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
    if (this.isSeriousMode) {
      this.store$.dispatch(new ShowMeQuestionSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
    }

    if (wasPress) {
      // TODO: Implement this
    }
  }

  hasDrivingFault = (): number => {
    if (this.hasSeriousFault()) {
      return 0;
    }

    if (this.hasDangerousFault()) {
      return 0;
    }

    if (this.tellMeQuestionFault !== CompetencyOutcome.DF) {
      return 0;
    }

    // if show me question is not DF then return 0

    return 1;
  }

  hasSeriousFault = (): boolean => {
    if (this.hasDangerousFault()) {
      return false;
    }

    if (this.showMeQuestionFault !== CompetencyOutcome.S) {
      return false;
    }

    return true;
  }

  hasDangerousFault = (): boolean => {
    return false;
  }
}
