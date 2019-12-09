import { Injectable } from '@angular/core';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import * as nonPassFinalisationActions from './non-pass-finalisation.actions';
import { of } from 'rxjs/observable/of';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { getTests } from '../../modules/tests/tests.reducer';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticsScreenNames, AnalyticsErrorTypes } from '../../providers/analytics/analytics.model';
import { switchMap, concatMap } from 'rxjs/operators';

@Injectable()
export class NonPassFinalisationAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  nonPassFinalisationViewDidEnterEffect$ = this.actions$.pipe(
    ofType(nonPassFinalisationActions.NON_PASS_FINALISATION_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [nonPassFinalisationActions.NonPassFinalisationViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.NON_PASS_FINALISATION, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  validationErrorEffect$ = this.actions$.pipe(
    ofType(nonPassFinalisationActions.NON_PASS_FINALISATION_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      )),
    ),
    switchMap(([action, tests]: [nonPassFinalisationActions.NonPassFinalisationValidationError, TestsModel]) => {
      const formattedScreenName = formatAnalyticsText(AnalyticsScreenNames.NON_PASS_FINALISATION, tests);
      this.analytics.logError(
        `${AnalyticsErrorTypes.VALIDATION_ERROR} (${formattedScreenName})`,
        action.errorMessage,
      );
      return of(new AnalyticRecorded());
    }),
  );

}
