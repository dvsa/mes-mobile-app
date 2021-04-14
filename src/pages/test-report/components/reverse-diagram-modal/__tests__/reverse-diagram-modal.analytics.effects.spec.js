import { ReverseDiagramModalAnalyticsEffects } from '../reverse-diagram-modal.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as reverseDiagramModalActions from '../reverse-diagram-modal.actions';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsDimensionIndices, AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsEvents, } from '../../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../../providers/analytics/analytics.actions';
import * as testsActions from '../../../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../../../modules/tests/tests.reducer';
import { testReportPracticeModeSlot, candidateMock } from '../../../../../modules/tests/__mocks__/tests.mock';
import { PopulateCandidateDetails } from '../../../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions from '../../../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { PopulateTestCategory } from '../../../../../modules/tests/category/category.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Reverse Diagram Modal Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.REVERSE_DIAGRAM;
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.REVERSE_DIAGRAM;
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
                ReverseDiagramModalAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(ReverseDiagramModalAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('reverseDiagramViewDidEnter', function () {
        it('should call setCurrentPage and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B+E" /* BE */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            store$.dispatch(new PopulateTestCategory("B+E" /* BE */));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramViewDidEnter());
            // ASSERT
            effects.reverseDiagramViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B+E');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
        it('should call setCurrentPage with practice mode prefix and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            store$.dispatch(new PopulateTestCategory("B+E" /* BE */));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramViewDidEnter());
            // ASSERT
            effects.reverseDiagramViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B+E');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenNamePracticeMode);
                done();
            });
        });
    });
    describe('reverseDiagramOpened', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramOpened());
            // ASSERT
            effects.reverseDiagramOpened$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEventCategories.TEST_REPORT, AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEvents.REVERSE_DIAGRAM_OPENED);
                done();
            });
        });
    });
    describe('reverseDiagramClosed', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramClosed());
            // ASSERT
            effects.reverseDiagramClosed$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEventCategories.TEST_REPORT, AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEvents.REVERSE_DIAGRAM_CLOSED);
                done();
            });
        });
    });
    describe('reverseDiagramLengthChanged', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramLengthChanged(100, 10));
            // ASSERT
            effects.reverseDiagramLengthChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEventCategories.TEST_REPORT, AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEvents.REVERSE_DIAGRAM_LENGTH_CHANGED, 'from 100 to 10');
                done();
            });
        });
    });
    describe('reverseDiagramWidthChanged', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTestReportPracticeTest(testReportPracticeModeSlot.slotDetail.slotId));
            // ACT
            actions$.next(new reverseDiagramModalActions.ReverseDiagramWidthChanged(100, 10));
            // ASSERT
            effects.reverseDiagramWidthChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledTimes(1);
                expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEventCategories.TEST_REPORT, AnalyticsEventCategories.PRACTICE_TEST + " - " + AnalyticsEvents.REVERSE_DIAGRAM_WIDTH_CHANGED, 'from 100 to 10');
                done();
            });
        });
    });
});
//# sourceMappingURL=reverse-diagram-modal.analytics.effects.spec.js.map