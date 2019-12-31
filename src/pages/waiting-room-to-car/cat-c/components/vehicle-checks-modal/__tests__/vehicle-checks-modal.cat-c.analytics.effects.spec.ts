import { TestBed } from '@angular/core/testing';
import { VehicleChecksModalCatCAnalyticsEffects } from '../vehicle-checks-modal.cat-c.analytics.effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreModel } from '../../../../../../shared/models/store.model';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { testsReducer } from '../../../../../../modules/tests/tests.reducer';
import { AnalyticsProvider } from '../../../../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../../../../providers/analytics/__mocks__/analytics.mock';
import { provideMockActions } from '@ngrx/effects/testing';
import * as testsActions from '../../../../../../modules/tests/tests.actions';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { VehicleChecksViewDidEnter } from '../vehicle-checks-modal.cat-c.actions';
import { AnalyticRecorded } from '../../../../../../providers/analytics/analytics.actions';
import { AnalyticsEventCategories, AnalyticsScreenNames } from '../../../../../../providers/analytics/analytics.model';

// TODO: MES-4254 import cat c actions
import * as VehicleChecksActions
  from '../../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';

import {
  QuestionOutcome,
  QuestionResult,
} from '@dvsa/mes-test-schema/categories/common';

describe('Vehicle Checks Modal Cat C Analytics Effects', () => {

  let effects: VehicleChecksModalCatCAnalyticsEffects;
  let analyticsProviderMock;
  let actions$: any;
  let store$: Store<StoreModel>;
  const screenName = AnalyticsScreenNames.VEHICLE_CHECKS;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          tests: testsReducer,
        }),
      ],
      providers: [
        VehicleChecksModalCatCAnalyticsEffects,
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        provideMockActions(() => actions$),
        Store,
      ],
    });
    effects = TestBed.get(VehicleChecksModalCatCAnalyticsEffects);
    analyticsProviderMock = TestBed.get(AnalyticsProvider);
    store$ = TestBed.get(Store);
  });

  describe('vehicleChecksModalViewDidEnter$ effect', () => {
    it('should call analytics.setCurrentPage', (done) => {

      // TODO: MES-4254 Use category C
      store$.dispatch(new testsActions.StartTest(12345, TestCategory.BE));
      actions$.next(new VehicleChecksViewDidEnter());
      effects.vehicleChecksModalViewDidEnter$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.setCurrentPage).toHaveBeenCalledWith(screenName);
        done();
      });
    });
  });

  describe('showMeQuestionChanged$ effect', () => {
    const questionNumber: number = 1;
    const showMeQuestion: QuestionResult = {
      code: 'S01',
    };
    it('should log an analyics event with show me question info', (done) => {

      // TODO: MES-4254 Use Category C
      store$.dispatch(new testsActions.StartTest(12345, TestCategory.BE));
      actions$.next(new VehicleChecksActions.ShowMeQuestionSelected(showMeQuestion, questionNumber));
      effects.showMeQuestionChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.VEHICLE_CHECKS,
          `show me question ${questionNumber + 1} changed`,
          showMeQuestion.code,
          );
        done();
      });
    });
  });

  describe('showMeQuestionOutComeChanged$', () => {
    const questionOutcome: QuestionOutcome = 'P';
    const questionNumber: number = 1;
    it('should log an analytics event with show me question outcome info', (done) => {

      // TODO: MES-4254 Use Category C
      store$.dispatch(new testsActions.StartTest(12345, TestCategory.BE));
      actions$.next(new VehicleChecksActions.ShowMeQuestionOutcomeChanged(questionOutcome, questionNumber));
      effects.showMeQuestionOutComeChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.VEHICLE_CHECKS,
          `show me question ${questionNumber + 1} outcome changed`,
          'correct',
        );
        done();
      });
    });
  });

  describe('tellMeQuestionChanged$ effect', () => {
    const questionNumber: number = 1;
    const tellMeQuestion: QuestionResult = {
      code: 'T01',
    };
    it('should log an analyics event with tell me question info', (done) => {

      // TODO: MES-4254 Use Category C
      store$.dispatch(new testsActions.StartTest(12345, TestCategory.BE));
      actions$.next(new VehicleChecksActions.TellMeQuestionSelected(tellMeQuestion, questionNumber));
      effects.tellMeQuestionChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.VEHICLE_CHECKS,
          `tell me question ${questionNumber + 1} changed`,
          tellMeQuestion.code,
        );
        done();
      });
    });
  });

  describe('tellMeQuestionOutComeChanged$', () => {
    const questionOutcome: QuestionOutcome = 'DF';
    const questionNumber: number = 1;
    it('should log an analytics event with tell me question outcome info', (done) => {

      // TODO: MES-4254 Use Category C
      store$.dispatch(new testsActions.StartTest(12345, TestCategory.BE));
      actions$.next(new VehicleChecksActions.TellMeQuestionOutcomeChanged(questionOutcome, questionNumber));
      effects.tellMeQuestionOutComeChanged$.subscribe((result) => {
        expect(result instanceof AnalyticRecorded).toBe(true);
        expect(analyticsProviderMock.logEvent).toHaveBeenCalledWith(
          AnalyticsEventCategories.VEHICLE_CHECKS,
          `tell me question ${questionNumber + 1} outcome changed`,
          'driving fault',
        );
        done();
      });
    });
  });

});
