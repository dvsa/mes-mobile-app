import { Injectable } from '@angular/core';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { POST_DEBRIEF_HOLDING_VIEW_DID_ENTER, PostDebriefHoldingViewDidEnter } from './post-debrief-holding.actions';
import { concatMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { getTests } from '../../modules/tests/tests.reducer';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticsScreenNames } from '../../providers/analytics/analytics.model';

@Injectable()
export class PostDebriefHoldingAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  postDebriefHoldingViewDidEnterEffect$ = this.actions$.pipe(
    ofType(POST_DEBRIEF_HOLDING_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [PostDebriefHoldingViewDidEnter, TestsModel]) => {
      const screenName = formatAnalyticsText(AnalyticsScreenNames.POST_DEBRIEF_HOLDING, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );

}
