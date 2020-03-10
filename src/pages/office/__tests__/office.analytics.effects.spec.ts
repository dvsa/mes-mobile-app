import { OfficeAnalyticsEffects } from '../office.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as officeActions from '../office.actions';
import * as catAMod1TestSummaryActions
  from '../../../modules/tests/test-summary/cat-a-mod1/test-summary.cat-a-mod1.actions';
import * as catAMod2TestSummaryActions
  from '../../../modules/tests/test-summary/cat-a-mod2/test-summary.cat-a-mod2.actions';
import * as testSummaryActions
  from '../../../modules/tests/test-summary/common/test-summary.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { Application } from '@dvsa/mes-journal-schema';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { ActivityCodes } from '../../../shared/models/activity-codes';
import * as rekeyActions from '../../../modules/tests/rekey/rekey.actions';
import * as applicationReferenceActions
  from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import * as activityCodeActions from '../../../modules/tests/activity-code/activity-code.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';
import { CircuitType } from '../../../shared/models/circuit-type';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';

describe('Office Analytics Effects', () => {

  let effects: OfficeAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenNamePass = AnalyticsScreenNames.PASS_TEST_SUMMARY;
  const screenNameFail = AnalyticsScreenNames.FAIL_TEST_SUMMARY;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeModePass = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.PASS_TEST_SUMMARY}`;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeModeFail = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.FAIL_TEST_SUMMARY}`;
  const mockApplication: Application = {
    applicationId: 123456,
    bookingSequence: 78,
    checkDigit: 9,
  };

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        OfficeAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(OfficeAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('officeViewDidEnter', () => {
    it('should call setCurrentPage with pass page and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.OfficeViewDidEnter());
      // ASSERT
      effects.officeViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePass);
        done();
      });
    });
    it('should call setCurrentPage with fail page and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.OfficeViewDidEnter());
      // ASSERT
      effects.officeViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNameFail);
        done();
      });
    });
    it('should call setCurrentPage with pass page, practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.OfficeViewDidEnter());
      // ASSERT
      effects.officeViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeModePass);
        done();
      });
    });
    it('should call setCurrentPage with fail page, practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.OfficeViewDidEnter());
      // ASSERT
      effects.officeViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage)
          .toHaveBeenCalledWith(screenNamePracticeModeFail);
        done();
      });
    });

  });

  describe('savingWriteUpForLaterEffect', () => {
    it('should call logEvent with pass page and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.SavingWriteUpForLater());
      // ASSERT
      effects.savingWriteUpForLaterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.SAVE_WRITE_UP,
            'pass',
          );
        done();
      });
    });
    it('should call logEvent with fail page and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.SavingWriteUpForLater());
      // ASSERT
      effects.savingWriteUpForLaterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.SAVE_WRITE_UP,
            'fail',
          );
        done();
      });
    });
    it('should call logEvent with pass page, practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.SavingWriteUpForLater());
      // ASSERT
      effects.savingWriteUpForLaterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsEventCategories.POST_TEST}`,
            `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsEvents.SAVE_WRITE_UP}`,
            'pass',
          );
        done();
      });
    });
    it('should call logEvent with fail page, practice mode prefix and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.SavingWriteUpForLater());
      // ASSERT
      effects.savingWriteUpForLaterEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsEventCategories.POST_TEST}`,
            `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsEvents.SAVE_WRITE_UP}`,
            'fail',
          );
        done();
      });
    });
  });

  describe('validationErrorEffect', () => {
    it('should call logError with pass', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new officeActions.OfficeValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePass})`,
          'error message');
        done();
      });
    });
    it('should call logError with fail', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      // ACT
      actions$.next(new officeActions.OfficeValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNameFail})`,
          'error message');
        done();
      });
    });
    it('should call logError with pass, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      // ACT
      actions$.next(new officeActions.OfficeValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeModePass})`,
          'error message');
        done();
      });
    });
    it('should call logError with fail, prefixed with practice mode', (done) => {
      // ARRANGE
      store$.dispatch(new fakeJournalActions.StartE2EPracticeTest(end2endPracticeSlotId));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.FAIL));
      // ACT
      actions$.next(new officeActions.OfficeValidationError('error message'));
      // ASSERT
      effects.validationErrorEffect$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenNamePracticeModeFail})`,
          'error message');
        done();
      });
    });
  });

  describe('completeTest', () => {
    it('should log an event COMPLETE_TEST event when the test is not a rekey', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.CompleteTest());
      // ASSERT
      effects.completeTest$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.COMPLETE_TEST,
            'pass',
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        done();
      });
    });
    it('should log an event COMPLETE_REKEY_TEST event when the test is a rekey', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.B));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new rekeyActions.MarkAsRekey());
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new officeActions.CompleteTest());
      // ASSERT
      effects.completeTest$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.POST_TEST,
            AnalyticsEvents.COMPLETE_REKEY_TEST,
            'pass',
          );
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        done();
      });
    });
  });

  describe('circuitChanged', () => {
    it('should log a CIRCUIT_TYPE_CHANGED event', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.EUAM1));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new catAMod1TestSummaryActions.CircuitTypeChanged(CircuitType.Left));
      // ASSERT
      effects.setCircuit$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.OFFICE,
            AnalyticsEvents.CIRCUIT_CHANGED,
            `Circuit type ${CircuitType.Left} selected`,
          );
        done();
      });
    });
  });

  describe('independentDrivingTypeChanged', () => {
    it('should log a INDEPENDENT_DRIVING_TYPE_CHANGED event', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.EUAM2));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM2));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new testSummaryActions.IndependentDrivingTypeChanged('Sat nav'));
      // ASSERT
      effects.setIndependentDrivingType$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.OFFICE,
            AnalyticsEvents.INDEPENDENT_DRIVING_TYPE_CHANGED,
            `Sat nav selected`,
          );
        done();
      });
    });
  });

  describe('modeOfTransportChanged', () => {
    it('should log a MODE_OF_TRANSPORT_CHANGED event', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.EUAM2));
      store$.dispatch(new PopulateTestCategory(TestCategory.EUAM2));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new activityCodeActions.SetActivityCode(ActivityCodes.PASS));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      // ACT
      actions$.next(new catAMod2TestSummaryActions.ModeOfTransportChanged('Car to bike'));
      // ASSERT
      effects.setModeOfTransport$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent)
          .toHaveBeenCalledWith(
            AnalyticsEventCategories.OFFICE,
            AnalyticsEvents.MODE_OF_TRANSPORT_CHANGED,
            `Car to bike selected`,
          );
        done();
      });
    });
  });
});
