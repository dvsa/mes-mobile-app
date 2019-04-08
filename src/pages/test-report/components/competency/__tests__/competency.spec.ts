import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { HammerProvider } from '../../../../../providers/hammer/hammer';
import { MockElementRef } from '../../../../../shared/mocks/element-ref.mock';
import { Renderer2 } from '@angular/core';
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
} from '../../../../../modules/tests/test_data/test-data.actions';
import { MockComponent } from 'ng-mocks';
import { FaultCounterComponent } from '../../../../../components/fault-counter/fault-counter';
import { DateTimeProvider } from '../../../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../../../providers/date-time/__mocks__/date-time.mock';
import { SeriousFaultBadgeComponent } from '../../../../../components/serious-fault-badge/serious-fault-badge';
import { IonicModule } from 'ionic-angular';
import { DangerousFaultBadgeComponent } from '../../../../../components/dangerous-fault-badge/dangerous-fault-badge';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportReducer } from '../../../test-report.reducer';
import { TestOutcomeStartTest } from '../../../../journal/components/test-outcome/test-outcome.actions';
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode, ToggleRemoveFaultMode } from '../../../test-report.actions';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let hammerProvider: HammerProvider;
  let renderer: Renderer2;
  let store$: Store<StoreModel>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyComponent,
        MockComponent(FaultCounterComponent),
        MockComponent(SeriousFaultBadgeComponent),
        MockComponent(DangerousFaultBadgeComponent),
      ],
      imports: [
        AppModule,
        IonicModule,
        StoreModule.forRoot({ tests: testsReducer, testReport : testReportReducer }),
      ],
      providers: [
        HammerProvider,
        Renderer2,
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(CompetencyComponent);
        component = fixture.componentInstance;
        hammerProvider = component.hammerProvider;
        spyOn(hammerProvider, 'addPressAndHoldEvent');
        spyOn(hammerProvider, 'init');
        renderer = TestBed.get(Renderer2);
        store$ = TestBed.get(Store);

        store$.dispatch(new TestOutcomeStartTest({ slotDetail: { slotId: 103 } }));
      });
  }));

  describe('Class', () => {
    it('should create', () => {
      expect(component).toBeDefined();
    });

    describe('ngOnInit', () => {
      it('should use HammerProvider to attach a press and hold event to the button which records the fault', () => {
        component.button = new MockElementRef();

        component.ngOnInit();

        expect(hammerProvider.init).toHaveBeenCalledWith(component.button);
        expect(hammerProvider.addPressAndHoldEvent).toHaveBeenCalledWith(component.addOrRemoveFault);
      });
    });

    describe('getLabel', () => {
      it('should get the correct label for a competency', () => {
        component.competency = Competencies.controlsSteering;
        expect(component.getLabel()).toBe('Steering');
      });
    });

    describe('addDrivingFault', () => {
      it('should dispatch an ADD_DRIVING_FAULT action for press and hold', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action for press', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasSeriousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasDangerousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });
      it('should not dispatch an ADD_DRIVING_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

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
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active on press and hold', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });

    describe('addSeriousFault', () => {
      it('should dispatch an ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.clearance;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });
      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

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
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press and hold', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should dispatch a REMOVE_SERIOUS_FAULT for press', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });
      it('should not dispatch a REMOVE_SERIOUS_FAULT when is dangerous mode', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveSeriousFault(component.competency));
      });

      it('should remove serious mode after removal attempt on competency with no serious fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasSeriousFault = false;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);
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
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press and hold', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(false);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should dispatch a REMOVE_DANGEROUS_FAULT for press', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should not dispatch a REMOVE_DANGEROUS_FAULT when is serious mode', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = true;
        component.isSeriousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new RemoveDangerousFault(component.competency));
      });
      it('should remove dangerous mode after removal attempt on competency with no dangerous fault', () => {
        component.competency = Competencies.controlsSteering;
        component.hasDangerousFault = false;
        component.isDangerousMode = true;
        component.isRemoveFaultMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addOrRemoveFault(true);
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
        component.addFault(true);

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.addFault(true);

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

    it('should pass the number of driving faults to the fault counter component', () => {
      fixture.detectChanges();
      const drivingFaultCounter = fixture.debugElement.query(By.css('.driving-faults'))
        .componentInstance as FaultCounterComponent;
      component.faultCount = 5;

      fixture.detectChanges();
      expect(drivingFaultCounter.count).toBe(5);
    });
  });

  describe('Ripple effect', () => {
    it('should have added no classes to the competency button', () => {
      expect(component.button.nativeElement.className).toEqual('');
    });

    it('should add and remove the ripple effect animation css class within the required time frame', (done) => {
      // Arrange
      renderer = fixture.componentRef.injector.get(Renderer2);
      renderer.removeClass = jasmine.createSpy('removeClass').and.callThrough();
      renderer.addClass = jasmine.createSpy('addClass').and.callThrough();
      // Act
      component.faultCount = 1;
      component.manageClasses();
      // Assert
      expect(renderer.addClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');

      setTimeout(
        () => {
          expect(renderer.removeClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');
          done();
        },
        component.rippleEffectAnimationDuration);
    });
  });
});
