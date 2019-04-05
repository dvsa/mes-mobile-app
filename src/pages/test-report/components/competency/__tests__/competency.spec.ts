
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
import { ToggleSeriousFaultMode, ToggleDangerousFaultMode } from '../../../test-report.actions';

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
        expect(hammerProvider.addPressAndHoldEvent).toHaveBeenCalledWith(component.recordFault);
      });
    });

    describe('getLabel', () => {
      it('should get the correct label for a competency', () => {
        component.competency = Competencies.controlsSteering;
        expect(component.getLabel()).toBe('Steering');
      });
    });

    describe('recordFault', () => {
      it('should dispatch a ADD_DRIVING_FAULT action', () => {
        component.competency = Competencies.controlsSteering;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });

      it('should not dispatch a ADD_DRIVING_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasSeriousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });

      it('should not dispatch a ADD_DRIVING_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });

      it('should not dispatch a ADD_DRIVING_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.awarenessPlanning;
        component.hasDangerousFault = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });

      it('should not dispatch a ADD_DRIVING_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDrivingFault({
          competency: component.competency,
          newFaultCount: 1,
        }));
      });

      it('should dispatch a ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a serious fault', () => {
        component.competency = Competencies.clearance;
        component.hasSeriousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should not dispatch a ADD_SERIOUS_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should not dispatch a ADD_SERIOUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddSeriousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleSeriousFaultMode());
      });

      it('should dispatch a ADD_DANGEROUS_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should not dispatch a ADD_DANGEROUS_FAULT action if there is a dangerous fault', () => {
        component.competency = Competencies.clearance;
        component.hasDangerousFault = true;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).not.toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });
    });

    describe('buttonClick', () => {
      it('should dispatch ADD_DANGEROUS_FAULT action if dangerous mode is active', () => {
        component.competency = Competencies.clearance;
        component.isDangerousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDangerousFault(component.competency));
        expect(storeDispatchSpy).toHaveBeenCalledWith(new ToggleDangerousFaultMode());
      });

      it('should dispatch ADD_SERIOUS_FAULT action if serious mode is active', () => {
        component.competency = Competencies.clearance;
        component.isSeriousMode = true;

        const storeDispatchSpy = spyOn(store$, 'dispatch');
        component.recordFault();

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
