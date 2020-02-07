import { DrivingFaultsBadgeComponent }
  from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { SeriousFaultBadgeComponent }
  from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DangerousFaultBadgeComponent }
  from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SpeedCheckComponent } from '../speed-check';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { Store, StoreModule } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
import { MockComponent } from 'ng-mocks';
import { IonicModule } from 'ionic-angular';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../../test-report.reducer';
import { Competencies } from '../../../../../../modules/tests/test-data/test-data.constants';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import {
  ToggleEmergencyStopSpeedReq,
  RemoveEmergencyStopFault,
  AddEmergencyStopDangerousFault,
  AddEmergencyStopSeriousFault,
  AddEmergencyStopRidingFault,
  RecordEmergencyStopFirstAttempt,
  RecordEmergencyStopSecondAttempt,
} from '../../../../../../modules/tests/test-data/cat-a-mod1/emergency-stop/emergency-stop.actions';
import {
  ToggleAvoidanceSpeedReq,
  RemoveAvoidanceFault,
  AddAvoidanceDangerousFault,
  AddAvoidanceSeriousFault,
  AddAvoidanceRidingFault,
  RecordAvoidanceFirstAttempt,
  RecordAvoidanceSecondAttempt,
} from '../../../../../../modules/tests/test-data/cat-a-mod1/avoidance/avoidance.actions';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import {
  ToggleDangerousFaultMode,
  ToggleRemoveFaultMode,
  ToggleSeriousFaultMode,
} from '../../../../test-report.actions';

describe('SpeedCheckComponent', () => {

  let fixture: ComponentFixture<SpeedCheckComponent>;
  let component: SpeedCheckComponent;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        SpeedCheckComponent,
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
        MockComponent(CompetencyButtonComponent),
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport: testReportReducer }),
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SpeedCheckComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
    store$.dispatch(new StartTest(105, TestCategory.EUAM1));
  }));

  describe('Class', () => {
    describe('toggleNotMet function dispatching right actions', () => {
      it('should dispatch ToggleEmergencyStopSpeedReq when Emergency Stop is the speed check', () => {
        component.competency = Competencies.speedCheckEmergency;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.toggleNotMet();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleEmergencyStopSpeedReq());
      });

      it('should dispatch ToggleAvoidanceSpeedReq when Avoidance is the speed check', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.toggleNotMet();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleAvoidanceSpeedReq());
      });
    });

    describe('getLabel returning correct labels', () => {
      it('should return Emergency stop when competency is EmergencyStop', () => {
        component.competency = Competencies.speedCheckEmergency;

        const result = component.getLabel();

        expect(result).toEqual('Emergency stop');
      });

      it('should return Avoidance Ex. Control Stop when competency is Avoidance', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const result = component.getLabel();

        expect(result).toEqual('Avoidance Ex. Control Stop');
      });
    });

    describe('getFirstAttempt returning correct speed attempt', () => {
      it('should return null when no firstAttempt is set', () => {
        const result = component.getFirstAttempt();

        expect(result).toBeNull();
      });

      it('should return the speed attempt that has been set', () => {
        const attemptedSpeed = 49;
        component.firstAttempt = attemptedSpeed;

        const result = component.getFirstAttempt();

        expect(result).toBe(attemptedSpeed);
      });
    });

    describe('getSecondAttempt returning correct speed attempt', () => {
      it('should return null when no secondAttempt is set', () => {
        const result = component.getSecondAttempt();

        expect(result).toBeNull();
      });

      it('should return the speed attempt that has been set', () => {
        const attemptedSpeed = 49;
        component.secondAttempt = attemptedSpeed;

        const result = component.getSecondAttempt();

        expect(result).toBe(attemptedSpeed);
      });
    });

    describe('onTap branches out to the correct functions', () => {
      it('should call addOrRemoveEmergencyStopFault if competency is Emergency Stop', () => {
        component.competency = Competencies.speedCheckEmergency;

        const addOrRemoveEmergencyStopFaultSpy = spyOn(component, 'addOrRemoveEmergencyStopFault');

        component.onTap();

        expect(addOrRemoveEmergencyStopFaultSpy).toHaveBeenCalled();
      });

      it('should call addOrRemoveAvoidanceFault if competency is Avoidance', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const addOrRemoveAvoidanceFaultSpy = spyOn(component, 'addOrRemoveAvoidanceFault');

        component.onTap();

        expect(addOrRemoveAvoidanceFaultSpy).toHaveBeenCalled();
      });
    });

    describe('onPress branches out to the correct functions', () => {
      it('should call addOrRemoveEmergencyStopFault if competency is Emergency Stop', () => {
        component.competency = Competencies.speedCheckEmergency;

        const addOrRemoveEmergencyStopFaultSpy = spyOn(component, 'addOrRemoveEmergencyStopFault');

        component.onPress();

        const wasPress = true;
        expect(addOrRemoveEmergencyStopFaultSpy).toHaveBeenCalledWith(wasPress);
      });

      it('should call addOrRemoveAvoidanceFault if competency is Avoidance', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const addOrRemoveAvoidanceFaultSpy = spyOn(component, 'addOrRemoveAvoidanceFault');

        component.onPress();

        const wasPress = true;
        expect(addOrRemoveAvoidanceFaultSpy).toHaveBeenCalledWith(wasPress);
      });
    });

    describe('addOrRemoveEmergencyStopFault branches correctly to add or remove', () => {
      it('should call addEmergencyStopFault when remove mode is turned off', () => {
        component.isRemoveFaultMode = false;

        const addEmergencyStopFaultSpy = spyOn(component, 'addEmergencyStopFault');

        component.addOrRemoveEmergencyStopFault();

        expect(addEmergencyStopFaultSpy).toHaveBeenCalledWith(false);
      });

      it('should call removeEmergencyStopFault when remove mode is turned on', () => {
        component.isRemoveFaultMode = true;

        const removeEmergencyStopFaultSpy = spyOn(component, 'removeEmergencyStopFault');

        component.addOrRemoveEmergencyStopFault();

        expect(removeEmergencyStopFaultSpy).toHaveBeenCalledWith();
      });
    });

    describe('addOrRemoveAvoidanceFault branches correctly to add or remove', () => {
      it('should call addAvoidanceFault when remove mode is turned off', () => {
        component.isRemoveFaultMode = false;

        const addAvoidanceFaultSpy = spyOn(component, 'addAvoidanceFault');

        component.addOrRemoveAvoidanceFault();

        expect(addAvoidanceFaultSpy).toHaveBeenCalledWith(false);
      });

      it('should call removeAvoidanceFault when remove mode is turned on', () => {
        component.isRemoveFaultMode = true;

        const removeAvoidanceFaultSpy = spyOn(component, 'removeAvoidanceFault');

        component.addOrRemoveAvoidanceFault();

        expect(removeAvoidanceFaultSpy).toHaveBeenCalledWith();
      });
    });

    describe('removeEmergencyStopFault dispataches the correct actions', () => {
      it('should dispatch a combination of actions that remove dangerous fault', () => {
        component.outcome = CompetencyOutcome.D;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeEmergencyStopFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveEmergencyStopFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });

      it('should dispatch a combination of actions that remove serious fault', () => {
        component.outcome = CompetencyOutcome.S;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeEmergencyStopFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveEmergencyStopFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });

      it('should dispatch a combination of actions that remove riding fault', () => {
        component.outcome = CompetencyOutcome.DF;
        component.isDangerousMode = false;
        component.isSeriousMode = false;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeEmergencyStopFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveEmergencyStopFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });
    });

    describe('removeAvoidanceFault dispataches the correct actions', () => {
      it('should dispatch a combination of actions that remove dangerous fault', () => {
        component.outcome = CompetencyOutcome.D;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeAvoidanceFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveAvoidanceFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });

      it('should dispatch a combination of actions that remove serious fault', () => {
        component.outcome = CompetencyOutcome.S;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeAvoidanceFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(3);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveAvoidanceFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });

      it('should dispatch a combination of actions that remove riding fault', () => {
        component.outcome = CompetencyOutcome.DF;
        component.isDangerousMode = false;
        component.isSeriousMode = false;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        component.removeAvoidanceFault();

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveAvoidanceFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
      });
    });

    describe('addEmergencyStopFault dispatches the correct actions', () => {
      it('should dipsatch no action if competency has dangerous fault', () => {
        component.outcome = CompetencyOutcome.D;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dipsatch no action if competency has serious fault', () => {
        component.outcome = CompetencyOutcome.S;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dipsatch no action if competency has riding fault', () => {
        component.outcome = CompetencyOutcome.DF;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dispatch a set of actions adding dangerous fault', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddEmergencyStopDangerousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch a set of actions adding serious fault', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddEmergencyStopSeriousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should dispatch a set of actions adding riding fault if it was press', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = true;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddEmergencyStopRidingFault());
      });

      it('should dispatch no actions when it was not a press and no serious or dangerous mode', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addEmergencyStopFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith();
      });
    });

    describe('addAvoidanceFault dispatches the correct actions', () => {
      it('should dipsatch no action if competency has dangerous fault', () => {
        component.outcome = CompetencyOutcome.D;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dipsatch no action if competency has serious fault', () => {
        component.outcome = CompetencyOutcome.S;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dipsatch no action if competency has riding fault', () => {
        component.outcome = CompetencyOutcome.DF;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalled();
      });

      it('should dispatch a set of actions adding dangerous fault', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddAvoidanceDangerousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch a set of actions adding serious fault', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledTimes(2);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddAvoidanceSeriousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should dispatch a set of actions adding riding fault if it was press', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = true;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddAvoidanceRidingFault());
      });

      it('should dispatch no actions when it was not a press and no serious or dangerous mode', () => {
        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const wasPress = false;
        component.addAvoidanceFault(wasPress);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith();
      });
    });

    describe('canButtonRipple returns the right boolean value', () => {
      it('should return true when in remove dangerous mode and has dangerous fault', () => {
        component.isRemoveFaultMode = true;
        component.isDangerousMode = true;
        component.outcome = CompetencyOutcome.D;

        const result = component.canButtonRipple();

        expect(result).toBe(true);
      });

      it('should return true when in remove serious mode and has serious fault', () => {
        component.isRemoveFaultMode = true;
        component.isSeriousMode = true;
        component.outcome = CompetencyOutcome.S;

        const result = component.canButtonRipple();

        expect(result).toBe(true);
      });

      it('should return true when in simple remove mode and has riding fault', () => {
        component.isRemoveFaultMode = true;
        component.outcome = CompetencyOutcome.DF;

        const result = component.canButtonRipple();

        expect(result).toBe(true);
      });

      it('should return false when remove mode is on but no faults to remove', () => {
        component.isRemoveFaultMode = true;

        const result = component.canButtonRipple();

        expect(result).toBe(false);
      });

      it('should return true if it has no faults yet', () => {
        component.outcome = undefined;

        const result = component.canButtonRipple();

        expect(result).toBe(true);
      });

      it('should return false when not in remove mode and has dangerous fault', () => {
        component.isRemoveFaultMode = false;
        component.outcome = CompetencyOutcome.D;

        const result = component.canButtonRipple();

        expect(result).toBe(false);
      });

      it('should return false when not in remove mode and has serious fault', () => {
        component.isRemoveFaultMode = false;
        component.outcome = CompetencyOutcome.S;

        const result = component.canButtonRipple();

        expect(result).toBe(false);
      });

      it('should return false when not in remove mode and has riding fault', () => {
        component.isRemoveFaultMode = false;
        component.outcome = CompetencyOutcome.DF;

        const result = component.canButtonRipple();

        expect(result).toBe(false);
      });
    });

    describe('faultCount', () => {
      it('should return 0 when the outcome is not riding fault', () => {
        component.outcome = undefined;

        const result = component.faultCount();

        expect(result).toBe(0);
      });

      it('should return 1 when the outcome is a riding fault', () => {
        component.outcome = CompetencyOutcome.DF;

        const result = component.faultCount();

        expect(result).toBe(1);
      });
    });

    describe('hasSeriousFault', () => {
      it('should return false when the outcome is not serious fault', () => {
        component.outcome = undefined;

        const result = component.hasSeriousFault();

        expect(result).toBe(false);
      });

      it('should return true when the outcome is a serious fault', () => {
        component.outcome = CompetencyOutcome.S;

        const result = component.hasSeriousFault();

        expect(result).toBe(true);
      });
    });

    describe('hasDangerousFault', () => {
      it('should return false when the outcome is not dangerous fault', () => {
        component.outcome = undefined;

        const result = component.hasDangerousFault();

        expect(result).toBe(false);
      });

      it('should return true when the outcome is a dangerous fault', () => {
        component.outcome = CompetencyOutcome.D;

        const result = component.hasDangerousFault();

        expect(result).toBe(true);
      });
    });

    describe('onFirstAttemptChange dispatches the correct actions', () => {
      it('should record emergency stop first attempt', () => {
        component.competency = Competencies.speedCheckEmergency;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const attemptedSpeed = 48;
        component.onFirstAttemptChange(attemptedSpeed);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopFirstAttempt(attemptedSpeed));
      });

      it('should record avoidance first attempt', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const attemptedSpeed = 48;
        component.onFirstAttemptChange(attemptedSpeed);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceFirstAttempt(attemptedSpeed));
      });
    });

    describe('onSecondAttemptChange', () => {
      it('should record emergency stop second attempt', () => {
        component.competency = Competencies.speedCheckEmergency;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const attemptedSpeed = 48;
        component.onSecondAttemptChange(attemptedSpeed);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordEmergencyStopSecondAttempt(attemptedSpeed));
      });

      it('should record avoidance second attempt', () => {
        component.competency = Competencies.speedCheckAvoidance;

        const storeDispatchSpy = spyOn(store$, 'dispatch');

        const attemptedSpeed = 48;
        component.onSecondAttemptChange(attemptedSpeed);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RecordAvoidanceSecondAttempt(attemptedSpeed));
      });
    });
  });

});
