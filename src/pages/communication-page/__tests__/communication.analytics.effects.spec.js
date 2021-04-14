import { CommunicationAnalyticsEffects } from '../communication.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as communicationActions from '../communication.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsDimensionIndices, AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsErrorTypes, } from '../../../providers/analytics/analytics.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Communication Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.COMMUNICATION;
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.COMMUNICATION;
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
                CommunicationAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(CommunicationAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('communicationViewDidEnter', function () {
        it('should call setCurrentPage and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new communicationActions.CommunicationViewDidEnter());
            // ASSERT
            effects.communicationViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
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
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new communicationActions.CommunicationViewDidEnter());
            // ASSERT
            effects.communicationViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
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
    describe('communicationValidationError', function () {
        it('should call logError', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new communicationActions.CommunicationValidationError('formControl1'));
            // ASSERT
            effects.communicationValidationError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenName + ")", 'formControl1');
                done();
            });
        });
        it('should call logError, prefixed with practice mode', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new communicationActions.CommunicationValidationError('formControl1'));
            // ASSERT
            effects.communicationValidationError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenNamePracticeMode + ")", 'formControl1');
                done();
            });
        });
    });
});
//# sourceMappingURL=communication.analytics.effects.spec.js.map