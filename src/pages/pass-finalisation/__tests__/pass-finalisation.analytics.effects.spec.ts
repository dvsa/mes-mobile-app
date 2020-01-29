import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { async, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import {
  PassFinalisationValidationError,
  PassFinalisationViewDidEnter,
} from '../pass-finalisation.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import {
  Code78Present,
  Code78NotPresent,
} from '../../../modules/tests/pass-completion/cat-c';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
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
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { configureTestSuite } from 'ng-bullet';

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
      actions$.next(new PassFinalisationViewDidEnter());
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
      actions$.next(new PassFinalisationViewDidEnter());
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
      actions$.next(new PassFinalisationValidationError('error message'));
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
      actions$.next(new PassFinalisationValidationError('error message'));
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
      actions$.next(new Code78Present());
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
      actions$.next(new Code78NotPresent());
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
});
