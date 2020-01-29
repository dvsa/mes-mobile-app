import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { isDangerousMode, isRemoveFaultMode, isSeriousMode } from '../../../test-report.selector';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getTestData } from '../../../../../modules/tests/test-data/cat-b';
import { getTestReportState } from '../../../test-report.reducer';
import { get } from 'lodash';
import { ToggleDangerousFaultMode, ToggleRemoveFaultMode, ToggleSeriousFaultMode } from '../../../test-report.actions';
import {
  ToggleUncoupleRecouple,
  UncoupleRecoupleAddDangerousFault,
  UncoupleRecoupleAddDrivingFault,
  UncoupleRecoupleAddSeriousFault,
  UncoupleRecoupleRemoveFault,
} from '../../../../../modules/tests/test-data/common/uncouple-recouple/uncouple-recouple.actions';

interface UncoupleRecoupleComponentState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  selectedUncoupleRecouple$: Observable<boolean>;
  uncoupleRecoupleOutcome$: Observable<CompetencyOutcome>;
}

@Component({
  selector: 'uncouple-recouple',
  templateUrl: 'uncouple-recouple.html',
})

export class UncoupleRecoupleComponent implements OnInit, OnDestroy {
  componentState: UncoupleRecoupleComponentState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;

  selectedUncoupleRecouple: boolean = false;
  uncoupleRecoupleOutcome: CompetencyOutcome;
  merged$: Observable<boolean | CompetencyOutcome>;

  constructor(private store$: Store<StoreModel>) {
  }

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
      selectedUncoupleRecouple$: currentTest$.pipe(
        select(getTestData),
        select(testData => get(testData, 'uncoupleRecouple.selected')),
      ),
      uncoupleRecoupleOutcome$: currentTest$.pipe(
        select(getTestData),
        select(testData => get(testData, 'uncoupleRecouple.fault')),
      ),
    };

    const {
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      selectedUncoupleRecouple$,
      uncoupleRecoupleOutcome$,
    } = this.componentState;

    this.subscription = merge(
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      selectedUncoupleRecouple$.pipe(map(value => this.selectedUncoupleRecouple = value)),
      uncoupleRecoupleOutcome$.pipe(map(outcome => this.uncoupleRecoupleOutcome = outcome)),
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

  toggleUncoupleRecouple = (): void => {
    if (this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0) {
      return;
    }
    this.store$.dispatch(new ToggleUncoupleRecouple());
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
      this.store$.dispatch(new UncoupleRecoupleAddDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new UncoupleRecoupleAddSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new UncoupleRecoupleAddDrivingFault());
    }
  }

  removeFault = (): void => {

    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new UncoupleRecoupleRemoveFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new UncoupleRecoupleRemoveFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount() > 0) {
      this.store$.dispatch(new UncoupleRecoupleRemoveFault());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  faultCount = (): number => this.uncoupleRecoupleOutcome === CompetencyOutcome.DF ? 1 : 0;

  hasSeriousFault = (): boolean => this.uncoupleRecoupleOutcome === CompetencyOutcome.S;

  hasDangerousFault = (): boolean => this.uncoupleRecoupleOutcome === CompetencyOutcome.D;

}
