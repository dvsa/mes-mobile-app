import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { AnalyticsScreenNames, AnalyticsDimensionIndices } from '../../providers/analytics/analytics.model';
import { VIEW_TEST_RESULT_VIEW_DID_ENTER, ViewTestResultViewDidEnter } from './view-test-result.actions';

@Injectable()
export class ViewTestResultAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    ) {
  }

  @Effect()
  viewTestResultViewDidEnter$ = this.actions$.pipe(
    ofType(VIEW_TEST_RESULT_VIEW_DID_ENTER),
    switchMap((action: ViewTestResultViewDidEnter) => {
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, action.applicationReference);
      this.analytics.setCurrentPage(AnalyticsScreenNames.VIEW_TEST_RESULT);
      return of(new AnalyticRecorded());
    }),
  );
}
