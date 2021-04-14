import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsDimensionIndices } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { ViewTestResultAnalyticsEffects } from '../view-test-result.analytics.effects';
import * as viewTestResultActions from '../view-test-result.actions';
import { configureTestSuite } from 'ng-bullet';
describe('View Test Results Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.VIEW_TEST_RESULT;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                ViewTestResultAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(ViewTestResultAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    });
    describe('viewTestResultViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ACT
            actions$.next(new viewTestResultActions.ViewTestResultViewDidEnter('12345'));
            // ASSERT
            effects.viewTestResultViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                expect(analyticsProviderMock.addCustomDimension).toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '12345');
                done();
            });
        });
    });
});
//# sourceMappingURL=view-test-results.analytics.effects.spec.js.map