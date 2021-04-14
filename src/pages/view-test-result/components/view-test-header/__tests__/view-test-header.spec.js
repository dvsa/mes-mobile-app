import { async, TestBed } from '@angular/core/testing';
import { IonicModule, Config } from 'ionic-angular';
import { ConfigMock } from 'ionic-mocks';
import { ViewTestHeaderComponent } from '../view-test-header';
import { TestOutcome } from '../../../../../modules/tests/tests.constants';
import { configureTestSuite } from 'ng-bullet';
describe('ViewTestHeaderComponent', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                ViewTestHeaderComponent,
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
        fixture = TestBed.createComponent(ViewTestHeaderComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('isPassed', function () {
            it('should return true for activity code 1', function () {
                component.data = {
                    activityCode: '1',
                    candidateDriverNumber: '',
                    candidateName: '',
                    testOutcome: TestOutcome.Passed,
                };
                expect(component.isPassed()).toBe(true);
            });
            it('should return false for an activity code that is not 1', function () {
                component.data = {
                    activityCode: '5',
                    candidateDriverNumber: '',
                    candidateName: '',
                    testOutcome: TestOutcome.Passed,
                };
                expect(component.isPassed()).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=view-test-header.spec.js.map