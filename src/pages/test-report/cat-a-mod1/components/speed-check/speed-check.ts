import { Component, Input } from '@angular/core';
import { Competencies } from '../../../../../modules/tests/test-data/test-data.constants';
import { speedCheckLabels } from '../../../../../shared/constants/competencies/cata-mod1-competencies';
import { EmergencyStop, Avoidance, TestData, SingleFaultCompetencyOutcome } from '@dvsa/mes-test-schema/categories/AM1';
import { StoreModel } from '../../../../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getCurrentTest } from '../../../../../modules/tests/tests.selector';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { map } from 'rxjs/operators';
import { getEmergencyStop }
  from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.selector';
import { getTestData } from '../../../../../modules/tests/test-data/cat-a-mod1/test-data.cat-a-mod1.reducer';
import { getAvoidance } from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.selector';
import { isEmpty } from 'lodash';
import {
  ToggleEmergencyStopSpeedReq,
  RecordEmergencyStopFirstAttempt,
  RecordEmergencyStopSecondAttempt,
  AddEmergencyStopRidingFault,
  AddEmergencyStopSeriousFault,
  AddEmergencyStopDangerousFault,
  RemoveEmergencyStopFault,
} from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import {
  ToggleAvoidanceSpeedReq,
  RecordAvoidanceFirstAttempt,
  RecordAvoidanceSecondAttempt,
  AddAvoidanceDangerousFault,
  AddAvoidanceSeriousFault,
  AddAvoidanceRidingFault,
  RemoveAvoidanceFault,
} from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { Subscription } from 'rxjs/Subscription';
import { getTestReportState } from '../../../test-report.reducer';
import { isRemoveFaultMode, isSeriousMode, isDangerousMode } from '../../../test-report.selector';
import { merge } from 'rxjs/observable/merge';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';

@Component({
  selector: 'speed-check',
  templateUrl: 'speed-check.html',
})
export class SpeedCheckComponent {

  subscription: Subscription;

  firstAttempt: number;
  secondAttempt: number;
  outcome: SingleFaultCompetencyOutcome;
  speedNotMetSeriousFault: boolean;

  isRemoveFaultMode: boolean;
  isSeriousMode: boolean;
  isDangerousMode: boolean;

  @Input()
  competency: Competencies;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {
    const speedCheckData$ = this.store$.pipe(
      select(getTests),
      select(getCurrentTest),
      select(getTestData),
      map((testData: TestData): void => {
        let speedCheckData: EmergencyStop | Avoidance;
        if (this.competency === Competencies.speedCheckEmergency) {
          speedCheckData = getEmergencyStop(testData);
        }

        if (this.competency === Competencies.speedCheckAvoidance) {
          speedCheckData = getAvoidance(testData);
        }

        if (isEmpty(speedCheckData)) {
          return;
        }

        this.firstAttempt = speedCheckData.firstAttempt;
        this.secondAttempt = speedCheckData.secondAttempt;
        this.speedNotMetSeriousFault = speedCheckData.speedNotMetSeriousFault;
        this.outcome = speedCheckData.outcome;
      }),
    );

    const isRemoveFaultMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isRemoveFaultMode),
      map(isRemoveFaultMode => this.isRemoveFaultMode = isRemoveFaultMode));

    const isSeriousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isSeriousMode),
      map(isSeriousMode => this.isSeriousMode = isSeriousMode));

    const isDangerousMode$ = this.store$.pipe(
      select(getTestReportState),
      select(isDangerousMode),
      map(isDangerousMode => this.isDangerousMode = isDangerousMode));

    this.subscription = merge(
      speedCheckData$,
      isRemoveFaultMode$,
      isSeriousMode$,
      isDangerousMode$,
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleNotMet = (): void => {
    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new ToggleEmergencyStopSpeedReq());
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new ToggleAvoidanceSpeedReq());
    }
  }

  getLabel = (): string => speedCheckLabels[this.competency];

  getFirstAttempt = (): number | null => {
    return this.firstAttempt || null;
  }

  getSecondAttempt = (): number | null => {
    return this.secondAttempt || null;
  }

  onTap = () => {
    if (this.competency === Competencies.speedCheckEmergency) {
      this.addOrRemoveEmergencyStopFault();
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.addOrRemoveAvoidanceFault();
    }
  }

  onPress = () => {
    const wasPress = true;
    if (this.competency === Competencies.speedCheckEmergency) {
      this.addOrRemoveEmergencyStopFault(wasPress);
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.addOrRemoveAvoidanceFault(wasPress);
    }
  }

  addOrRemoveEmergencyStopFault = (wasPress: boolean = false) => {
    if (this.isRemoveFaultMode) {
      this.removeEmergencyStopFault();
    }
    this.addEmergencyStopFault(wasPress);
  }

  addOrRemoveAvoidanceFault = (wasPress: boolean = false) => {
    if (this.isRemoveFaultMode) {
      this.removeAvoidanceFault();
    }
    this.addAvoidanceFault(wasPress);
  }

  removeEmergencyStopFault = () => {
    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveEmergencyStopFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveEmergencyStopFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount() > 0) {
      this.store$.dispatch(new RemoveEmergencyStopFault());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  removeAvoidanceFault = () => {
    if (this.hasDangerousFault() && this.isDangerousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveAvoidanceFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }

    if (this.hasSeriousFault() && this.isSeriousMode && this.isRemoveFaultMode) {
      this.store$.dispatch(new RemoveAvoidanceFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      this.store$.dispatch(new ToggleRemoveFaultMode());
      return;
    }
    if (!this.isSeriousMode && !this.isDangerousMode && this.isRemoveFaultMode && this.faultCount() > 0) {
      this.store$.dispatch(new RemoveAvoidanceFault());
      this.store$.dispatch(new ToggleRemoveFaultMode());
    }
  }

  addEmergencyStopFault = (wasPress: boolean) => {
    if (this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddEmergencyStopDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddEmergencyStopSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new AddEmergencyStopRidingFault());
    }
  }

  addAvoidanceFault = (wasPress: boolean = false) => {
    if (this.hasDangerousFault() || this.hasSeriousFault() || this.faultCount() > 0) {
      return;
    }

    if (this.isDangerousMode) {
      this.store$.dispatch(new AddAvoidanceDangerousFault());
      this.store$.dispatch(new ToggleDangerousFaultMode());
      return;
    }

    if (this.isSeriousMode) {
      this.store$.dispatch(new AddAvoidanceSeriousFault());
      this.store$.dispatch(new ToggleSeriousFaultMode());
      return;
    }

    if (wasPress) {
      this.store$.dispatch(new AddAvoidanceRidingFault());
    }
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

  faultCount = (): number => {
    return this.outcome === CompetencyOutcome.DF ? 1 : 0;
  }

  hasSeriousFault = (): boolean => {
    return this.outcome === CompetencyOutcome.S;
  }

  hasDangerousFault = (): boolean => {
    return this.outcome === CompetencyOutcome.D;
  }

  onFirstAttemptChange = (attemptedSpeed: number): void => {
    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new RecordEmergencyStopFirstAttempt(attemptedSpeed));
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new RecordAvoidanceFirstAttempt(attemptedSpeed));
    }
  }

  onSecondAttemptChange = (attemptedSpeed: number): void => {
    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new RecordEmergencyStopSecondAttempt(attemptedSpeed));
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new RecordAvoidanceSecondAttempt(attemptedSpeed));
    }
  }

}
