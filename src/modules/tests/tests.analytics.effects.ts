import { Injectable } from '@angular/core';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { SET_TEST_STATUS_SUBMITTED, SetTestStatusSubmitted } from './test-status/test-status.actions';
import { withLatestFrom, tap } from 'rxjs/operators';
import { getTests } from './tests.reducer';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsDimensionIndices,
} from '../../providers/analytics/analytics.model';
import { getTestById, isPassed } from './tests.selector';

@Injectable()
export class TestsAnalyticsEffects {
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
  setTestStatusSubmittedEffect$ = this.actions$.pipe(
    ofType(SET_TEST_STATUS_SUBMITTED),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
      ),
    ),
    tap(([action, tests]) => {
      const setTestStatusSubmittedAction = action as SetTestStatusSubmitted;
      const test = getTestById(tests, setTestStatusSubmittedAction.slotId);
      const isTestPassed = isPassed(test);
      const journalDataOfTest = test.journalData;

      this.analytics.logEvent(
        AnalyticsEventCategories.POST_TEST,
        AnalyticsEvents.SUBMIT_TEST,
        isTestPassed ? 'pass' : 'fail',
      );

      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.TEST_ID, journalDataOfTest.testSlotAttributes.slotId.toString());
      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());

      console.log('submitted test', isTestPassed);
    }),
  );
}
