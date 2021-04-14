import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { VehicleDetailsCardCatBComponent } from '../vehicle-details-card.cat-b';
import { MockComponent } from 'ng-mocks';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleDetailsCardCatBComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                VehicleDetailsCardCatBComponent,
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
        fixture = TestBed.createComponent(VehicleDetailsCardCatBComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('shouldHideCard', function () {
            it('should return true if valid data is not provided', function () {
                component.data = {
                    instructorRegistrationNumber: null,
                    registrationNumber: null,
                    transmission: undefined,
                };
                expect(component.shouldHideCard()).toEqual(true);
            });
        });
    });
    describe('DOM', function () {
    });
});
//# sourceMappingURL=vehicle-details-card.cat-b.spec.js.map