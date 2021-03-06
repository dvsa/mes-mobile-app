import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicModule, ModalController, Config, NavParams } from 'ionic-angular';
import { ModalControllerMock, ConfigMock, NavParamsMock } from 'ionic-mocks';
import { VehicleChecksCatDComponent } from '../vehicle-checks.cat-d';
import { CAT_D } from '../../../../../page-names.constants';
import { App } from '../../../../../../app/app.component';
import { Store, StoreModule } from '@ngrx/store';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { SeriousFaultBadgeComponent }
  from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DrivingFaultsBadgeComponent }
  from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { configureTestSuite } from 'ng-bullet';

describe('VehicleChecksCatDComponent', () => {
  let fixture: ComponentFixture<VehicleChecksCatDComponent>;
  let component: VehicleChecksCatDComponent;
  let modalController: ModalController;
  let store$: Store<StoreModel>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleChecksCatDComponent,
        SeriousFaultBadgeComponent,
        DrivingFaultsBadgeComponent,
        TickIndicatorComponent,
      ],
      imports: [
        IonicModule,
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        { provide: ModalController, useFactory: () => ModalControllerMock.instance() },
        { provide: App, useClass: MockAppComponent },
        Store,
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: NavParams, useFactory: () => NavParamsMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleChecksCatDComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({});
    modalController = TestBed.get(ModalController);
    store$ = TestBed.get(Store);
  }));

  describe('Class', () => {
    describe('openVehicleChecksModal', () => {
      it('should create the correct model', () => {
        component.category = TestCategory.D;
        component.openVehicleChecksModal();
        expect(modalController.create).toHaveBeenCalledTimes(1);
        expect(modalController.create).toHaveBeenCalledWith(
          CAT_D.VEHICLE_CHECKS_MODAL,
          { category: TestCategory.D },
          { cssClass: 'modal-fullscreen text-zoom-regular' },
        );
      });
    });

    describe('hasSeriousFault', () => {
      it('should return true if vehicle checks score has serious fault', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecksScore = {
          seriousFaults: 1,
          drivingFaults: 4,
        };

        expect(component.hasSeriousFault()).toBeTruthy();
      });

      it('should return false if vehicle checks score does not have serious fault', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 3,
        };

        expect(component.hasSeriousFault()).toBeFalsy();
      });
    });

    describe('hasDrivingFault', () => {
      it('should return true if vehicle checks score has driving fault', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 1,
        };
        component.safetyQuestionsScore = {
          drivingFaults: 0,
        };
        expect(component.hasDrivingFault()).toBeTruthy();
      });

      it('should return true if safety questions score has driving fault', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 0,
        };
        component.safetyQuestionsScore = {
          drivingFaults: 1,
        };

        expect(component.hasDrivingFault()).toBeTruthy();
      });

      it('should return false if vehicle checks / asfety questions score does not have driving fault', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecksScore = {
          seriousFaults: 0,
          drivingFaults: 0,
        };
        component.safetyQuestionsScore = {
          drivingFaults: 0,
        };

        expect(component.hasDrivingFault()).toBeFalsy();
      });
    });

    describe('everyQuestionHasOutcome', () => {
      it('should return false when not all show me / tell me / safety questions have outcome', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecks = {
          showMeQuestions: [{}, {}, {}],
          tellMeQuestions: [{}, {}],
        };
        component.safetyQuestions = {
          questions: [{}],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return false when not all show me questions have outcome', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecks = {
          showMeQuestions: [{}, {}, {}],
          tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return false when not all tell me questions have outcome', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecks = {
          showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
          tellMeQuestions: [{}, {}],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return false when not all safety questions have outcome', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecks = {
          showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
          tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
        };
        component.safetyQuestions = {
          questions: [{}],
        };

        expect(component.everyQuestionHasOutcome()).toBeFalsy();
      });

      it('should return true when all show / tell me / safety questions have outcome', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        component.vehicleChecks = {
          showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
          tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
        };
        component.safetyQuestions = {
          questions: [{ outcome: 'P' }, { outcome: 'P' }, { outcome: 'P' }],
        };

        expect(component.everyQuestionHasOutcome()).toBeTruthy();
      });
    });

    describe('incompleteVehicleChecks', () => {
      it('should return vehicle checks as false', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        const result = component.incompleteVehicleChecks();
        expect(result).toEqual({ vehicleChecks: false });
      });
    });

    describe('validateVehicleChecks', () => {
      it('should call incompleteVehicleChecks() if all questions have NOT been answered', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        spyOn(component, 'everyQuestionHasOutcome').and.returnValue(false);
        spyOn(component, 'incompleteVehicleChecks');
        component.validateVehicleChecks(null);
        expect(component.incompleteVehicleChecks).toHaveBeenCalled();
      });

      it('should return null if all questions have been answered', () => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
        spyOn(component, 'incompleteVehicleChecks');
        const result = component.validateVehicleChecks(null);
        expect(result).toEqual(null);
      });
    });

    describe('invalid', () => {

      beforeEach(() => {
        store$.dispatch(new StartTest(12345, TestCategory.D));
        const formBuilder: FormBuilder = new FormBuilder();
        component.formGroup = formBuilder.group({
          vehicleChecksSelectQuestions: null,
        });
        component.formControl = formBuilder.control({});
      });

      describe('when form is dirty', () => {
        it('should return TRUE if the form control is invalid', () => {
          component.formControl.markAsDirty();
          component.formControl.setErrors({ vehicleChecks: false });
          const result = component.invalid;
          expect(result).toEqual(true);
        });

        it('should return FALSE if the form control is valid', () => {
          component.formControl.markAsDirty();
          const result = component.invalid;
          expect(result).toEqual(false);
        });
      });

      describe('when form is NOT dirty', () => {
        it('should return FALSE if the form control is invalid', () => {
          component.formControl.markAsPristine();
          const result = component.invalid;
          expect(result).toEqual(false);
        });
      });
    });

    describe('ngOnChanges', () => {
      it('should add the form control', () => {
        const formBuilder: FormBuilder = new FormBuilder();
        component.formGroup = formBuilder.group({
          vehicleChecksSelectQuestions: null,
        });
        spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
        component.ngOnChanges();
        const result = component.formGroup.contains('vehicleChecksSelectQuestions');
        expect(result).toEqual(true);
      });

      it('should validate the vehicle checks', () => {
        const formBuilder: FormBuilder = new FormBuilder();
        component.formGroup = formBuilder.group({
          vehicleChecksSelectQuestions: null,
        });
        spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
        spyOn(component, 'validateVehicleChecks');
        component.ngOnChanges();
        expect(component.validateVehicleChecks).toHaveBeenCalled();
      });

      it('should patch the form control value', () => {
        const formBuilder: FormBuilder = new FormBuilder();
        component.formGroup = formBuilder.group({
          vehicleChecksSelectQuestions: null,
        });
        component.formControl = formBuilder.control({});
        component.ngOnChanges();
        expect(component.formControl.value).toEqual('Select questions');
      });
    });

    describe('DOM', () => {

    });

  });
});
