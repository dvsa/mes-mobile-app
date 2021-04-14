import { async, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { IonicModule, ModalController, Config } from 'ionic-angular';
import { ModalControllerMock, ConfigMock } from 'ionic-mocks';
import { VehicleChecksCatAMod2Component } from '../vehicle-checks';
import { CAT_A_MOD2 } from '../../../../../page-names.constants';
import { App } from '../../../../../../app/app.component';
import { Store } from '@ngrx/store';
import { MockAppComponent } from '../../../../../../app/__mocks__/app.component.mock';
import { SeriousFaultBadgeComponent } from '../../../../../../components/common/serious-fault-badge/serious-fault-badge';
import { DrivingFaultsBadgeComponent } from '../../../../../../components/common/driving-faults-badge/driving-faults-badge';
import { TickIndicatorComponent } from '../../../../../../components/common/tick-indicator/tick-indicator';
import { configureTestSuite } from 'ng-bullet';
var MockStore = /** @class */ (function () {
    function MockStore() {
    }
    return MockStore;
}());
describe('VehicleChecksCatAMod2Component', function () {
    var fixture;
    var component;
    var modalController;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleChecksCatAMod2Component,
                SeriousFaultBadgeComponent,
                DrivingFaultsBadgeComponent,
                TickIndicatorComponent,
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: ModalController, useFactory: function () { return ModalControllerMock.instance(); } },
                { provide: App, useClass: MockAppComponent },
                { provide: Store, useClass: MockStore },
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleChecksCatAMod2Component);
        component = fixture.componentInstance;
        modalController = TestBed.get(ModalController);
    }));
    describe('Class', function () {
        describe('openSafetyAndBalanceModal', function () {
            it('should create the correct modal', function () {
                component.openVehicleChecksModal();
                expect(modalController.create).toHaveBeenCalledTimes(1);
                expect(modalController.create).toHaveBeenCalledWith(CAT_A_MOD2.VEHICLE_CHECKS_MODAL, {}, { cssClass: 'modal-fullscreen text-zoom-regular' });
            });
        });
        describe('hasRidingFault', function () {
            it('should return true if safety and balance score has riding fault', function () {
                component.safetyAndBalanceQuestionsScore = {
                    drivingFaults: 1,
                };
                expect(component.hasDrivingFault()).toBeTruthy();
            });
            it('should return false if safety and balance score does not have riding fault', function () {
                component.safetyAndBalanceQuestionsScore = {
                    drivingFaults: 0,
                };
                expect(component.hasDrivingFault()).toBeFalsy();
            });
        });
        describe('everyQuestionHasOutcome', function () {
            it('should return false when not all safety and balance questions have outcome', function () {
                component.safetyAndBalanceQuestions = {
                    safetyQuestions: [{}, {}, {}],
                    balanceQuestions: [{}, {}],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return false when not all safety questions have outcome', function () {
                component.safetyAndBalanceQuestions = {
                    safetyQuestions: [{}, {}, {}],
                    balanceQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return false when not all balance questions have outcome', function () {
                component.safetyAndBalanceQuestions = {
                    safetyQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
                    balanceQuestions: [{}, {}],
                };
                expect(component.everyQuestionHasOutcome()).toBeFalsy();
            });
            it('should return true when all safety and balance questions have outcome', function () {
                component.safetyAndBalanceQuestions = {
                    safetyQuestions: [{ outcome: 'P' }, { outcome: 'DF' }, { outcome: 'P' }],
                    balanceQuestions: [{ outcome: 'P' }, { outcome: 'DF' }],
                };
                expect(component.everyQuestionHasOutcome()).toBeTruthy();
            });
        });
        describe('incompleteVehicleChecks', function () {
            it('should return vehicle checks as false', function () {
                var result = component.incompleteVehicleChecks();
                expect(result).toEqual({ vehicleChecks: false });
            });
        });
        describe('validateVehicleChecks', function () {
            it('should call incompleteVehicleChecks() if all questions have NOT been answered', function () {
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(false);
                spyOn(component, 'incompleteVehicleChecks');
                component.validateVehicleChecks(null);
                expect(component.incompleteVehicleChecks).toHaveBeenCalled();
            });
            it('should return null if all questions have been answered', function () {
                spyOn(component, 'everyQuestionHasOutcome').and.returnValue(true);
                spyOn(component, 'incompleteVehicleChecks');
                var result = component.validateVehicleChecks(null);
                expect(result).toEqual(null);
            });
        });
        describe('invalid', function () {
            beforeEach(function () {
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
    });
});
//# sourceMappingURL=vehicle-checks.spec.js.map