import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { SafetyAndBalanceDataRowComponent } from '../safety-and-balance-data-row';
import { configureTestSuite } from 'ng-bullet';
describe('VehicleChecksDataRowComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SafetyAndBalanceDataRowComponent,
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
        fixture = TestBed.createComponent(SafetyAndBalanceDataRowComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('shouldShowFault', function () {
            it('should return true if outcome is a DF', function () {
                expect(component.shouldShowFault('DF')).toEqual(true);
            });
            it('should return false if outcome is not a DF', function () {
                expect(component.shouldShowFault('P')).toEqual(false);
                expect(component.shouldShowFault('D')).toEqual(false);
                expect(component.shouldShowFault('S')).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=safety-and-balance-data-row.spec.js.map