import { of } from 'rxjs/observable/of';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  VEHICLE_CHECKS_VIEW_DID_ENTER, VehicleChecksViewDidEnter,
} from './vehicle-checks-modal.cat-c.actions';
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

// TODO: MES-4254 Import Category C actions
import {
  SHOW_ME_QUESTION_OUTCOME_CHANGED,
  SHOW_ME_QUESTION_SELECTED,
  ShowMeQuestionOutcomeChanged,
  ShowMeQuestionSelected,
  TELL_ME_QUESTION_OUTCOME_CHANGED,
  TELL_ME_QUESTION_SELECTED,
  TellMeQuestionOutcomeChanged,
  TellMeQuestionSelected,
} from '../../../../../modules/tests/test-data/cat-be/vehicle-checks/vehicle-checks.cat-be.action';

@Injectable()
export class VehicleChecksModalCatCAnalyticsEffects {

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
  showMeQuestionChanged$ = this.actions$.pipe(
    ofType(SHOW_ME_QUESTION_SELECTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [ShowMeQuestionSelected, TestsModel]) => {
      const eventText = `show me question ${action.index + 1} changed`;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        action.showMeQuestion.code,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  showMeQuestionOutComeChanged$ = this.actions$.pipe(
    ofType(SHOW_ME_QUESTION_OUTCOME_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [ShowMeQuestionOutcomeChanged, TestsModel]) => {
      const eventText = `show me question ${action.index + 1} outcome changed`;
      const outComeText = action.showMeQuestionOutcome === 'P' ? 'correct' : 'driving fault';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        outComeText,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  tellMeQuestionChanged$ = this.actions$.pipe(
    ofType(TELL_ME_QUESTION_SELECTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [TellMeQuestionSelected, TestsModel]) => {
      const eventText = `tell me question ${action.index + 1} changed`;
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        action.tellMeQuestion.code,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  tellMeQuestionOutComeChanged$ = this.actions$.pipe(
    ofType(TELL_ME_QUESTION_OUTCOME_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [TellMeQuestionOutcomeChanged, TestsModel]) => {
      const eventText = `tell me question ${action.index + 1} outcome changed`;
      const outComeText = action.tellMeQuestionOutcome === 'P' ? 'correct' : 'driving fault';
      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.VEHICLE_CHECKS, tests),
        eventText,
        outComeText,
      );
      return of(new AnalyticRecorded());
    }),
  );
}
