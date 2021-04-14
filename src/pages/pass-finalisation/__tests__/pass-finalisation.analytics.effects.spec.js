import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { async, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as passFinalisationActions from '../pass-finalisation.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as passCompletionActions from '../../../modules/tests/pass-completion/pass-completion.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testSummaryActions from '../../../modules/tests/test-summary/common/test-summary.actions';
import * as vehicleDetailsActions from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import * as commsActions from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import { AnalyticsScreenNames, AnalyticsEventCategories, AnalyticsErrorTypes, AnalyticsEvents, } from '../../../providers/analytics/analytics.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../../providers/analytics/analytics.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { configureTestSuite } from 'ng-bullet';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { TransmissionType } from '../../../shared/models/transmission-type';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
describe('Pass Finalisation Analytics Effects', function () {
    var effects;
    var analyticsProviderMock;
    var actions$;
    var store$;
    var screenName = AnalyticsScreenNames.PASS_FINALISATION;
    // tslint:disable-next-line:max-line-length
    var screenNamePracticeMode = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.PASS_FINALISATION;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    tests: testsReducer,
                }),
            ],
            providers: [
                PassFinalisationAnalyticsEffects,
                { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
                provideMockActions(function () { return actions$; }),
                Store,
            ],
        });
    });
    beforeEach(async(function () {
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(PassFinalisationAnalyticsEffects);
        analyticsProviderMock = TestBed.get(AnalyticsProvider);
        store$ = TestBed.get(Store);
    }));
    describe('passFinalisationViewDidEnter', function () {
        it('should call setCurrentPage and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passFinalisationActions.PassFinalisationViewDidEnter());
            // ASSERT
            effects.passFinalisationViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenName);
                done();
            });
        });
        it('should call setCurrentPage with practice mode prefix and addCustomDimension', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passFinalisationActions.PassFinalisationViewDidEnter());
            // ASSERT
            effects.passFinalisationViewDidEnter$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.setCurrentPage)
                    .toHaveBeenCalledWith(screenNamePracticeMode);
                done();
            });
        });
    });
    describe('validationErrorEffect', function () {
        it('should call logError', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "B" /* B */));
            // ACT
            actions$.next(new passFinalisationActions.PassFinalisationValidationError('error message'));
            // ASSERT
            effects.validationErrorEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + AnalyticsScreenNames.PASS_FINALISATION + ")", 'error message');
                done();
            });
        });
        it('should call logError with pass, prefixed with practice mode', function (done) {
            // ARRANGE
            store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
            var practiceScreenName = AnalyticsEventCategories.PRACTICE_MODE + " - " + AnalyticsScreenNames.PASS_FINALISATION;
            // ACT
            actions$.next(new passFinalisationActions.PassFinalisationValidationError('error message'));
            // ASSERT
            effects.validationErrorEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logError)
                    .toHaveBeenCalledWith(AnalyticsErrorTypes.VALIDATION_ERROR + " (" + practiceScreenName + ")", 'error message');
                done();
            });
        });
    });
    describe('code78PresentEffect', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passCompletionActions.Code78Present());
            // ASSERT
            effects.code78PresentEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.TOGGLE_CODE_78, 'Yes');
                done();
            });
        });
    });
    describe('code78NotPresentEffect', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passCompletionActions.Code78NotPresent());
            // ASSERT
            effects.code78NotPresentEffect$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.TOGGLE_CODE_78, 'No');
                done();
            });
        });
    });
    describe('provisionalLicenseNotReceived', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passCompletionActions.ProvisionalLicenseNotReceived());
            // ASSERT
            effects.provisionalLicenseNotReceived$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, 'No');
                done();
            });
        });
    });
    describe('provisionalLicenseReceived', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new passCompletionActions.ProvisionalLicenseReceived());
            // ASSERT
            effects.provisionalLicenseReceived$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.TOGGLE_LICENSE_RECEIVED, 'Yes');
                done();
            });
        });
    });
    describe('transmissionChanged', function () {
        it('should call logEvent with Manual if Gearbox Category is Manual', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
            // ACT
            actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Manual));
            // ASSERT
            effects.transmissionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.GEARBOX_CATEGORY_CHANGED, TransmissionType.Manual);
                done();
            });
        });
        it('should call logEvent with Automatic if Gearbox Category is Automatic', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
            // ACT
            actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Automatic));
            // ASSERT
            effects.transmissionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.GEARBOX_CATEGORY_CHANGED, TransmissionType.Automatic);
                done();
            });
        });
        it('should not call logEvent if there is no activity code', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Manual));
            // ASSERT
            effects.transmissionChanged$.subscribe(function (result) {
                expect(result instanceof AnalyticNotRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
                done();
            });
        });
    });
    describe('d255Yes', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new testSummaryActions.D255Yes());
            // ASSERT
            effects.d255Yes$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.D255, 'Yes');
                done();
            });
        });
    });
    describe('d255No', function () {
        it('should call logEvent', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new testSummaryActions.D255No());
            // ASSERT
            effects.d255No$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.D255, 'No');
                done();
            });
        });
    });
    describe('candidateChoseToProceedWithTestInEnglish$', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
            // ACT
            actions$.next(new commsActions.CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
            // ASSERT
            effects.candidateChoseToProccedWithTestInEnglish$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.LANGUAGE_CHANGED, Language.ENGLISH);
                done();
            });
        });
        it('should not call logEvent if there is no activity code', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new commsActions.CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
            // ASSERT
            effects.candidateChoseToProccedWithTestInEnglish$.subscribe(function (result) {
                expect(result instanceof AnalyticNotRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
                done();
            });
        });
    });
    describe('candidateChoseToProceedWithTestInWelsh$', function () {
        it('should call logEvent with the correct parameters', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
            // ACT
            actions$.next(new commsActions.CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
            // ASSERT
            effects.candidateChoseToProccedWithTestInWelsh$.subscribe(function (result) {
                expect(result instanceof AnalyticRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent)
                    .toHaveBeenCalledWith(AnalyticsEventCategories.POST_TEST, AnalyticsEvents.LANGUAGE_CHANGED, Language.CYMRAEG);
                done();
            });
        });
        it('should not call logEvent if there is no activity code', function (done) {
            // ARRANGE
            store$.dispatch(new testsActions.StartTest(123, "C" /* C */));
            store$.dispatch(new PopulateCandidateDetails(candidateMock));
            // ACT
            actions$.next(new commsActions.CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
            // ASSERT
            effects.candidateChoseToProccedWithTestInWelsh$.subscribe(function (result) {
                expect(result instanceof AnalyticNotRecorded).toBe(true);
                expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
                done();
            });
        });
    });
});
//# sourceMappingURL=pass-finalisation.analytics.effects.spec.js.map