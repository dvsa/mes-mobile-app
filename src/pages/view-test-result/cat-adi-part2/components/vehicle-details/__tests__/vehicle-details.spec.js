import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { VehicleDetailsCatADIPt2Component } from '../vehicle-details';
describe('VehicleDetailsCatADIPt2Component', function () {
    var fixture;
    var component;
    var data = { gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
    var schoolCarData = { schoolCar: true, gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
    var dualControlsData = { dualControls: true, gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
    var trainerDetails = {
        trainerRegistrationNumber: 123456,
        trainingRecords: null,
        orditTrainedCandidate: null,
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleDetailsCatADIPt2Component,
                MockComponent(DataRowComponent),
            ],
            imports: [
                IonicModule,
            ],
            providers: [
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsCatADIPt2Component);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('getTransmission', function () {
            it('should return the value of the gearboxCategory', function () {
                component.data = data;
                expect(component.getTransmission()).toEqual('Manual');
            });
        });
        describe('getRegistrationNumber', function () {
            it('should return the value of the registrationNumber', function () {
                component.data = data;
                expect(component.getRegistrationNumber()).toEqual('ABC123');
            });
        });
        describe('getTrainerPRN', function () {
            it('should return the value of the trainerRegistrationNumber', function () {
                component.trainerData = trainerDetails;
                expect(component.getTrainerPRN()).toEqual(123456);
            });
        });
        describe('getOrdit', function () {
            it('should return `No` as default when null or undefined', function () {
                expect(component.getOrdit()).toEqual('No');
            });
            it('should return `No` when orditTrainedCandidate is false', function () {
                component.trainerData = { orditTrainedCandidate: false };
                expect(component.getOrdit()).toEqual('No');
            });
            it('should return `Yes` when orditTrainedCandidate is true', function () {
                component.trainerData = { orditTrainedCandidate: true };
                expect(component.getOrdit()).toEqual('Yes');
            });
        });
        describe('getTrainingRecords', function () {
            it('should return `No` as default when null or undefined', function () {
                expect(component.getTrainingRecords()).toEqual('No');
            });
            it('should return `No` when trainingRecords is false', function () {
                component.trainerData = { trainingRecords: false };
                expect(component.getTrainingRecords()).toEqual('No');
            });
            it('should return `Yes` when trainingRecords is true', function () {
                component.trainerData = { trainingRecords: true };
                expect(component.getTrainingRecords()).toEqual('Yes');
            });
        });
        describe('displayVehicleDetails', function () {
            it('should return false if school car or dual controls dont exist', function () {
                component.data = data;
                expect(component.displayVehicleDetails()).toEqual(false);
            });
            it('should return true if school car present', function () {
                component.data = schoolCarData;
                expect(component.displayVehicleDetails()).toEqual(true);
            });
            it('should return true if duelControls present', function () {
                component.data = dualControlsData;
                expect(component.displayVehicleDetails()).toEqual(true);
            });
        });
        describe('getVehicleDetails', function () {
            it('should return School Car if school car exists', function () {
                component.data = schoolCarData;
                expect(component.getVehicleDetails()).toEqual('School Car');
            });
            it('should return Dual Controls if school car doesnt exist', function () {
                component.data = dualControlsData;
                expect(component.getVehicleDetails()).toEqual('Dual Controls');
            });
        });
    });
});
//# sourceMappingURL=vehicle-details.spec.js.map