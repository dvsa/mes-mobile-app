import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { AppModule } from '../../../../app/app.module';
import { SubmissionStatusComponent } from '../submission-status';
import { TestStatus } from '../../../../modules/tests/test-status/test-status.model';
import { configureTestSuite } from 'ng-bullet';
describe('PracticeTestModal', function () {
    var fixture;
    var component;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            declarations: [
                SubmissionStatusComponent,
            ],
            imports: [
                AppModule,
                IonicModule,
            ],
        });
    });
    beforeEach(async(function () {
        fixture = TestBed.createComponent(SubmissionStatusComponent);
        component = fixture.componentInstance;
    }));
    describe('Class', function () {
        describe('showBanner', function () {
            it('should show banner if test status is completed', function () {
                component.testStatus = TestStatus.Completed;
                expect(component.showBanner()).toEqual(true);
            });
            it('should not show banner if test status is booked', function () {
                component.testStatus = TestStatus.Booked;
                expect(component.showBanner()).toEqual(false);
            });
            it('should not show banner if test status is decided', function () {
                component.testStatus = TestStatus.Decided;
                expect(component.showBanner()).toEqual(false);
            });
            it('should not show banner if test status is started', function () {
                component.testStatus = TestStatus.Started;
                expect(component.showBanner()).toEqual(false);
            });
            it('should not show banner if test status is submitted', function () {
                component.testStatus = TestStatus.Submitted;
                expect(component.showBanner()).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=submission-status.spec.js.map