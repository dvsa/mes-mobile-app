import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { Competencies } from '../../../../../modules/tests/test_data/test-data.constants';
import { StoreModule, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import {
  AddDrivingFault,
  AddSeriousFault,
  AddDangerousFault,
  RemoveDrivingFault,
  RemoveDangerousFault,
  RemoveSeriousFault,
  AddManoeuvreDrivingFault,
} from '../../../../../modules/tests/test_data/test-data.actions';
import { MockComponent } from 'ng-mocks';
import { DrivingFaultsBadgeComponent } from '../../../../../components/driving-faults-badge/driving-faults-badge';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';
import { StartTest } from '../../../../journal/journal.actions';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyComponent,
        MockComponent(DrivingFaultsBadgeComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        AppModule,
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
      providers: [
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
        store$ = TestBed.get(Store);

        store$.dispatch(new StartTest(103));
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('getLabel', () => {
      it('should get the correct label for a competency', () => {
        component.competency = Competencies.controlsSteering;
        expect(component.getLabel()).toBe('Steering');
      });
    });

    describe('addDrivingFault', () => {
      it('should dispatch an ADD_DRIVING_FAULT action for press', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDrivingFault({
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
      it('should dispatch a REMOVE_DRIVING_FAULT limit zero', () => {
        component.competency = Competencies.controlsSteering;
        component.faultCount = 0;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDrivingFault({
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

      it('should remove serious mode after removal attempt on competency with no serious fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = false;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        fixture.detectChanges();
        expect(component.isSeriousMode).toEqual(false);
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
      it('should remove dangerous mode after removal attempt on competency with no dangerous fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = false;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault();
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleRemoveFaultMode());
        fixture.detectChanges();
        expect(component.isDangerousMode).toEqual(false);
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

  describe('Ripple effect', () => {
    it('should have added no classes to the competency button', () => {
      const competencyButton = fixture.debugElement.query(By.css('.competency-button'));
      expect(competencyButton.nativeElement.className).toEqual('competency-button');
    });

    it('should add the activated class when the button is pressed', () => {
      component.onTouchStart();
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));

      expect(button).toBeDefined();
      expect(button.nativeElement.className).toContain('activated');
      expect(component.touchState).toBeTruthy();
    });

    it('should remove the activated class after a specified delay when the button is not pressed', (done) => {
      component.onTouchEnd();
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));
      setTimeout(
        () => {
          fixture.detectChanges();

          expect(button).toBeDefined();
          expect(button.nativeElement.className).not.toContain('activated');
          expect(component.touchState).toBeFalsy();
          done();
        },
        component.touchStateDelay);
    });

    it('should add the ripple effect animation css class', () => {
      component.addOrRemoveFault(true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));

      expect(button).toBeDefined();
      expect(button.nativeElement.className).toContain('ripple-effect');
    });

    it('should remove the ripple effect animation css class within the required time frame', (done) => {
      component.addOrRemoveFault(true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('.competency-button'));
      setTimeout(
        () => {
          fixture.detectChanges();

          expect(button).toBeDefined();
          expect(button.nativeElement.className).not.toContain('ripple-effect');
          done();
        },
        component.rippleEffectAnimationDuration);
    });
  });
  describe('Manoeuvre competency', () => {
    it('should set the isManoeuvreCompetency flag to true when the competency is a manoeuvre competency', () => {
      component.competency = Competencies.outcomeReverseRightControl;
      fixture.detectChanges();
      expect(component.isManoeuvreCompetency).toBe(true);
    });
    it('should set the isManoeuvreCompetency to false when the competency is not a manoeuvre competency', () => {
      component.competency = Competencies.moveOffControl;
      fixture.detectChanges();
      expect(component.isManoeuvreCompetency).toBe(false);
    });
    it('should get the competency label from the correct object', () => {
      component.competency = Competencies.outcomeReverseRightControl;
      fixture.detectChanges();
      const result = component.getLabel();
      const expected = 'Control';
      expect(result).toEqual(expected);
    });
    describe('AddManoeuvreDrivingFault', () => {
      it('should dispatch the correct action when the competency is a manoeuvre', () => {
        component.competency = Competencies.outcomeReverseRightControl;
        fixture.detectChanges();
        const storeDispatchSpy = spyOn(store$, 'dispatch');
        const dispatchAddDrivingFaultSpy = spyOn(component, 'dispatchAddDrivingFault').and.callThrough();
        component.addOrRemoveFault(true);

        expect(dispatchAddDrivingFaultSpy).toHaveBeenCalledTimes(1);
        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddManoeuvreDrivingFault(component.competency));
      });
    });
    describe('DOM', () => {
      it('should display the correct driving fault badge with a count of 1', () => {
        component.competency = Competencies.outcomeReverseRightControl;
        component.isManoeuvreCompetency = true;
        component.manoeuvreCompetencyOutcome = 'DF';
        const result = component.getManoeuvreCompetencyOutcomeCount();
        fixture.detectChanges();
        const manoeuvreDrivingFaultsBadge = fixture.debugElement.query(By.css('.manoeuvre-driving-fault-badge'))
        .componentInstance;
        expect(manoeuvreDrivingFaultsBadge).toBeDefined();
        expect(result).toEqual(1);
      });
    });
  });
});
