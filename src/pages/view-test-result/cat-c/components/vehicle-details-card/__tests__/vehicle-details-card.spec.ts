
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { VehicleDetailsCardComponent } from '../vehicle-details-card';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/Common';
// TODO - Cat C
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

describe('VehicleDetailsCardComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsCardComponent>;
  let component: VehicleDetailsCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(VehicleDetailsCardComponent);
        component = fixture.componentInstance;
      });
  }));

  describe('Class', () => {
    describe('shouldHideCard', () => {
      it('should return true if the data is missing', () => {
        expect(component.shouldHideCard()).toEqual(true);
      });
      it('should return false if there is a gearbox category', () => {
        spyOn(component, 'getTransmission').and.returnValue('Tests');
        expect(component.shouldHideCard()).toEqual(false);
      });
      it('should return false if there is a vehicle registration number', () => {
        spyOn(component, 'getRegistrationNumber').and.returnValue('Tests');
        expect(component.shouldHideCard()).toEqual(false);
      });
    });
    describe('getTransmission', () => {
      it('should return the correct value', () => {
        const data: VehicleDetails = {
          gearboxCategory: 'Manual',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getTransmission()).toEqual('Manual');
      });
      it('should return undefined if the data is missing', () => {
        expect(component.getTransmission()).toEqual(undefined);
      });
    });
    describe('getRegistrationNumber', () => {
      it('should return the correct value', () => {
        const data: VehicleDetails = {
          registrationNumber: 'ABC 1234',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getRegistrationNumber()).toEqual('ABC 1234');
      });
      it('should return undefined if the data is missing', () => {
        expect(component.getRegistrationNumber()).toEqual(undefined);
      });
    });
    describe('getVehicleLength', () => {
      it('should return the correct value', () => {

        // TODO: MES-4287 Use category c type
        const data: CatBEUniqueTypes.VehicleDetails = {
          vehicleLength: 10,
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getVehicleLength()).toEqual(10);
      });
      it('should return ? if the data is missing', () => {
        expect(component.getVehicleLength()).toEqual('?');
      });
    });
    describe('getVehicleWidth', () => {
      it('should return the correct value', () => {

        // TODO: MES-4287 Use category c function
        const data: CatBEUniqueTypes.VehicleDetails = {
          vehicleWidth: 4,
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getVehicleWidth()).toEqual(4);
      });
      it('should return ? if the data is missing', () => {
        expect(component.getVehicleWidth()).toEqual('?');
      });
    });
  });
});
