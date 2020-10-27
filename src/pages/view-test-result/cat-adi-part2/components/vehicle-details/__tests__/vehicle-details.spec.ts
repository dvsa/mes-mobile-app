import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';

import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { VehicleDetailsCatADIPt2Component } from '../vehicle-details';

describe('VehicleDetailsCatADIPt2Component', () => {
  let fixture: ComponentFixture<VehicleDetailsCatADIPt2Component>;
  let component: VehicleDetailsCatADIPt2Component;

  const data = { gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
  const schoolCarData = { schoolCar: true, gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
  const dualControlsData = { dualControls: true, gearboxCategory: 'Manual', registrationNumber: 'ABC123' };
  const trainerDetails = {
    trainerRegistrationNumber: 123456,
    trainingRecords: null,
    orditTrainedCandidate: null,
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsCatADIPt2Component,
        MockComponent(DataRowComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VehicleDetailsCatADIPt2Component);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {

    describe('getTransmission', () => {
      it('should return the value of the gearboxCategory', () => {
        component.data = data as CatADI2UniqueTypes.VehicleDetails;
        expect(component.getTransmission()).toEqual('Manual');
      });
    });

    describe('getRegistrationNumber', () => {
      it('should return the value of the registrationNumber', () => {
        component.data = data as CatADI2UniqueTypes.VehicleDetails;
        expect(component.getRegistrationNumber()).toEqual('ABC123');
      });
    });

    describe('getTrainerPRN', () => {
      it('should return the value of the trainerRegistrationNumber', () => {
        component.trainerData = trainerDetails;
        expect(component.getTrainerPRN()).toEqual(123456);
      });
    });

    describe('getOrdit', () => {
      it('should return `No` as default when null or undefined', () => {
        expect(component.getOrdit()).toEqual('No');
      });
      it('should return `No` when orditTrainedCandidate is false', () => {
        component.trainerData = { orditTrainedCandidate: false } as CatADI2UniqueTypes.TrainerDetails;
        expect(component.getOrdit()).toEqual('No');
      });
      it('should return `Yes` when orditTrainedCandidate is true', () => {
        component.trainerData = { orditTrainedCandidate: true } as CatADI2UniqueTypes.TrainerDetails;
        expect(component.getOrdit()).toEqual('Yes');
      });
    });

    describe('getTrainingRecords', () => {
      it('should return `No` as default when null or undefined', () => {
        expect(component.getTrainingRecords()).toEqual('No');
      });
      it('should return `No` when trainingRecords is false', () => {
        component.trainerData = { trainingRecords: false } as CatADI2UniqueTypes.TrainerDetails;
        expect(component.getTrainingRecords()).toEqual('No');
      });
      it('should return `Yes` when trainingRecords is true', () => {
        component.trainerData = { trainingRecords: true } as CatADI2UniqueTypes.TrainerDetails;
        expect(component.getTrainingRecords()).toEqual('Yes');
      });
    });

    describe('displayVehicleDetails', () => {
      it('should return false if school car or dual controls dont exist', () => {
        component.data = data as CatADI2UniqueTypes.VehicleDetails;
        expect(component.displayVehicleDetails()).toEqual(false);
      });
      it('should return true if school car present', () => {
        component.data = schoolCarData as CatADI2UniqueTypes.VehicleDetails;
        expect(component.displayVehicleDetails()).toEqual(true);
      });
      it('should return true if duelControls present', () => {
        component.data = dualControlsData as CatADI2UniqueTypes.VehicleDetails;
        expect(component.displayVehicleDetails()).toEqual(true);
      });
    });

    describe('getVehicleDetails', () => {
      it('should return School Car if school car exists', () => {
        component.data = schoolCarData as CatADI2UniqueTypes.VehicleDetails;
        expect(component.getVehicleDetails()).toEqual('School Car');
      });
      it('should return Dual Controls if school car doesnt exist', () => {
        component.data = dualControlsData as CatADI2UniqueTypes.VehicleDetails;
        expect(component.getVehicleDetails()).toEqual('Dual Controls');
      });
    });

  });
});
