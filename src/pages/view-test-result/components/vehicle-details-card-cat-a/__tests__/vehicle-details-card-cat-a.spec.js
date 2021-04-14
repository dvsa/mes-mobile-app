import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { VehicleDetailsCardCatAComponent } from '../vehicle-details-card-cat-a';
describe('VehicleDetailsCardCatAComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsCardCatAComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('shouldHideCard', function () {
            it('should return true if the data is missing', function () {
                expect(component.shouldHideCard()).toEqual(true);
            });
            it('should return false if there is a gearbox category', function () {
                spyOn(component, 'getTransmission').and.returnValue('Tests');
                expect(component.shouldHideCard()).toEqual(false);
            });
            it('should return false if there is a vehicle registration number', function () {
                spyOn(component, 'getRegistrationNumber').and.returnValue('Tests');
                expect(component.shouldHideCard()).toEqual(false);
            });
        });
        describe('getTransmission', function () {
            it('should return the correct value', function () {
                var data = {
                    gearboxCategory: 'Manual',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getTransmission()).toEqual('Manual');
            });
            it('should return undefined if the data is missing', function () {
                expect(component.getTransmission()).toEqual(undefined);
            });
        });
        describe('getRegistrationNumber', function () {
            it('should return the correct value', function () {
                var data = {
                    registrationNumber: 'ABC 1234',
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getRegistrationNumber()).toEqual('ABC 1234');
            });
            it('should return undefined if the data is missing', function () {
                expect(component.getRegistrationNumber()).toEqual(undefined);
            });
        });
        describe('getSchoolBike', function () {
            it('should return the correct value', function () {
                var data = {
                    schoolBike: true,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getSchoolBike()).toEqual(true);
            });
            it('should return undefined if the data is missing', function () {
                expect(component.getSchoolBike()).toEqual(undefined);
            });
        });
    });
});
//# sourceMappingURL=vehicle-details-card-cat-a.spec.js.map