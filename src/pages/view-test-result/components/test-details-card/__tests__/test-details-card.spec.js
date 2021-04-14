import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { TestDetailsCardComponent } from '../test-details-card';
import { ConfigMock } from 'ionic-mocks';
import { MockComponent } from 'ng-mocks';
import { DataRowCustomComponent } from '../../../../../components/common/data-row-custom/data-row-custom';
import { DataRowComponent } from '../../../../../components/common/data-row/data-row';
import { configureTestSuite } from 'ng-bullet';
describe('TestDetailsCardComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                TestDetailsCardComponent,
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
        fixture = TestBed.createComponent(TestDetailsCardComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        // Unit tests for the components TypeScript class
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
    });
});
//# sourceMappingURL=test-details-card.spec.js.map