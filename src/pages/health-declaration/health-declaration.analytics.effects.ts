import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, concatMap, withLatestFrom } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames, AnalyticsErrorTypes,
} from '../../providers/analytics/analytics.model';
import * as healthDeclarationActions from './health-declaration.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { TestsModel } from '../../modules/tests/tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';

@Injectable()
export class HealthDeclarationAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  healthDeclarationViewDidEnter$ = this.actions$.pipe(
    ofType(healthDeclarationActions.HEALTH_DECLARATION_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [healthDeclarationActions.HealthDeclarationViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.HEALTH_DECLARATION, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  validationErrorEffect$ = this.actions$.pipe(
    ofType(healthDeclarationActions.HEALTH_DECLARATION_VALIDATION_ERROR),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      )),
    ),
    switchMap(([action, tests]: [healthDeclarationActions.HealthDeclarationValidationError, TestsModel]) => {
      const formattedScreenName = formatAnalyticsText(AnalyticsScreenNames.HEALTH_DECLARATION, tests);
      this.analytics.logError(
        `${AnalyticsErrorTypes.VALIDATION_ERROR} (${formattedScreenName})`,
        action.errorMessage,
      );
      return of(new AnalyticRecorded());
    }),
  );

}
