import { WaitingRoomToCarAnalyticsEffects } from '../waiting-room-to-car.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as waitingRoomToCarActions from '../waiting-room-to-car.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsDimensionIndices, AnalyticsScreenNames, AnalyticsErrorTypes, AnalyticsEventCategories, } from '../../../providers/analytics/analytics.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import * as applicationReferenceActions from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { configureTestSuite } from 'ng-bullet';
describe('Waiting Room To Car Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.WAITING_ROOM_TO_CAR;
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.WAITING_ROOM_TO_CAR;
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
                WaitingRoomToCarAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(WaitingRoomToCarAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('waitingRoomToCarViewDidEnter', function () {
        it('should call setCurrentPage, addCustomDimension and category', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
            // ASSERT
            effects.waitingRoomToCarViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
        it('should call setCurrentPage with practice mode prefix, addCustomDimension and test category', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarViewDidEnter());
            // ASSERT
            effects.waitingRoomToCarViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenNamePracticeMode);
                done();
            });
        });
    });
    describe('waitingRoomToCarError', function () {
        it('should call logError', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarError('error 123'));
            // ASSERT
            effects.waitingRoomToCarError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.SUBMIT_FORM_ERROR + " (" + screenName + ")", 'error 123');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                done();
            });
        });
        it('should call logError, prefixed with practice mode', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarError('error 123'));
            // ASSERT
            effects.waitingRoomToCarError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.SUBMIT_FORM_ERROR + " (" + screenNamePracticeMode + ")", 'error 123');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                done();
            });
        });
    });
    describe('waitingRoomToCarValidationError', function () {
        it('should call logError', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarValidationError('formControl1'));
            // ASSERT
            effects.waitingRoomToCarValidationError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenName + ")", 'formControl1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                done();
            });
        });
        it('should call logError, prefixed with practice mode', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateTestCategory("B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new waitingRoomToCarActions.WaitingRoomToCarValidationError('formControl1'));
            // ASSERT
            effects.waitingRoomToCarValidationError$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + screenNamePracticeMode + ")", 'formControl1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'B');
                done();
            });
        });
    });
});
//# sourceMappingURL=waiting-room-to-car.analytics.effects.spec.js.map