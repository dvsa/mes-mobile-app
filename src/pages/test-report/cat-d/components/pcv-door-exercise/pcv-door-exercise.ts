import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map, tap } from 'rxjs/operators';
import { StoreModel } from '../../../../../shared/models/store.model';
import {
  PcvDoorExerciseAddDangerousFault,
  PcvDoorExerciseAddDrivingFault, PcvDoorExerciseAddSeriousFault,
  PcvDoorExerciseRemoveSeriousFault, PcvDoorExerciseRemoveDangerousFault, PcvDoorExerciseRemoveDrivingFault,
} from '../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-d/test-data.cat-d.reducer';

import { getTests } from '../../../../../modules/tests/tests.reducer';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';

import { PcvDoorExerciseTypes } from '../../../../../providers/fault-summary/cat-d/fault-summary.cat-d';

import { getPcvDoorExercise }
from '../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.reducer';
import { get } from 'lodash';

interface CompetencyState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  pcvDoorExercise$: Observable<PcvDoorExerciseTypes>;
}

@Component({
  selector: 'pcv-door-exercise',
  templateUrl: 'pcv-door-exercise.html',
})
export class PcvDoorExerciseComponent {

  @Input()
  oneFaultLimit: boolean = false;
  competencyState: CompetencyState;
  subscription: Subscription;
  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;
  pcvDoorExercise: PcvDoorExerciseTypes;
  allowRipple: boolean = true;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {
    const currentTest$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
    );

    this.competencyState = {
      isRemoveFaultMode$: this.store$.pipe(
        select(getTestReportState),
        select(isRemoveFaultMode)),
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode)),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode)),
      pcvDoorExercise$: currentTest$.pipe(
        select(getTestData),
        select(getPcvDoorExercise),
      ),
    };

    const {
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      pcvDoorExercise$,
    } = this.competencyState;

    const merged$ = merge(
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      pcvDoorExercise$.pipe(map(toggle => this.pcvDoorExercise = toggle)),
    ).pipe(tap(this.canButtonRipple));

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

  canButtonRipple = (): void => {
    if (this.isRemoveFaultMode) {
      if (this.hasDangerousFault() && this.isDangerousMode) {
        this.allowRipple = true;
        return;
      }

      if (this.hasSeriousFault() && this.isSeriousMode) {
        this.allowRipple = true;
        return;
      }

      if (!this.isSeriousMode && !this.isDangerousMode && this.hasDrivingFault()) {
        this.allowRipple = true;
        return;
      }
      this.allowRipple = false;
    } else {

      if (this.hasDangerousFault()) {
        this.allowRipple = false;
        return;
      }

      if (this.isDangerousMode) {
        this.allowRipple = true;
        return;
      }

      if (this.hasSeriousFault()) {
        this.allowRipple = false;
        return;
      }

      if (this.isSeriousMode) {
        this.allowRipple = true;
        return;
      }
      this.allowRipple = true;
    }
  }

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault(wasPress);
    }
  }

  addFault = (wasPress: boolean): void => {

    if (this.hasDangerousFault()) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new PcvDoorExerciseAddDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.hasSeriousFault()) {
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new PcvDoorExerciseAddSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new PcvDoorExerciseAddDrivingFault());
      return;
    }
  }

  removeFault = (): void => {
    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new PcvDoorExerciseRemoveDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new PcvDoorExerciseRemoveSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());

      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.hasDrivingFault()) {
      this.store$.dispatch(new PcvDoorExerciseRemoveDrivingFault());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
  }

  competencyHasFault = (): boolean => {
    return this.hasDangerousFault() || this.hasSeriousFault() || this.hasDrivingFault();
  }

  hasDrivingFault = (): boolean => {
    return get(this.pcvDoorExercise, 'drivingFault', false);
  }

  hasSeriousFault = (): boolean => {
    return get(this.pcvDoorExercise, 'seriousFault', false);
  }

  hasDangerousFault = (): boolean => {
    return get(this.pcvDoorExercise, 'dangerousFault', false);
  }
}
