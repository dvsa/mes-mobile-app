import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { TestResultsSearchAnalyticsEffects } from '../test-results-search.analytics.effects';
import * as testResultSearchActions from '../test-results-search.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Test Results Search Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var screenName = AnalyticsScreenNames.TEST_RESULTS_SEARCH;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            providers: [
                TestResultsSearchAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(TestResultsSearchAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
    });
    describe('testResultSearchViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.TestResultSearchViewDidEnter());
            // ASSERT
            effects.testResultSearchViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
                done();
            });
        });
    });
    describe('performApplicationReferenceSearch', function () {
        it('should call logEvent', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.PerformApplicationReferenceSearch());
            // ASSERT
            effects.performApplicationReferenceSearch$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.APPLICATION_REFERENCE_SEARCH);
                done();
            });
        });
    });
    describe('performDriverNumberSearch', function () {
        it('should call logEvent', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.PerformDriverNumberSearch());
            // ASSERT
            effects.performDriverNumberSearch$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.DRIVER_NUMBER_SEARCH);
                done();
            });
        });
    });
    describe('performLDTMSearch', function () {
        it('should call logEvent with the correct custom dimensions when no search params are provided', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.PerformLDTMSearch({}));
            // ASSERT
            effects.performLDTMSearch$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.LDTM_SEARCH, '');
                done();
            });
        });
        it('should call logEvent with the correct custom dimensions when 1 search param is provided', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.PerformLDTMSearch({
                costCode: 'mock-cost-code',
            }));
            // ASSERT
            effects.performLDTMSearch$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.LDTM_SEARCH, 'test centre');
                done();
            });
        });
        it('should call logEvent with the correct custom dimensions when all search params are provided', function (done) {
            // ACT
            actions$.next(new testResultSearchActions.PerformLDTMSearch({
                costCode: 'mock-cost-code',
                staffNumber: 'mock-staff-number',
                startDate: 'mock-start-date',
            }));
            // ASSERT
            effects.performLDTMSearch$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.TEST_RESULTS_SEARCH, AnalyticsEvents.LDTM_SEARCH, 'date, staff id, test centre');
                done();
            });
        });
    });
});
//# sourceMappingURL=test-results-search.analytics.effects.spec.js.map