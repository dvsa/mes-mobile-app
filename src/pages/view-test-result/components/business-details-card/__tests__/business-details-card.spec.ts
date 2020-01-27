
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, Platform } from 'ionic-angular';
import { ConfigMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { BusinessDetailsCardComponent, CandidateWithBusinessDetails } from '../business-details-card';
import { DisplayAddressComponent } from '../../../../../components/common/display-address/display-address';
import { configureTestSuite } from 'ng-bullet';

describe('BusinessDetailsCardComponent', () => {
  let fixture: ComponentFixture<BusinessDetailsCardComponent>;
  let component: BusinessDetailsCardComponent;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        BusinessDetailsCardComponent,
        MockComponent(DataRowComponent),
        MockComponent(DataRowCustomComponent),
        MockComponent(DisplayAddressComponent),
      ],
      imports: [
        IonicModule,
      ],
      providers: [
        { provide: Config, useFactory: () => ConfigMock.instance() },
        { provide: Platform, useFactory: () => PlatformMock.instance() },
      ],
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusinessDetailsCardComponent);
    component = fixture.componentInstance;
  }));

  describe('Class', () => {
    describe('shouldHideCard', () => {
      it('should return true if all data is present', () => {
        expect(component.shouldHideCard()).toEqual(true);
      });
      it('should return false if all data has been provided', () => {
        const data: CandidateWithBusinessDetails = {
          businessName: 'Business Name',
          businessTelephone: ' Business Telephone',
          businessAddress: {
            addressLine1: 'Address Line 1',
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.shouldHideCard()).toEqual(false);
      });
      it('should return false if only business name has been provided', () => {
        const data: CandidateWithBusinessDetails = {
          businessName: 'Business Name',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.shouldHideCard()).toEqual(false);
      });
      it('should return false if only business telephone has been provided', () => {
        const data: CandidateWithBusinessDetails = {
          businessTelephone: ' Business Telephone',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.shouldHideCard()).toEqual(false);
      });
      it('should return false if only business address has been provided', () => {
        const data: CandidateWithBusinessDetails = {
          businessAddress: {
            addressLine1: 'Address Line 1',
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.shouldHideCard()).toEqual(false);
      });
    });
    describe('getBusinessName', () => {
      it('should return the correct value if the data is present', () => {
        const data: CandidateWithBusinessDetails = {
          businessName: 'Test Business Name',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getBusinessName()).toEqual('Test Business Name');
      });
      it('should return Not Supplied if the data is not present', () => {
        expect(component.getBusinessName()).toEqual('Not supplied');
      });
    });
    describe('getPhoneNumber', () => {
      it('should return the correct value if the data is present', () => {
        const data: CandidateWithBusinessDetails = {
          businessTelephone: '123456789',
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getPhoneNumber()).toEqual('123456789');
      });
      it('should return Not Supplied if the data is not present', () => {
        expect(component.getPhoneNumber()).toEqual('Not supplied');
      });
    });
    describe('getAddress', () => {
      it('should return the correct value if the data is present', () => {
        const data: CandidateWithBusinessDetails = {
          businessAddress:{
            addressLine1: 'Address Line 1',
            addressLine2: 'Address Line 2',
            addressLine3: 'Address Line 3',
            addressLine4: 'Address Line 4',
            addressLine5: 'Address Line 5',
            postcode: 'Postcode',
          },
        };
        component.data = data;
        fixture.detectChanges();
        expect(component.getAddress()).toEqual(data.businessAddress);
      });
      it('should return undefined if the data is missing', () => {
        expect(component.getAddress()).toEqual(undefined);
      });
    });
  });

});
