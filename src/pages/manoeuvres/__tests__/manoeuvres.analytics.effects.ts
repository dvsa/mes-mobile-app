import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { StoreModule, Store } from '@ngrx/store';
import { configureTestSuite } from 'ng-bullet';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { Application } from '@dvsa/mes-journal-schema';

import * as manoeuvresActions from '../manoeuvres.actions';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
import {
  AnalyticsDimensionIndices,
  AnalyticsScreenNames,
  AnalyticsErrorTypes,
} from '../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { StoreModel } from '../../../shared/models/store.model';
import * as testsActions from '../../../modules/tests/tests.actions';
import { testsReducer } from '../../../modules/tests/tests.reducer';
import { PopulateCandidateDetails } from '../../../modules/tests/journal-data/common/candidate/candidate.actions';
import * as applicationReferenceActions
  from '../../../modules/tests/journal-data/common/application-reference/application-reference.actions';
import { candidateMock } from '../../../modules/tests/__mocks__/tests.mock';
import { PopulateTestCategory } from '../../../modules/tests/category/category.actions';
import { ManoeuvresPageAnalyticsEffects } from '../manoeuvres.analytics.effects';

describe('ManoeuvresPageAnalyticsEffects', () => {
  let effects: ManoeuvresPageAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: ReplaySubject<{}>;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.MANOEUVRES;
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
        ManoeuvresPageAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
  });

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(ManoeuvresPageAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('manoeuvresPageViewDidEnter$', () => {
    it('should call setCurrentPage and addCustomDimension', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.CM));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new applicationReferenceActions.PopulateApplicationReference(mockApplication));
      store$.dispatch(new PopulateTestCategory(TestCategory.CM));
      // ACT
      actions$.next(new manoeuvresActions.ManoeuvresViewDidEnter());
      // ASSERT
      effects.manoeuvresPageViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'CM');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.CANDIDATE_ID, '1');
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '123456789');
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });
  describe('manoeuvresPageValidationError$', () => {
    it('should call logError', (done) => {
      // ARRANGE
      store$.dispatch(new testsActions.StartTest(123, TestCategory.CM));
      store$.dispatch(new PopulateCandidateDetails(candidateMock));
      store$.dispatch(new PopulateTestCategory(TestCategory.CM));
      // ACT
      actions$.next(new manoeuvresActions.ManoeuvresPageValidationError('formControl1'));
      // ASSERT
      effects.manoeuvresPageValidationError$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.addCustomDimension)
          .toHaveBeenCalledWith(AnalyticsDimensionIndices.TEST_CATEGORY, 'CM');
        expect(analyticsProviderMock.logError)
          .toHaveBeenCalledWith(`${AnalyticsErrorTypes.VALIDATION_ERROR} (${screenName})`, 'formControl1');
        done();
      });
    });
  });
});
