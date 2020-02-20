import { of } from 'rxjs/observable/of';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  VEHICLE_CHECKS_VIEW_DID_ENTER, VehicleChecksViewDidEnter,
} from './vehicle-checks-modal.cat-a-mod2.actions';
import { concatMap, switchMap, withLatestFrom } from 'rxjs/operators';
import {
  AnalyticsEventCategories,
  AnalyticsScreenNames,
} from '../../../../../providers/analytics/analytics.model';
import { AnalyticRecorded } from '../../../../../providers/analytics/analytics.actions';
import { AnalyticsProvider } from '../../../../../providers/analytics/analytics';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreModel } from '../../../../../shared/models/store.model';
import { getTests } from '../../../../../modules/tests/tests.reducer';
import { TestsModel } from '../../../../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../../../../shared/helpers/format-analytics-text';
import {
  SAFETY_QUESTION_OUTCOME_CHANGED,
  SAFETY_QUESTION_SELECTED,
  SafetyQuestionOutcomeChanged,
  SafetyQuestionSelected,
  BALANCE_QUESTION_OUTCOME_CHANGED,
  BALANCE_QUESTION_SELECTED,
  BalanceQuestionOutcomeChanged,
  BalanceQuestionSelected,
} from '../../../../../modules/tests/test-data/cat-a-mod2/safety-and-balance/safety-and-balance.cat-a-mod2.actions';

@Injectable()
export class VehicleChecksModalCatAMod2AnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  vehicleChecksModalViewDidEnter$ = this.actions$.pipe(
    ofType(VEHICLE_CHECKS_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [VehicleChecksViewDidEnter, TestsModel]) => {
      this.analytics.setCurrentPage(
        formatAnalyticsText(AnalyticsScreenNames.VEHICLE_CHECKS, tests),
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  safetyQuestionChanged$ = this.actions$.pipe(
    ofType(SAFETY_QUESTION_SELECTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [SafetyQuestionSelected, TestsModel]) => {
      const eventText = `safety question ${action.index + 1} changed`;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        action.safetyQuestion.code,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  safetyQuestionOutcomeChanged$ = this.actions$.pipe(
    ofType(SAFETY_QUESTION_OUTCOME_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [SafetyQuestionOutcomeChanged, TestsModel]) => {
      const eventText = `safety question ${action.index + 1} outcome changed`;
      const outComeText = action.safetyQuestionOutcome === 'P' ? 'correct' : 'driving fault';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        outComeText,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  balanceQuestionChanged$ = this.actions$.pipe(
    ofType(BALANCE_QUESTION_SELECTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [BalanceQuestionSelected, TestsModel]) => {
      const eventText = `balance question ${action.index + 1} changed`;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        action.balanceQuestion.code,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  balanceQuestionOutcomeChanged$ = this.actions$.pipe(
    ofType(BALANCE_QUESTION_OUTCOME_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [BalanceQuestionOutcomeChanged, TestsModel]) => {
      const eventText = `balance question ${action.index + 1} outcome changed`;
      const outComeText = action.balanceQuestionOutcome === 'P' ? 'correct' : 'driving fault';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        outComeText,
      );
      return of(new AnalyticRecorded());
    }),
  );
}
