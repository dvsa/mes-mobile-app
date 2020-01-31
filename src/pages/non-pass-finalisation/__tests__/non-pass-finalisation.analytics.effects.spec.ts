import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsErrorTypes,
  AnalyticsEvents,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../shared/models/store.model';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as vehicleDetailsActions from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import * as testSummaryActions from '../../../modules/tests/test-summary/test-summary.actions';
import * as commsActions from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { NonPassFinalisationAnalyticsEffects } from '../non-pass-finalisation.analytics.effects';
import * as nonPassFinalisationActions from '../non-pass-finalisation.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { TransmissionType } from '../../../shared/models/transmission-type';

describe('Non Pass Finalisation Analytics Effects', () => {

  let effects: NonPassFinalisationAnalyticsEffects;
  let analyticsProviderMock: any;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.NON_PASS_FINALISATION;
  const practiceScreenName =
    `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.NON_PASS_FINALISATION}`;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        NonPassFinalisationAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(NonPassFinalisationAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('nonPassFinalisationViewDidEnter', () => {
    it('should call setCurrentPage', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new nonPassFinalisationActions.NonPassFinalisationViewDidEnter());
      // ASSERT
      effects.nonPassFinalisationViewDidEnterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new nonPassFinalisationActions.NonPassFinalisationViewDidEnter());
      // ASSERT
      effects.nonPassFinalisationViewDidEnterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(practiceScreenName);
        done();
      });
    });
  });

  describe('validationErrorEffect', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      // ACT
      actions$.next(new nonPassFinalisationActions.NonPassFinalisationValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(
            `${AnalyticsErrorTypes.VALIDATION_ERROR} (${AnalyticsScreenNames.NON_PASS_FINALISATION})`,
            'error message');
        done();
      });
    });

    it('should call logError with pass, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      const practiceScreenName =
        `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.NON_PASS_FINALISATION}`;
      // ACT
      actions$.next(new nonPassFinalisationActions.NonPassFinalisationValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${practiceScreenName})`,
            'error message');
        done();
      });
    });
  });
  describe('transmissionChanged', () => {
    it('should call logEvent with Manual if Gearbox Category is Manual', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Manual));
      // ASSERT
      effects.transmissionChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.GEARBOX_CATEGORY_CHANGED,
            TransmissionType.Manual,
          );
        done();
      });
    });
    it('should call logEvent with Automatic if Gearbox Category is Automatic', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Automatic));
      // ASSERT
      effects.transmissionChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.GEARBOX_CATEGORY_CHANGED,
            TransmissionType.Automatic,
          );
        done();
      });
    });
    it('should not call logEvent if there is no activity code', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new vehicleDetailsActions.GearboxCategoryChanged(TransmissionType.Manual));
      // ASSERT
      effects.transmissionChanged$.subscribe((result) => {
        expect(result instanceof AnalyticNotRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('d255Yes', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new testSummaryActions.D255Yes());
      // ASSERT
      effects.d255Yes$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.D255,
            'Yes',
          );
        done();
      });
    });
  });
  describe('d255No', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new testSummaryActions.D255No());
      // ASSERT
      effects.d255No$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.D255,
            'No',
          );
        done();
      });
    });
  });
  describe('candidateChoseToProceedWithTestInEnglish$', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new commsActions.CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
      // ASSERT
      effects.candidateChoseToProccedWithTestInEnglish$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.LANGUAGE_CHANGED,
            Language.ENGLISH,
          );
        done();
      });
    });
    it('should not call logEvent if there is no activity code', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new commsActions.CandidateChoseToProceedWithTestInEnglish(Language.ENGLISH));
      // ASSERT
      effects.candidateChoseToProccedWithTestInEnglish$.subscribe((result) => {
        expect(result instanceof AnalyticNotRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
        done();
      });
    });
  });
  describe('candidateChoseToProceedWithTestInWelsh$', () => {
    it('should call logEvent with the correct parameters', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new commsActions.CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
      // ASSERT
      effects.candidateChoseToProccedWithTestInWelsh$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.LANGUAGE_CHANGED,
            Language.CYMRAEG,
          );
        done();
      });
    });
    it('should not call logEvent if there is no activity code', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new commsActions.CandidateChoseToProceedWithTestInWelsh(Language.CYMRAEG));
      // ASSERT
      effects.candidateChoseToProccedWithTestInWelsh$.subscribe((result) => {
        expect(result instanceof AnalyticNotRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).not.toHaveBeenCalled();
        done();
      });
    });
  });

});
