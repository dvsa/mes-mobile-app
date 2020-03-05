import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  JOURNAL_VIEW_DID_ENTER,
  JOURNAL_NAVIGATE_DAY,
  JournalNavigateDay,
  JOURNAL_REFRESH,
  JournalRefresh,
  JOURNAL_REFRESH_ERROR,
  JournalRefreshError,
  RESUMING_WRITE_UP,
  ResumingWriteUp,
  EARLY_START_MODAL_DID_ENTER,
  EARLY_START_MODAL_CONTINUE_TO_TEST,
  EARLY_START_MODAL_RETURN_TO_JOURNAL,
} from '../../modules/journal/journal.actions';
import {
    AnalyticsDimensionIndices,
    AnalyticsScreenNames,
    AnalyticsEventCategories,
    AnalyticsEvents,
  } from '../../providers/analytics/analytics.model';
import { SLOT_HAS_CHANGED, SlotHasChanged } from '../../providers/slot/slot.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getTestById, isPassed } from '../../modules/tests/tests.selector';
import { AnalyticRecorded } from '../../providers/analytics/analytics.actions';
import { formatApplicationReference } from '../../shared/helpers/formatters';

@Injectable()
export class JournalAnalyticsEffects {

  constructor(
    private analytics: AnalyticsProvider,
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {
  }

  @Effect()
  journalView$ = this.actions$.pipe(
    ofType(JOURNAL_VIEW_DID_ENTER),
    switchMap(
      () => {
        this.analytics.setCurrentPage(AnalyticsScreenNames.JOURNAL);
        this.analytics.addCustomDimension(AnalyticsDimensionIndices.CANDIDATE_ID, '');
        this.analytics.addCustomDimension(AnalyticsDimensionIndices.APPLICATION_REFERENCE, '');
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  journalNavigation$ = this.actions$.pipe(
    ofType(JOURNAL_NAVIGATE_DAY),
    switchMap(
      (action: JournalNavigateDay) => {
        this.analytics.logEvent(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.NAVIGATION,
          this.analytics.getDescriptiveDate(action.day));

        this.analytics.addCustomDimension(
          AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY,
          this.analytics.getDiffDays(action.day).toString());

        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  journalRefresh$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH),
    switchMap(
      (action: JournalRefresh) => {
        this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, action.mode);
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  earlyStartModalDidEnter$ = this.actions$.pipe(
    ofType(EARLY_START_MODAL_DID_ENTER),
    switchMap(() => {
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.DISPLAY_EARLY_START_MODAL);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  earlyStartModalContinue$ = this.actions$.pipe(
    ofType(EARLY_START_MODAL_CONTINUE_TO_TEST),
    switchMap(() => {
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_CONTINUE);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  earlyStartModalReturn$ = this.actions$.pipe(
    ofType(EARLY_START_MODAL_RETURN_TO_JOURNAL),
    switchMap(() => {
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.EXIT_EARLY_START_MODAL_RETURN);
      return of(new AnalyticRecorded());
    }),
  );

  @Effect()
  journalRefreshError$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH_ERROR),
    switchMap(
      (action: JournalRefreshError) => {
        this.analytics.logError(action.errorDescription, action.errorMessage);
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  slotChanged$ = this.actions$.pipe(
    ofType(SLOT_HAS_CHANGED),
    switchMap(
      (action: SlotHasChanged) => {
        this.analytics.logEvent(
          AnalyticsEventCategories.JOURNAL,
          AnalyticsEvents.SLOT_CHANGED,
          action.slotId.toString());
        return of(new AnalyticRecorded());
      },
    ),
  );

  @Effect()
  resumingWriteUpEffect$ = this.actions$.pipe(
    ofType(RESUMING_WRITE_UP),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]) => {
      const setTestStatusSubmittedAction = action as ResumingWriteUp;
      const test = getTestById(tests, setTestStatusSubmittedAction.slotId);
      const isTestPassed = isPassed(test);
      const journalDataOfTest = test.journalData;

      this.analytics.logEvent(
        AnalyticsEventCategories.POST_TEST,
        AnalyticsEvents.RESUME_WRITE_UP,
        isTestPassed ? 'pass' : 'fail',
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

}
