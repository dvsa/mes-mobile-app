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
import { ToggleEmergencyStopSpeedReq }
  from '../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import { ToggleAvoidanceSpeedReq }
  from '../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';

@Component({
  selector: 'speed-check',
  templateUrl: 'speed-check.html',
})
export class SpeedCheckComponent {

  firstAttempt: number;

  secondAttempt: number;

  outcome: SingleFaultCompetencyOutcome;

  speedNotMetSeriousFault: boolean;

  @Input()
  competency: Competencies;

  constructor(
    private store$: Store<StoreModel>,
  ) { }

  ngOnInit(): void {
    const obvs$ = this.store$.pipe(
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

    obvs$.subscribe();
  }

  ngOnDestroy(): void { }

  toggleNotMet = (): void => {
    if (this.competency === Competencies.speedCheckEmergency) {
      this.store$.dispatch(new ToggleEmergencyStopSpeedReq());
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      this.store$.dispatch(new ToggleAvoidanceSpeedReq());
    }
  }

  getLabel = (): string => speedCheckLabels[this.competency];

  onTap = () => {
    console.log('going to add a fault');
  }

  onPress = () => {
    if (this.competency === Competencies.speedCheckEmergency) {
      console.log('record fault on Emergency Stop');
    }

    if (this.competency === Competencies.speedCheckAvoidance) {
      console.log('record fault on Avoidance');
    }
  }

  canButtonRipple = (): boolean => {
    return true;
  }

  faultCount = (): number => {
    return this.outcome === 'DF' ? 1 : 0;
  }

  hasSeriousFault = (): boolean => {
    return this.outcome === 'S';
  }

  hasDangerousFault = (): boolean => {
    return this.outcome === 'D';
  }
}
