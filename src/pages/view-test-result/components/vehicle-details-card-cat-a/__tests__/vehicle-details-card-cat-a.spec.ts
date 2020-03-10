
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { VehicleDetails } from '@dvsa/mes-test-schema/categories/AM1';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { VehicleDetailsCardCatAComponent } from '../vehicle-details-card-cat-a';

describe('VehicleDetailsCardCatAComponent', () => {
  let fixture: ComponentFixture<VehicleDetailsCardCatAComponent>;
  let component: VehicleDetailsCardCatAComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        VehicleDetailsCardCatAComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
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
    fixture = TestBed.createComponent(VehicleDetailsCardCatAComponent);
    component = fixture.componentInstance;
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
    describe('getSchoolBike', () => {
      it('should return the correct value', () => {
        const data: VehicleDetails = {
          schoolBike: true,
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getSchoolBike()).toEqual(true);
      });
      it('should return undefined if the data is missing', () => {
        expect(component.getSchoolBike()).toEqual(undefined);
      });
    });
  });
});
