import { ComponentFixture, async, TestBed } from '@angular/core/testing';
// import { PcvDoorExerciseComponent } from '../pcv-door-exercise';

import { AppModule } from '../../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { Competencies } from '../../../../../../modules/tests/test-data/test-data.constants';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../../shared/models/store.model';
import {
  AddDrivingFault,
  RemoveDrivingFault,
  ThrottleAddDrivingFault,
} from '../../../../../../modules/tests/test-data/common/driving-faults/driving-faults.actions';
import {
  AddSeriousFault,
  RemoveSeriousFault,
} from '../../../../../../modules/tests/test-data/common/serious-faults/serious-faults.actions';
import {
  AddDangerousFault,
  RemoveDangerousFault,
} from '../../../../../../modules/tests/test-data/common/dangerous-faults/dangerous-faults.actions';
import { MockComponent } from 'ng-mocks';
import { CompetencyButtonComponent } from '../../../../components/competency-button/competency-button';
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
import { CompetencyComponent } from '../../../../components/competency/competency';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyComponent,
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
    fixture = TestBed.createComponent(CompetencyComponent);
    component = fixture.componentInstance;
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    describe('getLabel', () => {
      it('should get the correct label for a competency', () => {
        component.competency = Competencies.controlsSteering;
        expect(component.getLabel()).toBe('Steering');
      });
    });

    describe('addDrivingFault', () => {
      it('should dispatch a THROTTLE_ADD_DRIVING_FAULT action for press', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new ThrottleAddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action for tap', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasSeriousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasDangerousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
    });

    describe('addDangerousFault', () => {
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press and hold', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });

    describe('addSeriousFault', () => {
      it('should dispatch an ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.clearance;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
    });

    describe('removeDrivingFault', () => {
      it('should dispatch a REMOVE_DRIVING_FAULT', () => {
        component.competency = Competencies.controlsSteering;
        component.faultCount = 1;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 0,
        }));
      });
      it('should not dispatch a REMOVE_DRIVING_FAULT when limit is zero', () => {
        component.competency = Competencies.controlsSteering;
        component.faultCount = 0;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 0,
        }));
      });
      it('should NOT remove driving fault when serious mode is active', () => {
        component.competency = Competencies.controlsSteering;
        component.faultCount = 1;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should NOT remove driving fault when dangerous mode is active', () => {
        component.competency = Competencies.controlsSteering;
        component.faultCount = 1;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
    });

    describe('removeSeriousFault', () => {
      it('should not dispatch a REMOVE_SERIOUS_FAULT when not in remove mode', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = false;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press and hold', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should not dispatch a REMOVE_SERIOUS_FAULT when is dangerous mode', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });

      it('should not remove serious mode after removal attempt on competency with no serious fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = false;
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
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = false;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press and hold', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should not dispatch a REMOVE_DANGEROUS_FAULT when is serious mode', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should not remove dangerous mode after removal attempt on competency with no dangerous fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = false;
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
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
    });
  });

  describe('canButtonRipple', () => {
    it('should allow ripple when in remove dangerous mode and there is a dangerous fault', () => {
      component.isRemoveFaultMode = true;
      component.isDangerousMode = true;
      component.hasDangerousFault = true;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove dangerous mode and there is not a dangerous fault', () => {
      component.isRemoveFaultMode = true;
      component.isDangerousMode = true;
      component.hasDangerousFault = false;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in remove serious mode and there is a serious fault', () => {
      component.isRemoveFaultMode = true;
      component.isSeriousMode = true;
      component.hasSeriousFault = true;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove serious mode and there is not a serious fault', () => {
      component.isRemoveFaultMode = true;
      component.isSeriousMode = true;
      component.hasSeriousFault = false;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in remove fault mode and there is a driving fault', () => {
      component.isRemoveFaultMode = true;
      component.faultCount = 1;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in remove fault mode and there is not a driving fault', () => {
      component.isRemoveFaultMode = true;
      component.faultCount = 0;

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
      component.hasDangerousFault = true;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in add dangerous mode and there is not a dangerous fault', () => {
      component.isRemoveFaultMode = false;
      component.isDangerousMode = true;
      component.hasDangerousFault = false;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should not allow ripple when in add serious mode and there is a serious fault', () => {
      component.isRemoveFaultMode = false;
      component.isSeriousMode = true;
      component.hasSeriousFault = true;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(false);
    });

    it('should allow ripple when in add serious mode and there is not a serious fault', () => {
      component.isRemoveFaultMode = false;
      component.isSeriousMode = true;
      component.hasSeriousFault = false;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should allow ripple when in add fault mode and there is a driving fault', () => {
      component.isRemoveFaultMode = false;
      component.faultCount = 1;

      component.canButtonRipple();
      expect(component.allowRipple).toEqual(true);
    });

    it('should allow ripple when in add fault mode and there is not a driving fault', () => {
      component.isRemoveFaultMode = false;
      component.faultCount = 0;

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
    it('should show provided label', () => {
      component.competency = Competencies.controlsGears;
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('.competency-label'));
      expect(label.nativeElement.innerHTML).toBe('Gears');
    });

    it('should pass the number of driving faults to the driving faults badge component', () => {
      fixture.detectChanges();
      const drivingFaultsBadge = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as DrivingFaultsBadgeComponent;
      component.faultCount = 5;

      fixture.detectChanges();
      expect(drivingFaultsBadge.count).toBe(5);
    });
  });
  //
  // describe('addSingleFault', () => {
  //   it('should not dispatch an ADD_SERIOUS_FAULT action if a dangerous fault exists on competency', () => {
  //     component.competency = Competencies.useOfStand;
  //     component.oneFaultLimit = true;
  //     component.hasDangerousFault = true;
  //     component.isSeriousMode = true;
  //
  //     const storeDispatchSpy = spyOn(store$, 'dispatch');
  //     component.addOrRemoveFault(true);
  //
  //     expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
  //   });
  //
  //   it('should not dispatch an ADD_DANGEROUS_FAULT action if a serious fault exists on competency', () => {
  //     component.competency = Competencies.useOfStand;
  //     component.oneFaultLimit = true;
  //     component.hasSeriousFault = true;
  //     component.isDangerousMode = true;
  //
  //     const storeDispatchSpy = spyOn(store$, 'dispatch');
  //     component.addOrRemoveFault(true);
  //
  //     expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
  //   });
  // });
  //
  // describe('competencyHasFault', () => {
  //   it('should return true if competency has a driving fault', () => {
  //     component.faultCount = 1;
  //
  //     expect(component.competencyHasFault()).toBe(true);
  //   });
  //   it('should return true if competency has a serious fault', () => {
  //     component.hasSeriousFault = true;
  //
  //     expect(component.competencyHasFault()).toBe(true);
  //   });
  //   it('should return true if competency has a dangerous fault', () => {
  //     component.hasDangerousFault = true;
  //
  //     expect(component.competencyHasFault()).toBe(true);
  //   });
  //   it('should return false if competency does not have a fault', () => {
  //     component.faultCount = undefined;
  //     component.hasDangerousFault = false;
  //     component.hasSeriousFault = false;
  //
  //     expect(component.competencyHasFault()).toBe(false);
  //   });
  // });
  //
  // describe('canAddSingleFault', () => {
  //   it('should return false if competency has an existing fault (faultCount >= 1)', () => {
  //     component.faultCount = 1;
  //     expect(component.canAddSingleDrivingFault()).toBe(false);
  //   });
  //   it('should return true if faultCount is undefined and competency was pressed', () => {
  //     component.faultCount = undefined;
  //     expect(component.canAddSingleDrivingFault(true)).toBe(true);
  //   });
  //   it('should return false if faultCount is undefined and competency was not pressed', () => {
  //     component.faultCount = undefined;
  //     expect(component.canAddSingleDrivingFault()).toBe(false);
  //   });
  // });
  //
  // describe('shouldDisableRippleForOneFaultLimit', () => {
  //   it('should return false if more than one fault permitted', () => {
  //     component.faultCount = 2;
  //     component.oneFaultLimit = false;
  //
  //     expect(component.shouldDisableRippleForOneFaultLimit()).toBe(false);
  //   });
  //   it('should return true if only one fault permitted', () => {
  //     component.faultCount = 1;
  //     component.oneFaultLimit = true;
  //
  //     expect(component.shouldDisableRippleForOneFaultLimit()).toBe(true);
  //   });
  // });
  //
  // describe('hasDrivingFault', () => {
  //   it('should return true if faultCount is not undefined', () => {
  //     component.faultCount = 1;
  //     expect(component.hasDrivingFault()).toBe(true);
  //   });
  //   it('should return false if faultCount is undefined', () => {
  //     component.faultCount = undefined;
  //     expect(component.hasDrivingFault()).toBe(false);
  //   });
  // });
});
