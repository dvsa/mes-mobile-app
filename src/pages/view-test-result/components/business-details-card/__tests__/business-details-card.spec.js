import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config, Platform } from 'ionic-angular';
import { ConfigMock, PlatformMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { BusinessDetailsCardComponent } from '../business-details-card';
import { DisplayAddressComponent } from '../../../../../components/common/display-address/display-address';
import { configureTestSuite } from 'ng-bullet';
describe('BusinessDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
                { provide: Platform, useFactory: function () { return PlatformMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(BusinessDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('shouldHideCard', function () {
            it('should return true if all data is present', function () {
                expect(component.shouldHideCard()).toEqual(true);
            });
            it('should return false if all data has been provided', function () {
                var data = {
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
            it('should return false if only business name has been provided', function () {
                var data = {
                    businessName: 'Business Name',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.shouldHideCard()).toEqual(false);
            });
            it('should return false if only business telephone has been provided', function () {
                var data = {
                    businessTelephone: ' Business Telephone',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.shouldHideCard()).toEqual(false);
            });
            it('should return false if only business address has been provided', function () {
                var data = {
                    businessAddress: {
                        addressLine1: 'Address Line 1',
                    },
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.shouldHideCard()).toEqual(false);
            });
        });
        describe('getBusinessName', function () {
            it('should return the correct value if the data is present', function () {
                var data = {
                    businessName: 'Test Business Name',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getBusinessName()).toEqual('Test Business Name');
            });
            it('should return Not Supplied if the data is not present', function () {
                expect(component.getBusinessName()).toEqual('Not supplied');
            });
        });
        describe('getPhoneNumber', function () {
            it('should return the correct value if the data is present', function () {
                var data = {
                    businessTelephone: '123456789',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getPhoneNumber()).toEqual('123456789');
            });
            it('should return Not Supplied if the data is not present', function () {
                expect(component.getPhoneNumber()).toEqual('Not supplied');
            });
        });
        describe('getAddress', function () {
            it('should return the correct value if the data is present', function () {
                var data = {
                    businessAddress: {
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
            it('should return undefined if the data is missing', function () {
                expect(component.getAddress()).toEqual(undefined);
            });
        });
    });
});
//# sourceMappingURL=business-details-card.spec.js.map