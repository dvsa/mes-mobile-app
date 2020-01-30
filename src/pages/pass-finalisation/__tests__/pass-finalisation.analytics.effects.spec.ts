import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { async, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as passFinalisationActions from '../pass-finalisation.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as passCompletionActions from '../../../modules/tests/pass-completion/pass-completion.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testSummaryActions from '../../../modules/tests/test-summary/test-summary.actions';
import * as vehicleDetailsActions from '../../../modules/tests/vehicle-details/common/vehicle-details.actions';
import * as commsActions from '../../../modules/tests/communication-preferences/communication-preferences.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsErrorTypes,
  AnalyticsEvents,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { AnalyticRecorded, AnalyticNotRecorded } from '../../../providers/analytics/analytics.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { SetActivityCode } from '../../../modules/tests/activity-code/activity-code.actions';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import { TransmissionType } from '../../../shared/models/transmission-type';
import { Language } from '../../../modules/tests/communication-preferences/communication-preferences.model';

describe('Pass Finalisation Analytics Effects', () => {

  let effects: PassFinalisationAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.PASS_FINALISATION;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.PASS_FINALISATION}`;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        PassFinalisationAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
  });

  beforeEach(async(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(PassFinalisationAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  }));

  describe('passFinalisationViewDidEnter', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passFinalisationActions.PassFinalisationViewDidEnter());
      // ASSERT
      effects.passFinalisationViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenName);
        done();
      });
    });
    it('should call setCurrentPage with practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passFinalisationActions.PassFinalisationViewDidEnter());
      // ASSERT
      effects.passFinalisationViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeMode);
        done();
      });
    });

  });

  describe('validationErrorEffect', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      // ACT
      actions$.next(new passFinalisationActions.PassFinalisationValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${AnalyticsScreenNames.PASS_FINALISATION})`,
            'error message');
        done();
      });
    });

    it('should call logError with pass, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      const practiceScreenName =
        `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.PASS_FINALISATION}`;
      // ACT
      actions$.next(new passFinalisationActions.PassFinalisationValidationError('error message'));
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
  describe('code78PresentEffect', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passCompletionActions.Code78Present());
      // ASSERT
      effects.code78PresentEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.TOGGLE_CODE_78,
            'Yes',
          );
        done();
      });
    });
  });
  describe('code78NotPresentEffect', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passCompletionActions.Code78NotPresent());
      // ASSERT
      effects.code78NotPresentEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.TOGGLE_CODE_78,
            'No',
          );
        done();
      });
    });
  });
  describe('provisionalLicenseNotReceived', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passCompletionActions.ProvisionalLicenseNotReceived());
      // ASSERT
      effects.provisionalLicenseNotReceived$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.TOGGLE_LICENSE_RECEIVED,
            'No',
          );
        done();
      });
    });
  });
  describe('provisionalLicenseReceived', () => {
    it('should call logEvent', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.C));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      // ACT
      actions$.next(new passCompletionActions.ProvisionalLicenseReceived());
      // ASSERT
      effects.provisionalLicenseReceived$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.TOGGLE_LICENSE_RECEIVED,
            'Yes',
          );
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
    it('should call not call logEvent if there is no activity code', (done) => {
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
    it('should call not call logEvent if there is no activity code', (done) => {
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
    it('should call not call logEvent if there is no activity code', (done) => {
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
