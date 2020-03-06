import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  DASHBOARD_VIEW_DID_ENTER,
  DashboardViewDidEnter,
} from './dashboard.actions';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';

@Injectable()
export class DashboardAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
  }

  @Effect()
  dashboardViewDidEnter$ = this.actions$.pipe(
    ofType(DASHBOARD_VIEW_DID_ENTER),
    switchMap((action: DashboardViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.DASHBOARD);
      return of(new AnalyticRecorded());
    }),
  );
}
