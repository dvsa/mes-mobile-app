import { Injectable } from '@angular/core';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { SET_TEST_STATUS_SUBMITTED, SetTestStatusSubmitted } from './test-status/test-status.actions';
import { withLatestFrom, switchMap, concatMap } from 'rxjs/operators';
import { getTests } from './tests.reducer';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsDimensionIndices,
} from '../../providers/analytics/analytics.model';
import { getTestById, isPassed, getCurrentTest } from './tests.selector';
import {
  SEND_COMPLETED_TESTS_FAILURE,
  SendCompletedTestsFailure,
  TEST_OUTCOME_CHANGED,
  TestOutcomeChanged,
  START_TEST,
  StartTest,
  SEND_PARTIAL_TESTS_FAILURE,
  SendPartialTestsFailure,
} from './tests.actions';
import { of } from 'rxjs';
import { TestsModel } from './tests.model';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatApplicationReference } from '../../shared/helpers/formatters';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';
import { formatAnalyticsText } from '../../shared/helpers/format-analytics-text';

@Injectable()
export class TestsAnalyticsEffects {
  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private navigationStateProvider: NavigationStateProvider,
  ) {
  }

  @Effect()
  setTestStatusSubmittedEffect$ = this.actions$.pipe(
    ofType(SET_TEST_STATUS_SUBMITTED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    concatMap(([action, tests]: [SetTestStatusSubmitted, TestsModel]) => {
      const test = getTestById(tests, action.slotId);
      const isTestPassed = isPassed(test);
      const isRekey: boolean = test.rekey;
      const journalDataOfTest = test.journalData;

      this.analytics.logEvent(
        AnalyticsEventCategories.POST_TEST,
        isRekey ? AnalyticsEvents.SUBMIT_REKEY_TEST : AnalyticsEvents.SUBMIT_TEST,
        isTestPassed ? 'pass' : 'fail',
      );

      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.APPLICATION_REFERENCE,
        formatApplicationReference(journalDataOfTest.applicationReference),
      );
      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.CANDIDATE_ID,
        journalDataOfTest.candidate.candidateId ? journalDataOfTest.candidate.candidateId.toString() : null);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  sendCompletedTestsFailureEffect$ = this.actions$.pipe(
    ofType(SEND_COMPLETED_TESTS_FAILURE),
    switchMap((action: SendCompletedTestsFailure) => {
      this.analytics.logError('Error connecting to microservice (test submission)', 'No message');
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  sendPartialTestsFailureEffect$ = this.actions$.pipe(
    ofType(SEND_PARTIAL_TESTS_FAILURE),
    switchMap((action: SendPartialTestsFailure) => {
      this.analytics.logError('Error connecting to microservice (partial test submission)', 'No message');
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  testOutcomeChangedEffect$ = this.actions$.pipe(
    ofType(TEST_OUTCOME_CHANGED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [TestOutcomeChanged, TestsModel]) => {
      const test = getCurrentTest(tests);
      const journalDataOfTest = test.journalData;

      this.analytics.logEvent(
        formatAnalyticsText(AnalyticsEventCategories.TEST_REPORT, tests),
        formatAnalyticsText(AnalyticsEvents.TEST_OUTCOME_CHANGED, tests),
        action.payload,
      );

      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.APPLICATION_REFERENCE,
        formatApplicationReference(journalDataOfTest.applicationReference),
      );
      this.analytics.addCustomDimension(
        AnalyticsDimensionIndices.CANDIDATE_ID, journalDataOfTest.candidate.candidateId.toString());

      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  startTestAnalyticsEffect$ = this.actions$.pipe(
    ofType(START_TEST),
    switchMap((action: StartTest) => {

      const category: AnalyticsEventCategories = this.navigationStateProvider.isRekeySearch() ?
        AnalyticsEventCategories.REKEY_SEARCH :
        AnalyticsEventCategories.JOURNAL;

      this.analytics.addCustomDimension(AnalyticsDimensionIndices.TEST_CATEGORY, action.category);
      this.analytics.logEvent(
        category,
        AnalyticsEvents.START_TEST,
      );

      return of(new AnalyticRecorded());
    }),
  );
}
