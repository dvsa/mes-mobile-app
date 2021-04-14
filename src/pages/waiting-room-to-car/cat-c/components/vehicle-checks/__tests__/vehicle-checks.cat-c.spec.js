import { async, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonicModule, ModalController, Config, NavParams } from 'ionic-angular';
import { ModalControllerMock, ConfigMock, NavParamsMock } from 'ionic-mocks';
import { VehicleChecksCatCComponent } from '../vehicle-checks.cat-c';
import { CAT_C } from '../../../../../page-names.constants';
import { App } from '../../../../../../app/app.component';
import { Store, StoreModule } from '@ngrx/store';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { SeriousFaultBadgeComponent } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { StartTest } from '../../../../../../modules/tests/tests.actions';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksCatCComponent', function () {
    var fixture;
    var component;
    var modalController;
    var store$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatCComponent,
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
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: App, useClass: MockAppComponent },
                Store,
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: NavParams, useFactory: function () { return NavParamsMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksCatCComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup({});
        modalController = TestBed.get(ModalController);
        store$ = TestBed.get(Store);
    }));
    describe('Class', function () {
        describe('openVehicleChecksModal', function () {
            it('should create the correct model', function () {
                component.category = "C" /* C */;
                component.openVehicleChecksModal();
                expect(modalController.create).toHaveBeenCalledTimes(1);
                expect(modalController.create).toHaveBeenCalledWith(CAT_C.VEHICLE_CHECKS_MODAL, { category: "C" /* C */ }, { cssClass: 'modal-fullscreen text-zoom-regular' });
            });
        });
        describe('hasSeriousFault', function () {
            it('should return true if vehicle checks score has serious fault', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecksScore = {
                    seriousFaults: 1,
                    drivingFaults: 4,
                };
                expect(component.hasSeriousFault()).toBeTruthy();
            });
            it('should return false if vehicle checks score does not have serious fault', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecksScore = {
                    seriousFaults: 0,
                    drivingFaults: 3,
                };
                expect(component.hasSeriousFault()).toBeFalsy();
            });
        });
        describe('hasDrivingFault', function () {
            it('should return true if vehicle checks score has driving fault', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecksScore = {
                    seriousFaults: 0,
                    drivingFaults: 1,
                };
                expect(component.hasDrivingFault()).toBeTruthy();
            });
            it('should return false if vehicle checks score does not have driving fault', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecksScore = {
                    seriousFaults: 0,
                    drivingFaults: 0,
                };
                expect(component.hasDrivingFault()).toBeFalsy();
            });
        });
        describe('everyQuestionHasOutcome', function () {
            it('should return false when not all show me and tell me questions have outcome', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecks = {
                    showMeQuestions: [{}, {}, {}],
                    tellMeQuestions: [{}, {}],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return false when not all show me questions have outcome', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecks = {
                    showMeQuestions: [{}, {}, {}],
                    tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return false when not all tell me questions have outcome', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecks = {
                    showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
                    tellMeQuestions: [{}, {}],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return true when all show / tell me questions have outcome', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                component.vehicleChecks = {
                    showMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
                    tellMeQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
                };
                expect(component.everyQuestionHasOutcome()).toBeTruthy();
            });
        });
        describe('incompleteVehicleChecks', function () {
            it('should return vehicle checks as false', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                var result = component.incompleteVehicleChecks();
                expect(result).toEqual({ vehicleChecks: false });
            });
        });
        describe('validateVehicleChecks', function () {
            it('should call incompleteVehicleChecks() if all questions have NOT been answered', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(false);
                spyOn(component, 'incompleteVehicleChecks');
                component.validateVehicleChecks(null);
                expect(component.incompleteVehicleChecks).toHaveBeenCalled();
            });
            it('should return null if all questions have been answered', function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
                spyOn(component, 'incompleteVehicleChecks');
                var result = component.validateVehicleChecks(null);
                expect(result).toEqual(null);
            });
        });
        describe('invalid', function () {
            beforeEach(function () {
                store$.dispatch(new StartTest(12345, "C" /* C */));
                var formBuilder = new FormBuilder();
                component.formGroup = formBuilder.group({
                    vehicleChecksSelectQuestions: null,
                });
                component.formControl = formBuilder.control({});
            });
            describe('when form is dirty', function () {
                it('should return TRUE if the form control is invalid', function () {
                    component.formControl.markAsDirty();
                    component.formControl.setErrors({ vehicleChecks: false });
                    var result = component.invalid;
                    expect(result).toEqual(true);
                });
                it('should return FALSE if the form control is valid', function () {
                    component.formControl.markAsDirty();
                    var result = component.invalid;
                    expect(result).toEqual(false);
                });
            });
            describe('when form is NOT dirty', function () {
                it('should return FALSE if the form control is invalid', function () {
                    component.formControl.markAsPristine();
                    var result = component.invalid;
                    expect(result).toEqual(false);
                });
            });
        });
        describe('ngOnChanges', function () {
            it('should add the form control', function () {
                var formBuilder = new FormBuilder();
                component.formGroup = formBuilder.group({
                    vehicleChecksSelectQuestions: null,
                });
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
                component.ngOnChanges();
                var result = component.formGroup.contains('vehicleChecksSelectQuestions');
                expect(result).toEqual(true);
            });
            it('should validate the vehicle checks', function () {
                var formBuilder = new FormBuilder();
                component.formGroup = formBuilder.group({
                    vehicleChecksSelectQuestions: null,
                });
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
                spyOn(component, 'validateVehicleChecks');
                component.ngOnChanges();
                expect(component.validateVehicleChecks).toHaveBeenCalled();
            });
            it('should patch the form control value', function () {
                var formBuilder = new FormBuilder();
                component.formGroup = formBuilder.group({
                    vehicleChecksSelectQuestions: null,
                });
                component.formControl = formBuilder.control({});
                component.ngOnChanges();
                expect(component.formControl.value).toEqual('Select questions');
            });
        });
        describe('DOM', function () {
        });
    });
});
//# sourceMappingURL=vehicle-checks.cat-c.spec.js.map