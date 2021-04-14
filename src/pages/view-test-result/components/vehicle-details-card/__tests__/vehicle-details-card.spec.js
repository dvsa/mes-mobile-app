import { async, TestBed } from '@angular/core/testing';
import { Config, IonicModule } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { VehicleDetailsCardComponent } from '../vehicle-details-card';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
describe('VehicleDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
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
                { provide: Config, useFactory: function () { return ConfigMock.instance(); } },
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(VehicleDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('shouldHideVehicleDetails', function () {
            var localCategories = [
                ["F" /* F */, true],
                ["G" /* G */, true],
                ["H" /* H */, true],
                ["K" /* K */, true],
                ["B" /* B */, false],
            ];
            var _loop_1 = function (testCategory) {
                var title = localCategories[testCategory][1] ? 'should hide' : 'should not hide';
                it(title + " for TestCategory " + localCategories[testCategory][0], function () {
                    component.category = localCategories[testCategory][0];
                    expect(component.shouldHideDimensions()).toEqual(localCategories[testCategory][1]);
                });
            };
            for (var testCategory in localCategories) {
                _loop_1(testCategory);
            }
        });
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
        describe('getVehicleLength', function () {
            it('should return the correct value', function () {
                var data = {
                    vehicleLength: 10,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getVehicleLength()).toEqual(10);
            });
            it('should return ? if the data is missing', function () {
                expect(component.getVehicleLength()).toEqual('?');
            });
        });
        describe('getVehicleWidth', function () {
            it('should return the correct value', function () {
                var data = {
                    vehicleWidth: 4,
                };
                component.data = data;
                fixture.detectChanges();
                expect(component.getVehicleWidth()).toEqual(4);
            });
            it('should return ? if the data is missing', function () {
                expect(component.getVehicleWidth()).toEqual('?');
            });
        });
    });
});
//# sourceMappingURL=vehicle-details-card.spec.js.map