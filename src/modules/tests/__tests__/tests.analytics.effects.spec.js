import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsDimensionIndices, AnalyticsEventCategories, AnalyticsEvents, } from '../../../providers/analytics/analytics.model';
import { testsReducer } from '../tests.reducer';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { TestsAnalyticsEffects } from '../tests.analytics.effects';
import * as testsActions from '../tests.actions';
import * as activityCodeActions from '../activity-code/activity-code.actions';
import * as testStatusActions from '../test-status/test-status.actions';
import * as candidateActions from '../journal-data/common/candidate/candidate.actions';
import * as rekeyActions from '../rekey/rekey.actions';
import * as applicationReferenceActions from '../journal-data/common/application-reference/application-reference.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { NavigationStateProviderMock } from '../../../providers/navigation-state/__mocks__/navigation-state.mock';
import { NavigationStateProvider } from '../../../providers/navigation-state/navigation-state';
import { candidateMock } from '../__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Tests Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var navigationStateProviderMock;
    var actions$;
    var store$;
    var mockApplication = {
        applicationId: 123456,
        bookingSequence: 78,
        checkDigit: 9,
    };
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                TestsAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                { provide: NavigationStateProvider, useClass: NavigationStateProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(TestsAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        navigationStateProviderMock = TestBed.get(NavigationStateProvider);
        store$ = TestBed.get(Store);
    });
    describe('setTestStatusSubmittedEffect', function () {
        it('should set an action saying the test has been submitted if it is not a rekey', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(12345, "B" /* B */));
            store$.dispatch(new candidateActions.PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new testStatusActions.SetTestStatusSubmitted('12345'));
            // ASSERT
            effects.setTestStatusSubmittedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.SUBMIT_TEST, 'pass');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                done();
            });
        });
        it('should set an action saying the test has been submitted if it is a rekey', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(12345, "B" /* B */));
            store$.dispatch(new candidateActions.PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            store$.dispatch(new candidateActions.PopulateCandidateDetails(candidateMock));
            store$.dispatch(new rekeyActions.MarkAsRekey());
            // ACT
            actions$.next(new testStatusActions.SetTestStatusSubmitted('12345'));
            // ASSERT
            effects.setTestStatusSubmittedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.SUBMIT_REKEY_TEST, 'fail');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                done();
            });
        });
    });
    describe('sendCompletedTestsFailureEffect', function () {
        it('should send an error action', function (done) {
            // ACT
            actions$.next(new testsActions.SendCompletedTestsFailure());
            // ASSERT
            effects.sendCompletedTestsFailureEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith('Error connecting to microservice (test submission)', 'No message');
                done();
            });
        });
    });
    describe('testOutcomeChangedEffect', function () {
        it('should log an event', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(12345, "B" /* B */));
            store$.dispatch(new candidateActions.PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            var eventLabel = 'fail to pass';
            // ACT
            actions$.next(new testsActions.TestOutcomeChanged(eventLabel));
            // ASSERT
            effects.testOutcomeChangedEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.TEST_REPORT, AnalyticsEvents.TEST_OUTCOME_CHANGED, eventLabel);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                done();
            });
        });
    });
    describe('startTestAnalyticsEffect', function () {
        it('should log the correct event if it triggered from the journal page', function (done) {
            // ARRANGE
            spyOn(navigationStateProviderMock, 'isRekeySearch').and.returnValue(false);
            // ACT
            actions$.next(new testsActions.StartTest(12345, "B+E" /* BE */));
            // ASSERT
            effects.startTestAnalyticsEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension).toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, "B+E" /* BE */);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.START_TEST);
                done();
            });
        });
        it('should log the correct event if it is triggered from the Rekey Search page', function (done) {
            // ARRANGE
            spyOn(navigationStateProviderMock, 'isRekeySearch').and.returnValue(true);
            // ACT
            actions$.next(new testsActions.StartTest(12345, "B" /* B */));
            // ASSERT
            effects.startTestAnalyticsEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension).toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, "B" /* B */);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.REKEY_SEARCH, AnalyticsEvents.START_TEST);
                done();
            });
        });
    });
});
//# sourceMappingURL=tests.analytics.effects.spec.js.map