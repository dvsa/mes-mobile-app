import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { MockComponent } from 'ng-mocks';
import {
  DrivingFaultsBadgeComponent,
} from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent }
from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import {
  DangerousFaultBadgeComponent,
} from '../../../../../../components/common/dangerous-fault-badge/dangerous-fault-badge';
import { testReportReducer } from '../../../../test-report.reducer';
import { ToggleSeriousFaultMode,
  ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../../test-report.actions';
import { NavigationStateProvider } from '../../../../../../providers/navigation-state/navigation-state';
import { NavigationStateProviderMock }
  from '../../../../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { configureTestSuite } from 'ng-bullet';
import { PcvDoorExerciseComponent } from '../pcv-door-exercise';
import {
  PcvDoorExerciseAddDrivingFault,
  PcvDoorExerciseAddDangerousFault,
  PcvDoorExerciseAddSeriousFault,
  PcvDoorExerciseRemoveDrivingFault,
  PcvDoorExerciseRemoveDangerousFault,
  PcvDoorExerciseRemoveSeriousFault,
} from '../../../../../../modules/tests/test-data/cat-d/pcv-door-exercise/pcv-door-exercise.actions';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
describe('PcvDoorExerciseComponent', () => {
  let fixture: ComponentFixture<PcvDoorExerciseComponent>;
  let component: PcvDoorExerciseComponent;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        PcvDoorExerciseComponent,
        MockComponent(CompetencyButtonComponent),
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        AppModule,
        IonicModule,
        StoreModule.forRoot({
          journal: () => ({
            isLoading: false,
            lastRefreshed: null,
            slots: {},
            selectedDate: '',
            examiner: {
              staffNumber: '1234567',
            },
          }),
          tests: () => ({
            currentTest: {
              slotId: '123',
            },
            testStatus: {},
            startedTests: {
              123: {
                vehicleDetails: {},
                accompaniment: {},
                testData: {
                  dangerousFaults: {},
                  drivingFaults: {},
                  manoeuvres: {},
                  seriousFaults: {},
                  testRequirements: {},
                  ETA: {},
                  eco: {},
                  vehicleChecks: {
                    showMeQuestion: {
                      code: 'S3',
                      description: '',
                      outcome: '',
                    },
                    tellMeQuestion: {
                      code: '',
                      description: '',
                      outcome: '',
                    },
                  },
                  eyesightTest: {},
                },
                activityCode: '28',
                journalData: {
                  candidate: {
                    candidateName: 'Joe Bloggs',
                    driverNumber: '123',
                  },
                },
                rekey: false,
              },
            },
          }),
          testReport : testReportReducer,
        }),
      ],
      providers: [
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PcvDoorExerciseComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {

    describe('addDrivingFault', () => {
      it('should dispatch a THROTTLE_ADD_DRIVING_FAULT action for press', () => {
        component.pcvDoorExercise = { drivingFault: false };
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a serious fault', () => {
        component.pcvDoorExercise = { seriousFault: true };
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if serious mode is active', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a dangerous fault', () => {
        component.pcvDoorExercise =  { dangerousFault: true };

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if dangerous mode is active', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDrivingFault());
      });
    });

    describe('addDangerousFault', () => {
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });

    describe('addSeriousFault', () => {
      it('should dispatch an ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', () => {
        component.pcvDoorExercise = { seriousFault: true };
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
    });

    describe('removeDrivingFault', () => {
      it('should dispatch a REMOVE_DRIVING_FAULT', () => {
        component.pcvDoorExercise = { drivingFault: true };
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
      });
      it('should not dispatch a REMOVE_DRIVING_FAULT when no driving fault', () => {
        component.pcvDoorExercise = { dangerousFault: false };
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
      });
      it('should NOT remove driving fault when serious mode is active', () => {
        component.pcvDoorExercise = { drivingFault: true };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
      });
      it('should NOT remove driving fault when dangerous mode is active', () => {
        component.pcvDoorExercise = { drivingFault: true };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDrivingFault());
      });
    });

    describe('removeSeriousFault', () => {
      it('should not dispatch a REMOVE_SERIOUS_FAULT when not in remove mode', () => {
        component.pcvDoorExercise = { seriousFault: true };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = false;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press and hold', () => {
        component.pcvDoorExercise = { seriousFault: true };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press', () => {
        component.pcvDoorExercise = { seriousFault: true };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
      });
      it('should not dispatch a REMOVE_SERIOUS_FAULT when is dangerous mode', () => {
        component.pcvDoorExercise = { seriousFault: true };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveSeriousFault());
      });

      it('should not remove serious mode after removal attempt on competency with no serious fault', () => {
        component.pcvDoorExercise = { seriousFault: false };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        fixture.detectChanges();
      });

    });

    describe('removeDangerousFault', () => {
      it('should not dispatch a REMOVE_DANGEROUS_FAULT when not in remove mode', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = false;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press and hold', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
      });
      it('should not dispatch a REMOVE_DANGEROUS_FAULT when is serious mode', () => {
        component.pcvDoorExercise = { dangerousFault: true };
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new PcvDoorExerciseRemoveDangerousFault());
      });
      it('should not remove dangerous mode after removal attempt on competency with no dangerous fault', () => {
        component.pcvDoorExercise = { dangerousFault: false };
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        fixture.detectChanges();
      });
    });

    describe('buttonClick', () => {
      it('should dispatch ADD_DANGEROUS_FAULT action if dangerous mode is active', () => {
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddDangerousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new PcvDoorExerciseAddSeriousFault());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
    });
  });

  describe('canButtonRipple', () => {
    it('should allow ripple when in remove dangerous mode and there is a dangerous fault', () => {
      component.isRemoveFaultMode = true;
      component.isDangerousMode = true;
      component.pcvDoorExercise = { dangerousFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove dangerous mode and there is not a dangerous fault', () => {
      component.isRemoveFaultMode = true;
      component.isDangerousMode = true;
      component.pcvDoorExercise = { dangerousFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in remove serious mode and there is a serious fault', () => {
      component.isRemoveFaultMode = true;
      component.isSeriousMode = true;
      component.pcvDoorExercise = { seriousFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove serious mode and there is not a serious fault', () => {
      component.isRemoveFaultMode = true;
      component.isSeriousMode = true;
      component.pcvDoorExercise = { seriousFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in remove fault mode and there is a driving fault', () => {
      component.isRemoveFaultMode = true;
      component.pcvDoorExercise = { drivingFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove fault mode and there is not a driving fault', () => {
      component.isRemoveFaultMode = true;
      component.pcvDoorExercise = { drivingFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should not allow ripple when in remove fault mode and driving fault is undefined', () => {
      component.isRemoveFaultMode = true;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should not allow ripple when in add dangerous mode and there is a dangerous fault', () => {
      component.isRemoveFaultMode = false;
      component.isDangerousMode = true;
      component.pcvDoorExercise = { dangerousFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in add dangerous mode and there is not a dangerous fault', () => {
      component.isRemoveFaultMode = false;
      component.isDangerousMode = true;
      component.pcvDoorExercise = { dangerousFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in add serious mode and there is a serious fault', () => {
      component.isRemoveFaultMode = false;
      component.isSeriousMode = true;
      component.pcvDoorExercise = { seriousFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in add serious mode and there is not a serious fault', () => {
      component.isRemoveFaultMode = false;
      component.isSeriousMode = true;
      component.pcvDoorExercise = { seriousFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should allow ripple when in add fault mode and there is a driving fault', () => {
      component.isRemoveFaultMode = false;
      component.pcvDoorExercise = { drivingFault: true };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should allow ripple when in add fault mode and there is not a driving fault', () => {
      component.isRemoveFaultMode = false;
      component.pcvDoorExercise = { drivingFault: false };

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should allow ripple when in add fault mode and driving fault is undefined', () => {
      component.isRemoveFaultMode = false;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });
  });

  describe('DOM', () => {
    it('should show 1 driving fault when passing driving fault as true to the driving faults badge component', () => {
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;
      component.pcvDoorExercise = { drivingFault: true };

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(1);
    });
  });

});
