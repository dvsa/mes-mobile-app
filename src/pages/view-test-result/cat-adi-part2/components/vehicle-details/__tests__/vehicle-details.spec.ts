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
  });
});
