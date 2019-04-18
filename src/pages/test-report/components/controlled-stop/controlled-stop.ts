import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators';

import { StoreModel } from '../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../../../modules/tests/tests.reducer';
import { getCurrentTest } from '../../../../modules/tests/tests.selector';
import { getTestData } from '../../../../modules/tests/test_data/test-data.reducer';
import {
  hasControlledStopBeenCompleted,
 // getDrivingFaultCount,
  // hasSeriousFault,
  // hasDangerousFault,
} from '../../../../modules/tests/test_data/test-data.selector';
import {
  ToggleControlledStop,
  // AddDrivingFault,
  // AddSeriousFault,
  // AddDangerousFault,
  // RemoveDrivingFault,
  // RemoveSeriousFault,
  // RemoveDangerousFault,
  ControlledStopComplete,
  AddManoeuvreDrivingFault,
} from '../../../../modules/tests/test_data/test-data.actions';
import { getTestReportState } from '../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../test-report.selector';
import { ToggleRemoveFaultMode, ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../test-report.actions';
import { ManoeuvreCompetencies } from '../../../../modules/tests/test_data/test-data.constants';

interface ControlledStopComponentState {
  isRemoveFaultMode$: Observable<boolean>;
  isSeriousMode$: Observable<boolean>;
  isDangerousMode$: Observable<boolean>;

  selectedControlledStop$: Observable<boolean>;
  // drivingFaultCount$: Observable<number>;
  // hasSeriousFault$: Observable<boolean>;
  // hasDangerousFault$: Observable<boolean>;
}

@Component({
  selector: 'controlled-stop',
  templateUrl: 'controlled-stop.html',
})
export class ControlledStopComponent implements OnInit {

  competency: ManoeuvreCompetencies = ManoeuvreCompetencies.outcomeControlledStop;

  componentState: ControlledStopComponentState;
  subscription: Subscription;

  allowRipple: boolean = true;

  isRemoveFaultMode: boolean = false;

  faultCount: number;

  isSeriousMode: boolean = false;
  hasSeriousFault: boolean = false;

  isDangerousMode: boolean = false;
  hasDangerousFault: boolean = false;

  controlledStopCompleted: boolean = false;

  constructor(private store$: Store<StoreModel>) {}

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
      // TODO - This needs to use the get fault actions for Manoeuvres

      // drivingFaultCount$: currentTest$.pipe(
        // select(getTestData),
        // select(testData => getDrivingFaultCount(testData, this.competency))),
      // hasSeriousFault$: currentTest$.pipe(
        // select(getTestData),
        // select(testData => hasSeriousFault(testData, this.competency))),
      // hasDangerousFault$: currentTest$.pipe(
        // select(getTestData),
        // select(testData => hasDangerousFault(testData, this.competency)),
      // ),
    };

    const {
     // drivingFaultCount$,
      isRemoveFaultMode$,
      isSeriousMode$,
      // hasSeriousFault$,
      isDangerousMode$,
      // hasDangerousFault$,
      selectedControlledStop$,
    } = this.componentState;

    const merged$ = merge(
      // drivingFaultCount$.pipe(map(count => this.faultCount = count)),
      isRemoveFaultMode$.pipe(map(toggle => this.isRemoveFaultMode = toggle)),
      isSeriousMode$.pipe(map(toggle => this.isSeriousMode = toggle)),
      // hasSeriousFault$.pipe(map(toggle => this.hasSeriousFault = toggle)),
      isDangerousMode$.pipe(map(toggle => this.isDangerousMode = toggle)),
      // hasDangerousFault$.pipe(map(toggle => this.hasDangerousFault = toggle)),
      selectedControlledStop$.pipe(map(toggle => this.controlledStopCompleted = toggle)),
    );

    this.subscription = merged$.subscribe(() => this.canButtonRipple());

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
      this.allowRipple = !(this.hasDangerousFault || this.hasSeriousFault || this.faultCount > 0);
    }
  }

  toggleControlledStop = (): void => {
    if (this.hasDangerousFault || this.hasSeriousFault || this.faultCount > 0) {
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
    if (this.hasDangerousFault || this.hasSeriousFault || this.faultCount > 0) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new ControlledStopComplete());
      // TODO - Refactor to use Add Manoeuvres Dangerous Faults
      // this.store$.dispatch(new AddDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new ControlledStopComplete());
      // TODO - Refactor to use Add Manoeuvres Serious Fault
      // this.store$.dispatch(new AddSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new ControlledStopComplete());
      this.store$.dispatch(new AddManoeuvreDrivingFault(ManoeuvreCompetencies.outcomeControlledStop));
    }
  }

  removeFault = (): void => {

    if (this.hasDangerousFault && this.isDangerousMode && this.isRemoveFaultMode) {
      // TODO - Refactor to use Remove Maneourves Fault Action
      // this.store$.dispatch(new RemoveDangerousFault(this.competency));
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault && this.isSeriousMode && this.isRemoveFaultMode) {
      // TODO - Refactor to use Remove Maneourves Fault Action
      // this.store$.dispatch(new RemoveSeriousFault(this.competency));
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount > 0) {
      // TODO - Refactor to use Remove Maneourves Fault Action
      // this.store$.dispatch(new RemoveDrivingFault({
        // competency: this.competency,
        // newFaultCount: this.faultCount ? this.faultCount - 1 : 0,
      // }));
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }

  }
}
