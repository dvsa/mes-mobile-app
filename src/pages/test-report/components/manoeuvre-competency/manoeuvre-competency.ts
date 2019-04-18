import { Observable } from 'rxjs/Observable';
import { StoreModel } from '../../../../shared/models/store.model';
import { ManoeuvreCompetencies } from '../../../../modules/tests/test_data/test-data.constants';
import {
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
} from '../../../../modules/tests/test_data/test-data.actions';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getManoeuvres } from '../../../../modules/tests/test_data/test-data.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode  } from '../../test-report.selector';
import { manoeuvreCompetencyLabels } from './manoeuvre-competency.constants';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';
import { ManoeuvreOutcome } from '@dvsa/mes-test-schema/categories/B';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';

interface ManoeuvreCompetencyComponentState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvreCompetencyOutcome$: Observable<ManoeuvreOutcome>;
}

@Component({
  selector: 'manoeuvre-competency',
  templateUrl: 'manoeuvre-competency.html',
})
export class ManoeuvreCompetencyComponent {

  @Input()
  competency: ManoeuvreCompetencies;

  touchStateDelay: number = 100;

  touchState: boolean = false;
  rippleState: boolean = false;

  rippleTimeout: any;
  touchTimeout: any;

  rippleEffectAnimationDuration: number = 300;

  componentState: ManoeuvreCompetencyComponentState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  isSeriousMode: boolean = false;
  isDangerousMode: boolean = false;
  manoeuvreCompetencyOutcome: ManoeuvreOutcome;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

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
      manoeuvreCompetencyOutcome$: currentTest$.pipe(
        select(getTestData),
        select(getManoeuvres),
        select(manoeuvres => manoeuvres[this.competency]),
      ),
    };

    const {
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
      manoeuvreCompetencyOutcome$,
    } = this.componentState;

    const merged$ = merge(
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      manoeuvreCompetencyOutcome$.pipe(map(outcome => this.manoeuvreCompetencyOutcome = outcome)),
    );

    this.subscription = merged$.subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getLabel = (): string => manoeuvreCompetencyLabels[this.competency];

  // Not a very good practice to use a boolean variable like wasPress
  // Because at this point it takes effort to understand what does it represents
  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (wasPress) {
      this.applyRippleEffect();
    }
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault(wasPress);
    }
  }

  addFault = (wasPress: boolean): void => {
    if (this.hasDrivingFault() || this.hasSeriousFault() || this.hasDangerousFault()) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddManoeuvreDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddManoeuvreSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new AddManoeuvreDrivingFault(this.competency));
      return;
    }
  }

  removeFault = (): void => {
    console.log('remove a fault');
  }

  hasDrivingFault = (): number => this.manoeuvreCompetencyOutcome === CompetencyOutcome.DF ? 1 : 0;

  hasSeriousFault = (): boolean => this.manoeuvreCompetencyOutcome === CompetencyOutcome.S;

  hasDangerousFault = (): boolean => this.manoeuvreCompetencyOutcome === CompetencyOutcome.D;

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
    clearTimeout(this.rippleTimeout);
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
