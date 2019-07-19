import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import {
  TEST_RESULT_SEARCH_VIEW_DID_ENTER,
  TestResultSearchViewDidEnter,
  PERFORM_STANDARD_SEARCH,
  PerformStandardSearch,
  PERFORM_ADVANCED_SEARCH,
  PerformAdvancedSearch,
} from './test-results-search.actions';
import {
  AnalyticsScreenNames,
  AnalyticsEventCategories,
  AnalyticsEvents,
 } from '../../providers/analytics/analytics.model';

@Injectable()
export class TestResultsSearchAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
    ) {
    this.analytics.initialiseAnalytics();
  }

  @Effect()
  testResultSearchViewDidEnter$ = this.actions$.pipe(
    ofType(TEST_RESULT_SEARCH_VIEW_DID_ENTER),
    switchMap((action: TestResultSearchViewDidEnter) => {
      this.analytics.setCurrentPage(AnalyticsScreenNames.TEST_RESULTS_SEARCH);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  performStandardSearch$ = this.actions$.pipe(
    ofType(PERFORM_STANDARD_SEARCH),
    switchMap((action: PerformStandardSearch) => {
      this.analytics.logEvent(AnalyticsEventCategories.SEARCH, AnalyticsEvents.STANDARD_SEARCH);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  performAdvancedSearch$ = this.actions$.pipe(
    ofType(PERFORM_ADVANCED_SEARCH),
    switchMap((action: PerformAdvancedSearch) => {
      this.analytics.logEvent(AnalyticsEventCategories.SEARCH, AnalyticsEvents.ADVANCED_SEARCH);
      return of(new AnalyticRecorded());
    }),
  );

}
