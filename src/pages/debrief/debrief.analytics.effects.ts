import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap, withLatestFrom } from 'rxjs/operators';
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

@Injectable()
export class DebriefAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  debriefViewDidEnter$ = this.actions$.pipe(
    ofType(DEBRIEF_VIEW_DID_ENTER),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(isPassed),
      ),
    ),
    switchMap(([action, isPassed]: [DebriefViewDidEnter, boolean]) => {
      if (isPassed) {
        this.analytics.setCurrentPage(AnalyticsScreenNames.PASS_DEBRIEF);
      } else {
        this.analytics.setCurrentPage(AnalyticsScreenNames.FAIL_DEBRIEF);
      }
      return of();
    }),
  );

}
