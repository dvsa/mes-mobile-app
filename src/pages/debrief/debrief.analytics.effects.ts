import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  DEBRIEF_VIEW_DID_ENTER, DebriefViewDidEnter,
} from '../../pages/debrief/debrief.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTest, isPassed } from '../../modules/tests/tests.selector';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { TestsModel } from '../../modules/tests/tests.model';

@Injectable()
export class DebriefAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  debriefViewDidEnter$ = this.actions$.pipe(
    ofType(DEBRIEF_VIEW_DID_ENTER),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(isPassed),
        ),
      )),
    ),
    switchMap(([action, tests, isPassed]: [DebriefViewDidEnter, TestsModel, boolean]) => {
      const screenName = isPassed
        ? formatAnalyticsText(AnalyticsScreenNames.PASS_DEBRIEF, tests)
        : formatAnalyticsText(AnalyticsScreenNames.FAIL_DEBRIEF, tests);
      this.analytics.setCurrentPage(screenName);
      return of(new AnalyticRecorded());
    }),
  );
}
