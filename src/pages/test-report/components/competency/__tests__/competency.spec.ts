import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { CompetencyComponent } from '../competency';
import { AppModule } from '../../../../../app/app.module';
import { By } from '@angular/platform-browser';
import { HammerProvider } from '../../../../../providers/hammer/hammer';
import { MockElementRef } from '../../../../../shared/mocks/element-ref.mock';
import { Renderer2 } from '@angular/core';
import { Competencies } from '../../../../../modules/tests/test_data/test-data.constants';
import { StoreModule, Store } from '@ngrx/store';
import { initialState } from '../../../../../modules/tests/test_data/test-data.reducer';
import { StoreModel } from '../../../../../shared/models/store.model';
import { AddDrivingFault } from '../../../../../modules/tests/test_data/test-data.actions';
import { MockComponent } from 'ng-mocks';
import { FaultCounterComponent } from '../../fault-counter/fault-counter';

describe('CompetencyComponent', () => {
  let fixture: ComponentFixture<CompetencyComponent>;
  let component: CompetencyComponent;
  let hammerProvider: HammerProvider;
  let renderer: Renderer2;
  let store$: Store<StoreModel>;
  let storeDispatchSpy: jasmine.Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompetencyComponent,
        MockComponent(FaultCounterComponent),
      ],
      imports: [
        IonicModule,
        AppModule,
        StoreModule.forFeature('tests', () => ({
          currentTest: {
            slotId: '123',
          },
          startedTests: {
            123: {
              testData: initialState,
            },
          },
        })),
      ],
      providers: [
        HammerProvider,
        Renderer2,
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
        storeDispatchSpy = spyOn(store$, 'dispatch');
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

        component.recordFault();

        expect(storeDispatchSpy).toHaveBeenCalledWith(new AddDrivingFault({
          competency: Competencies.controlsSteering,
          newFaultCount: 1,
        }));
      });
    });
  });

  describe('DOM', () => {
    it('should show provided label', () => {
      component.competency = Competencies.controlsGears;
      fixture.detectChanges();
      const label = fixture.debugElement.query(By.css('#competencyLabel'));
      expect(label.nativeElement.innerHTML).toBe('Gears');
    });
  });

  it('should pass the number of driving faults to the fault counter component', () => {
    fixture.detectChanges();
    const drivingFaultCounter = fixture.debugElement.query(By.css('#drivingFaults'))
      .componentInstance as FaultCounterComponent;
    component.faultCount = 5;

    fixture.detectChanges();
    expect(drivingFaultCounter.count).toBe(5);
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
      expect(renderer.addClass).toHaveBeenCalledWith(component.button.nativeElement, 'driving-fault');
      expect(renderer.addClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');

      setTimeout(() => {
        expect(renderer.removeClass).toHaveBeenCalledWith(component.button.nativeElement, 'ripple-effect');
        done();
      },         component.rippleEffectAnimationDuration);
    });
  });
});
