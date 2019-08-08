import { Injectable } from '@angular/core';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../../shared/models/store.model';
import { NON_PASS_FINALISATION_VIEW_DID_ENTER, NonPassFinalisationViewDidEnter } from './non-pass-finalisation.actions';
import { concatMap } from 'rxjs/operators/concatMap';
import { of } from 'rxjs/observable/of';
import { withLatestFrom } from 'rxjs/operators/withLatestFrom';
import { getTests } from '../../../modules/tests/tests.reducer';
import { AnalyticRecorded } from '../../../providers/analytics/analytics.actions';
import { TestsModel } from '../../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../../shared/helpers/format-analytics-text';
import { AnalyticsScreenNames } from '../../../providers/analytics/analytics.model';

@Injectable()
export class NonPassFinalisationAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  nonPassFinalisationViewDidEnterEffect$ = this.actions$.pipe(
    ofType(NON_PASS_FINALISATION_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [NonPassFinalisationViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.NON_PASS_FINALISATION, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );

}
