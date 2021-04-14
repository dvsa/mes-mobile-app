import { async, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { RekeySearchAnalyticsEffects } from '../rekey-search.analytics.effects';
import * as rekeySearchActions from '../rekey-search.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Rekey Search Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.REKEY_SEARCH;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                RekeySearchAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
            ],
        });
    });
    beforeEach(async(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(RekeySearchAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    }));
    describe('rekeySearchViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ACT
            actions$.next(new rekeySearchActions.RekeySearchViewDidEnter());
            // ASSERT
            effects.rekeySearchViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
    describe('rekeySearchPerformed', function () {
        it('should log an event with the correct values', function (done) {
            // ACT
            actions$.next(new rekeySearchActions.SearchBookedTest('', ''));
            // ASSERT
            effects.rekeySearchPerformed$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.REKEY_SEARCH, AnalyticsEvents.TEST_BOOKING_SEARCH);
                done();
            });
        });
    });
});
//# sourceMappingURL=rekey-search.analytics.effects.spec.js.map