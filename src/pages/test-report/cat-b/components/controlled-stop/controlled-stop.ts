import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b';
import {
  hasControlledStopBeenCompleted,
} from '../../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import {
  ToggleControlledStop,
  ControlledStopAddDangerousFault,
  ControlledStopAddSeriousFault,
  ControlledStopAddDrivingFault,
  ControlledStopRemoveFault,
} from '../../../../../modules/tests/test-data/cat-b/controlled-stop/controlled-stop.actions';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { get } from 'lodash';

interface ControlledStopComponentState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  selectedControlledStop$: Observable<boolean>;
  controlledStopOutcome$: Observable<CompetencyOutcome>;
}

@Component({
  selector: 'controlled-stop',
  templateUrl: 'controlled-stop.html',
})
export class ControlledStopComponent implements OnInit, OnDestroy {

  componentState: ControlledStopComponentState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;

  selectedControlledStop: boolean = false;
  controlledStopOutcome: CompetencyOutcome;
  merged$: Observable<boolean | CompetencyOutcome>;

  constructor(private store$: Store<StoreModel>) { }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.componentState = {
      isRemoveFaultMode$: this.store$.pipe(
        select(getTestReportState),
        select(isRemoveFaultMode)),
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode)),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode)),
      selectedControlledStop$: currentTest$.pipe(
        select(getTestData),
        select(hasControlledStopBeenCompleted),
      ),
      controlledStopOutcome$: currentTest$.pipe(
        select(getTestData),
        select(testData => get(testData, 'controlledStop.fault')),
      ),
    };

    const {
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      selectedControlledStop$,
      controlledStopOutcome$,
    } = this.componentState;

    this.subscription = merge(
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      selectedControlledStop$.pipe(map(value => this.selectedControlledStop = value)),
      controlledStopOutcome$.pipe(map(outcome => this.controlledStopOutcome = outcome)),
    ).subscribe();

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

  canButtonRipple = (): boolean => {
    if (this.isRemoveFaultMode) {
      if (this.hasDangerousFault() && this.isDangerousMode) {
        return true;
      }

      if (this.hasSeriousFault() && this.isSeriousMode) {
        return true;
      }

      if (!this.isSeriousMode && !this.isDangerousMode && this.faultCount() > 0) {
        return true;
      }
      return false;
    }
    return !(this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0);
  }

  toggleControlledStop = (): void => {
    if (this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0) {
      return;
    }
    this.store$.dispatch(new ToggleControlledStop());
  }

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault(wasPress);
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new ControlledStopAddDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new ControlledStopAddSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new ControlledStopAddDrivingFault());
    }
  }

  removeFault = (): void => {

    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new ControlledStopRemoveFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new ControlledStopRemoveFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount() > 0) {
      this.store$.dispatch(new ControlledStopRemoveFault());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  faultCount = (): number => this.controlledStopOutcome === CompetencyOutcome.DF ? 1 : 0;

  hasSeriousFault = (): boolean => this.controlledStopOutcome === CompetencyOutcome.S;

  hasDangerousFault = (): boolean => this.controlledStopOutcome === CompetencyOutcome.D;
}
