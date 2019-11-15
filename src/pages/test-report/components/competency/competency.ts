import { Component, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map, tap } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import {
  ThrottleAddDrivingFault,
  RemoveDrivingFault,
} from '../../../../modules/tests/test-data/driving-faults/driving-faults.actions';
import {
  AddSeriousFault,
  RemoveSeriousFault,
} from '../../../../modules/tests/test-data/serious-faults/serious-faults.actions';
import {
  AddDangerousFault,
  RemoveDangerousFault,
} from '../../../../modules/tests/test-data/dangerous-faults/dangerous-faults.actions';
import { competencyLabels } from './competency.constants';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test-data/test-data.reducer';
import { getTests } from '../../../../modules/tests/tests.reducer';
import {
  hasSeriousFault,
  hasDangerousFault,
} from '../../../../modules/tests/test-data/test-data.selector';
import { getDrivingFaultCount } from '../../../../modules/tests/test-data/cat-b/test-data.cat-b.selector';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { Competencies } from '../../../../modules/tests/test-data/test-data.constants';

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

  competencyState: CompetencyState;
  subscription: Subscription;

  isRemoveFaultMode: boolean = false;
  faultCount: number;
  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;
  isDangerousMode: boolean = false;
  hasDangerousFault: boolean = false;

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
      if (this.hasDangerousFault && this.isDangerousMode) {
        this.allowRipple = true;
        return;
      }

      if (this.hasSeriousFault && this.isSeriousMode) {
        this.allowRipple = true;
        return;
      }

      if (!this.isSeriousMode && !this.isDangerousMode && this.faultCount > 0) {
        this.allowRipple = true;
        return;
      }
      this.allowRipple = false;
    } else {
      if (this.hasDangerousFault) {
        this.allowRipple = false;
        return;
      }

      if (this.isDangerousMode) {
        this.allowRipple = true;
        return;
      }

      if (this.hasSeriousFault) {
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

  getLabel = (): string => competencyLabels[this.competency];

  addOrRemoveFault = (wasPress: boolean = false): void => {
    if (this.isRemoveFaultMode) {
      this.removeFault();
    } else {
      this.addFault(wasPress);
    }
  }

  addFault = (wasPress: boolean): void => {
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

    if (wasPress) {
      const competency = this.competency;
      return this.store$.dispatch(new ThrottleAddDrivingFault({
        competency,
        newFaultCount: this.faultCount ? this.faultCount + 1 : 1,
      }));
    }
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
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount > 0) {
      this.store$.dispatch(new RemoveDrivingFault({
        competency: this.competency,
        newFaultCount: this.faultCount ? this.faultCount - 1 : 0,
      }));
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }

  }

}
