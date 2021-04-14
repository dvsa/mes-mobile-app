import { TestStatusAnalyticsEffects } from '../test-status.analytics.effects';
import { AnalyticsProvider } from '../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../providers/analytics/__mocks__/analytics.mock';
import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { testsReducer } from '../../tests.reducer';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testStatusActions from '../test-status.actions';
import { AnalyticRecorded } from '../../../../providers/analytics/analytics.actions';
import { AnalyticsEventCategories, AnalyticsEvents } from '../../../../providers/analytics/analytics.model';
import { configureTestSuite } from 'ng-bullet';
describe('Test Status Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                TestStatusAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(TestStatusAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    });
    describe('setTestStatusDecidedEffect', function () {
        it('should log test decided event', function (done) {
            var slotId = '1101';
            actions$.next(new testStatusActions.SetTestStatusDecided(slotId));
            effects.setTestStatusDecidedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBeTruthy();
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_DECIDED);
                done();
            });
        });
    });
    describe('setTestStatusWriteUpEffect', function () {
        it('should log test in write-up event', function (done) {
            var slotId = '1101';
            actions$.next(new testStatusActions.SetTestStatusWriteUp(slotId));
            effects.setTestStatusWriteUpEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBeTruthy();
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_IN_WRITE_UP);
                done();
            });
        });
    });
    describe('setTestStatusAutosavedEffect', function () {
        it('should log test in autosaved event', function (done) {
            var slotId = '1101';
            actions$.next(new testStatusActions.SetTestStatusAutosaved(slotId));
            effects.setTestStatusAutosavedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBeTruthy();
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_AUTOSAVED);
                done();
            });
        });
    });
    describe('setTestStatusSubmittedEffect', function () {
        it('should log test submitted event', function (done) {
            var slotId = '1101';
            actions$.next(new testStatusActions.SetTestStatusSubmitted(slotId));
            effects.setTestStatusSubmittedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBeTruthy();
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.TEST_LIFECYCLE, AnalyticsEvents.TEST_SUBMITTED);
                done();
            });
        });
    });
});
//# sourceMappingURL=test-status.analytics.effects.spec.js.map