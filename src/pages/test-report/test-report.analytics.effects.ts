import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsScreenNames,
} from '../../providers/analytics/analytics.model';
import {
  TEST_REPORT_VIEW_DID_ENTER,
  TestReportViewDidEnter
} from '../../pages/test-report/test-report.actions';

@Injectable()
export class TestReportAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
//    private store$: Store<StoreModel>,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => console.log('Analytics initialised successfully'))
          .catch(() => {
            console.log('error initialising analytics')
          }
    );
  }


  @Effect()
  testReportViewDidEnter$ = this.actions$.pipe(
    ofType(TEST_REPORT_VIEW_DID_ENTER),
    switchMap( (action: TestReportViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TEST);
      return of();
    })
  );
}