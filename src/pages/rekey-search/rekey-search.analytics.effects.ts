import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import {
  REKEY_SEARCH_VIEW_DID_ENTER,
  RekeySearchViewDidEnter,
} from './rekey-search.actions';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';

@Injectable()
export class RekeySearchAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  rekeySearchViewDidEnter$ = this.actions$.pipe(
    ofType(REKEY_SEARCH_VIEW_DID_ENTER),
    switchMap((action: RekeySearchViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.REKEY_SEARCH);
      return of(new AnalyticRecorded());
    }),
  );

}
