import { PassFinalisationAnalyticsEffects } from '../pass-finalisation.analytics.effects';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as passFinalisationActions from '../pass-finalisation.actions';
import * as testsActions from '../../../modules/tests/tests.actions';
import * as fakeJournalActions from '../../fake-journal/fake-journal.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';
import { StoreModel } from '../../../shared/models/store.model';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/candidate/candidate.actions';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { TestCategory } from '@dvsa/mes-test-schema/categories/common/test-category';

describe('Pass Finalisation Analytics Effects', () => {

  let effects: PassFinalisationAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.PASS_FINALISATION;
  // tslint:disable-next-line:max-line-length
  const screenNamePracticeMode = `${AnalyticsEventCategories.PRACTICE_MODE} - ${AnalyticsScreenNames.PASS_FINALISATION}`;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
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
    effects = TestBed.get(PassFinalisationAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

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

});
