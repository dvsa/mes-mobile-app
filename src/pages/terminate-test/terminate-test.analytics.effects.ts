import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  TERMINATE_TEST_VIEW_DID_ENTER,
  TerminateTestViewDidEnter,
} from '../../pages/terminate-test/terminate-test.actions';

@Injectable()
export class TerminateTestAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  terminateTestViewDidEnter$ = this.actions$.pipe(
    ofType(TERMINATE_TEST_VIEW_DID_ENTER),
    switchMap((action: TerminateTestViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TERMINATE_TEST);
      return of();
    }),
  );
}
