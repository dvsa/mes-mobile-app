import { Component, Input } from '@angular/core';
import { Competencies, SingleFaultCompetencyNames } from '../../../../../modules/tests/test-data/test-data.constants';
import {
  EmergencyStop,
  Avoidance,
  TestData,
  SpeedRequirementCompetencyOutcome,
} from '@dvsa/mes-test-schema/categories/AM1';
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
  AddEmergencyStopSeriousFault,
  RemoveEmergencyStopSeriousFault,
  RecordEmergencyStopFirstAttempt,
  RecordEmergencyStopSecondAttempt,
} from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import {
  RecordAvoidanceFirstAttempt,
  RecordAvoidanceSecondAttempt,
  RemoveAvoidanceSeriousFault,
  AddAvoidanceSeriousFault,
} from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { Subscription, merge } from 'rxjs';
import { competencyLabels } from '../../../../../shared/constants/competencies/competencies';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import {
  FieldValidators,
  getSpeedCheckValidator,
  substringReplacer,
  leadingZero,
  nonNumericValues,
} from '../../../../../shared/constants/field-validators/field-validators';

@Component({
  selector: 'speed-check',
  templateUrl: 'speed-check.html',
})
export class SpeedCheckComponent {

  subscription: Subscription;

  firstAttempt: number;
  secondAttempt: number;
  outcome: SpeedRequirementCompetencyOutcome;

  @Input()
  competency: Competencies;

  @Input()
  pairedCompetency?: SingleFaultCompetencyNames;

  readonly speedCheckValidator: FieldValidators = getSpeedCheckValidator();

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
        this.outcome = speedCheckData.outcome;
      }),
    );

    this.subscription = merge(
      speedCheckData$,
    ).subscribe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  toggleNotMet = (): void => {
    if (this.competency === Competencies.speedCheckEmergency) {
      if (this.outcome === CompetencyOutcome.S) {
        this.store$.dispatch(new RemoveEmergencyStopSeriousFault());
      } else {
        this.store$.dispatch(new AddEmergencyStopSeriousFault());
      }
    } else if (this.competency === Competencies.speedCheckAvoidance) {
      if (this.outcome === CompetencyOutcome.S) {
        this.store$.dispatch(new RemoveAvoidanceSeriousFault());
      } else {
        this.store$.dispatch(new AddAvoidanceSeriousFault());
      }
    }
  }

  getLabel = (): string => competencyLabels[this.competency];

  getFirstAttempt = (): number | null => {
    return this.firstAttempt || null;
  }

  getSecondAttempt = (): number | null => {
    return this.secondAttempt || null;
  }

  onFirstAttemptChange = (attemptedSpeed: any): void => {
    const firstAttempt: number = this.formatSpeedAttempt(attemptedSpeed);

    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new RecordEmergencyStopFirstAttempt(firstAttempt));
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new RecordAvoidanceFirstAttempt(firstAttempt));
    }
  }

  onSecondAttemptChange = (attemptedSpeed: any): void => {
    const secondAttempt: number = this.formatSpeedAttempt(attemptedSpeed);

    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new RecordEmergencyStopSecondAttempt(secondAttempt));
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new RecordAvoidanceSecondAttempt(secondAttempt));
    }
  }

  formatSpeedAttempt = (event: any): number | undefined => {
    if (!this.speedCheckValidator.pattern.test(event.target.value)) {
      event.target.value = substringReplacer(event.target.value, [leadingZero, nonNumericValues]);
    }
    return Number(event.target.value) || undefined;
  }

  getNotMet(): boolean {
    return this.outcome === CompetencyOutcome.S;
  }

  firstAttemptValid(): boolean {
    return this.firstAttempt !== null && this.firstAttempt >= 0;
  }
}
