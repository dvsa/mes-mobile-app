import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { configureTestSuite } from 'ng-bullet';
import { DataRowComponent } from '../../../../../../components/common/data-row/data-row';
import { DataRowCustomComponent } from '../../../../../../components/common/data-row-custom/data-row-custom';
import { TestDetailsCardCatADI2Component } from '../test-details.cat-adi-part2';
describe('TestDetailsCardCatADI2Component', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestDetailsCardCatADI2Component,
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
        fixture = TestBed.createComponent(TestDetailsCardCatADI2Component);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        it('should create', function () {
            expect(component).toBeDefined();
        });
        describe('specialNeedsIsPopulated', function () {
            it('should return false for an empty array', function () {
                var specialNeedsArray = [];
                expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeFalsy();
            });
            it('should return false for an array that has None in it', function () {
                var specialNeedsArray = ['None'];
                expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeFalsy();
            });
            it('should return true for a populated array', function () {
                var specialNeedsArray = ['special need 1', 'special need 2'];
                expect(component.specialNeedsIsPopulated(specialNeedsArray)).toBeTruthy();
            });
        });
        describe('showAttemptNumber', function () {
            it('should return false when attemptNumber is undefined', function () {
                expect(component.showAttemptNumber()).toEqual(false);
            });
            it('should return true when attemptNumber is not null', function () {
                component.candidateDetails = { attemptNumber: 2 };
                expect(component.showAttemptNumber()).toEqual(true);
            });
        });
        describe('showPrn', function () {
            it('should return false when attemptNumber is undefined', function () {
                expect(component.showPrn()).toEqual(false);
            });
            it('should return true when attemptNumber is not null', function () {
                component.candidateDetails = { prn: 223434 };
                expect(component.showPrn()).toEqual(true);
            });
        });
    });
});
//# sourceMappingURL=test-details.cat-adi-part2.spec.js.map