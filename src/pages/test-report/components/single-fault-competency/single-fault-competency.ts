
import { Observable } from 'rxjs/Observable';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';
import { Subscription } from 'rxjs/Subscription';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs/observable/merge';
import { map, tap } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { singleFaultCompetencyLables } from './single-fault-competency.constants';
import { ToggleDangerousFaultMode, ToggleRemoveFaultMode, ToggleSeriousFaultMode } from '../../test-report.actions';
import {
  RemoveSingleFaultCompetencyOutcome,
  SetSingleFaultCompetencyOutcome,
} from '../../../../modules/tests/test-data/cat-a-mod1/single-fault-competencies/single-fault-competencies.actions';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

interface SingleFaultCompetencyState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  // hasdrivingFault$: Observable<boolean>;
  // hasSeriousFault$: Observable<boolean>;
  // hasDangerousFault$: Observable<boolean>;
}

@Component({
  selector: 'single-fault-competency',
  templateUrl: 'single-fault-competency.html',
})
export class SingleFaultCompetencyComponent implements OnInit, OnDestroy {
  @Input()
  competency: Competencies;

  singleFaultCompetencyState: SingleFaultCompetencyState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  hasDrivingFault: boolean = false;

  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  isDangerousMode: boolean = false;
  hasDangerousFault: boolean = false;

  allowRipple: boolean = true;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {
    console.log('get actual fault value from store');

    this.singleFaultCompetencyState = {
      isRemoveFaultMode$: this.store$.pipe(
        select(getTestReportState),
        select(isRemoveFaultMode)),
      isSeriousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isSeriousMode)),
      isDangerousMode$: this.store$.pipe(
        select(getTestReportState),
        select(isDangerousMode)),
    };

    const {
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
    } = this.singleFaultCompetencyState;

    const merged$ = merge(
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
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
    this.allowRipple = true;
  }

  getLabel = (): string => singleFaultCompetencyLables[this.competency];

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault(wasPress);
    }
  }

  removeFault = (): void => {
    if (this.hasDangerousFault && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveSingleFaultCompetencyOutcome(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveSingleFaultCompetencyOutcome(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.hasDrivingFault) {
      this.store$.dispatch(new RemoveSingleFaultCompetencyOutcome(this.competency));
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.competencyHasFault()) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new SetSingleFaultCompetencyOutcome(this.competency, CompetencyOutcome.D));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new SetSingleFaultCompetencyOutcome(this.competency, CompetencyOutcome.S));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new SetSingleFaultCompetencyOutcome(this.competency, CompetencyOutcome.DF));
    }
  }

  competencyHasFault = (): boolean => {
    return this.hasDangerousFault || this.hasSeriousFault || this.hasDrivingFault;
  }
}
