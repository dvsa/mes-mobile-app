import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import {
  AddDrivingFault,
  AddSeriousFault,
  AddDangerousFault,
  RemoveDrivingFault,
  RemoveSeriousFault,
  RemoveDangerousFault,
} from '../../../../modules/tests/test_data/test-data.actions';
import { Competencies } from '../../../../modules/tests/test_data/test-data.constants';
import { competencyLabels } from './competency.constants';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import {
  getDrivingFaultCount,
  hasSeriousFault,
  hasDangerousFault,
} from '../../../../modules/tests/test_data/test-data.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';

interface CompetencyState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  drivingFaultCount$: Observable<number>;
  hasSeriousFault$: Observable<boolean>;
  hasDangerousFault$: Observable<boolean>;
}

@Component({
  selector: 'competency',
  templateUrl: 'competency.html',
})
export class CompetencyComponent {

  @Input()
  competency: Competencies;

  touchStateDelay: number = 100;

  touchState: boolean = false;
  rippleState: boolean = false;

  pressTimeout: any;
  rippleTimeout: any;
  touchTimeout: any;

  rippleEffectAnimationDuration: number = 300;

  competencyState: CompetencyState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;

  faultCount: number;

  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  isDangerousMode: boolean = false;
  hasDangerousFault: boolean = false;

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
      drivingFaultCount$: currentTest$.pipe(
        select(getTestData),
        select(testData => getDrivingFaultCount(testData, this.competency))),
      hasSeriousFault$: currentTest$.pipe(
        select(getTestData),
        select(testData => hasSeriousFault(testData, this.competency))),
      hasDangerousFault$: currentTest$.pipe(
        select(getTestData),
        select(testData => hasDangerousFault(testData, this.competency)),
      ),
    };

    const {
      drivingFaultCount$,
      isRemoveFaultMode$,
      isSeriousMode$,
      hasSeriousFault$,
      isDangerousMode$,
      hasDangerousFault$,
    } = this.competencyState;

    const merged$ = merge(
      drivingFaultCount$.pipe(map(count => this.faultCount = count)),
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      hasSeriousFault$.pipe(map(toggle => this.hasSeriousFault = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      hasDangerousFault$.pipe(map(toggle => this.hasDangerousFault = toggle)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLabel = (): string => competencyLabels[this.competency];

  addOrRemoveFault = (): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault();
    }
  }

  addFault = (): void => {
    if (this.hasDangerousFault) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.hasSeriousFault) {
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    this.store$.dispatch(new AddDrivingFault({
      competency: this.competency,
      newFaultCount: this.faultCount ? this.faultCount + 1 : 1,
    }));
  }

  removeFault = (): void => {

    if (this.hasDangerousFault && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveDrivingFault({
        competency: this.competency,
        newFaultCount: this.faultCount ? this.faultCount - 1 : 0,
      }));
    }

    this.store$.dispatch(new ToggleRemoveFaultMode());
    //  S and D can remain on in some conditions.
    if (this.isSeriousMode) {
      this.store$.dispatch(new ToggleSeriousFaultMode());
    }
    if (this.isDangerousMode) {
      this.store$.dispatch(new ToggleDangerousFaultMode());
    }
  }

  /**
   * Manages the addition and removal of the ripple effect animation css class
   * @returns any
   */
  applyRippleEffect = (): any => {
    this.rippleState = true;
    this.rippleTimeout = setTimeout(() => this.removeRippleEffect(), this.rippleEffectAnimationDuration);
  }

  removeRippleEffect = (): any => {
    this.rippleState = false;
    clearTimeout(this.pressTimeout);
  }

  onPress(): void {
    this.applyRippleEffect();
    this.addOrRemoveFault();
  }

  onTouchStart():void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
  }

  onTouchEnd():void {
    // defer the removal of the touch state to allow the page to render
    this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
  }
}
