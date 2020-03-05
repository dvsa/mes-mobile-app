import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import {
  TEST_RESULT_SEARCH_VIEW_DID_ENTER,
  TestResultSearchViewDidEnter,
  PERFORM_APPLICATION_REFERENCE_SEARCH,
  PerformApplicationReferenceSearch,
  PERFORM_DRIVER_NUMBER_SEARCH,
  PERFORM_LDTM_SEARCH,
  PerformDriverNumberSearch,
  PerformLDTMSearch,

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
  performApplicationReferenceSearch$ = this.actions$.pipe(
    ofType(PERFORM_APPLICATION_REFERENCE_SEARCH),
    switchMap((action: PerformApplicationReferenceSearch) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_RESULTS_SEARCH,
        AnalyticsEvents.APPLICATION_REFERENCE_SEARCH,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  performDriverNumberSearch$ = this.actions$.pipe(
    ofType(PERFORM_DRIVER_NUMBER_SEARCH),
    switchMap((action: PerformDriverNumberSearch) => {
      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_RESULTS_SEARCH,
        AnalyticsEvents.DRIVER_NUMBER_SEARCH,
      );
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  performLDTMSearch$ = this.actions$.pipe(
    ofType(PERFORM_LDTM_SEARCH),
    switchMap((action: PerformLDTMSearch) => {

      const searchParametersUsed: string[] = [];
      let label: string = '';

      if (action.advancedSearchParams.startDate || action.advancedSearchParams.endDate) {
        searchParametersUsed.push('date');
      }

      if (action.advancedSearchParams.staffNumber) {
        searchParametersUsed.push('staff id');
      }

      if (action.advancedSearchParams.costCode) {
        searchParametersUsed.push('test centre');
      }

      searchParametersUsed.forEach((searchParameter) => {
        if (label === '') {
          label = searchParameter;
          return;
        }
        label = `${label}, ${searchParameter}`;
      });

      this.analytics.logEvent(
        AnalyticsEventCategories.TEST_RESULTS_SEARCH,
        AnalyticsEvents.LDTM_SEARCH,
        label,
      );
      return of(new AnalyticRecorded());
    }),
  );

}
