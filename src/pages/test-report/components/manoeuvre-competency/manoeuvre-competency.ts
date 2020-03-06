import { Observable, Subscription, merge } from 'rxjs';
import { StoreModel } from '../../../../shared/models/store.model';
import { ManoeuvreCompetencies, ManoeuvreTypes } from '../../../../modules/tests/test-data/test-data.constants';
import {
  AddManoeuvreDrivingFault,
  AddManoeuvreSeriousFault,
  AddManoeuvreDangerousFault,
  RemoveManoeuvreFault,
} from '../../../../modules/tests/test-data/common/manoeuvres/manoeuvres.actions';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/cat-b/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getManoeuvres } from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { manoeuvreCompetencyLabels } from '../../../../shared/constants/competencies/catb-manoeuvres';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ManoeuvreOutcome } from '@dvsa/mes-test-schema/categories/common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../test-report.actions';

interface ManoeuvreCompetencyComponentState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;
  manoeuvreCompetencyOutcome$: Observable<ManoeuvreOutcome | null>;
}

@Component({
  selector: 'manoeuvre-competency',
  templateUrl: 'manoeuvre-competency.html',
})
export class ManoeuvreCompetencyComponent implements OnInit, OnDestroy {

  @Input()
  competency: ManoeuvreCompetencies;
  @Input()
  manoeuvre: ManoeuvreTypes;

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
  manoeuvreCompetencyOutcome: ManoeuvreOutcome | null;

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
        select((manoeuvres: CatBUniqueTypes.Manoeuvres) => {
          const manoeuvre = manoeuvres[this.manoeuvre];
          if (typeof manoeuvre !== 'undefined') {
            return manoeuvre[this.competency];
          }
          return null;
        }),
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

    const payload = {
      competency: this.competency,
      manoeuvre: this.manoeuvre,
    };

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddManoeuvreDangerousFault(payload));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddManoeuvreSeriousFault(payload));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new AddManoeuvreDrivingFault(payload));
      return;
    }
  }

  removeFault = (): void => {
    // Toggle modes off appropariately if competency outcome doesn't exist, then exit
    if (this.manoeuvreCompetencyOutcome == null) {
      this.store$.dispatch(new ToggleRemoveFaultMode());
      if (this.isSeriousMode) this.store$.dispatch(new ToggleSeriousFaultMode());
      if (this.isDangerousMode) this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    const payload = {
      competency: this.competency,
      manoeuvre: this.manoeuvre,
    };

    if (this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveManoeuvreFault(payload));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveManoeuvreFault(payload));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (
      !this.isSeriousMode &&
      !this.isDangerousMode &&
      this.isRemoveFaultMode &&
      this.manoeuvreCompetencyOutcome === CompetencyOutcome.DF
    ) {
      this.store$.dispatch(new RemoveManoeuvreFault(payload));
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
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

  onTouchStart(): void {
    clearTimeout(this.touchTimeout);
    this.touchState = true;
  }

  onTouchEnd(): void {
    // defer the removal of the touch state to allow the page to render
    this.touchTimeout = setTimeout(() => this.touchState = false, this.touchStateDelay);
  }
}
