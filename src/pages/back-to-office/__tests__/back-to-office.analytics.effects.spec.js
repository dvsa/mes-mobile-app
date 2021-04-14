import { BackToOfficeAnalyticsEffects } from '../back-to-office.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as backToOfficeActions from '../back-to-office.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsDimensionIndices, AnalyticsEvents, } from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import * as applicationReferenceActions from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { configureTestSuite } from 'ng-bullet';
describe('Back To Office Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.BACK_TO_OFFICE;
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.BACK_TO_OFFICE;
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
                BackToOfficeAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(BackToOfficeAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    });
    describe('backToOfficeViewDidEnter', function () {
        it('should call setCurrentPage', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new backToOfficeActions.BackToOfficeViewDidEnter());
            // ASSERT
            effects.backToOfficeViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
        it('should call setCurrentPage with practice mode prefix', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new backToOfficeActions.BackToOfficeViewDidEnter());
            // ASSERT
            effects.backToOfficeViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenNamePracticeMode);
                done();
            });
        });
    });
    describe('deferWriteUpEffect', function () {
        it('should call logEvent with pass page and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new backToOfficeActions.DeferWriteUp());
            // ASSERT
            effects.deferWriteUpEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.BACK_TO_OFFICE, AnalyticsEvents.DEFER_WRITE_UP, 'pass');
                done();
            });
        });
        it('should call logEvent with fail page and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new backToOfficeActions.DeferWriteUp());
            // ASSERT
            effects.deferWriteUpEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.BACK_TO_OFFICE, AnalyticsEvents.DEFER_WRITE_UP, 'fail');
                done();
            });
        });
        it('should call logEvent with pass page, practice mode prefix and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new backToOfficeActions.DeferWriteUp());
            // ASSERT
            effects.deferWriteUpEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsEventCategories.BACK_TO_OFFICE, AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsEvents.DEFER_WRITE_UP, 'pass');
                done();
            });
        });
        it('should call logEvent with fail page, practice mode prefix and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
            store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
            // ACT
            actions$.next(new backToOfficeActions.DeferWriteUp());
            // ASSERT
            effects.deferWriteUpEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
                expect(analyticsProviderMock.addCustomDimension)
                    .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsEventCategories.BACK_TO_OFFICE, AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsEvents.DEFER_WRITE_UP, 'fail');
                done();
            });
        });
    });
});
//# sourceMappingURL=back-to-office.analytics.effects.spec.js.map