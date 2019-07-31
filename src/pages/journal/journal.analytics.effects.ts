import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { switchMap } from 'rxjs/operators';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  JOURNAL_VIEW_DID_ENTER,
  JOURNAL_NAVIGATE_DAY,
  JournalNavigateDay,
  JOURNAL_REFRESH,
  JournalRefresh,
  JOURNAL_REFRESH_ERROR,
  START_TEST,
  StartTest,
  JournalRefreshError } from '../../pages/journal/journal.actions';
import {
    AnalyticsDimensionIndices,
    AnalyticsScreenNames,
    AnalyticsEventCategories,
    AnalyticsEvents,
  } from '../../providers/analytics/analytics.model';
import { SLOT_HAS_CHANGED, SlotHasChanged } from '../../providers/slot/slot.actions';

@Injectable()
export class JournalAnalyticsEffects {

  constructor(
    public analytics: AnalyticsProvider,
    private actions$: Actions,
  ) {
    this.analytics.initialiseAnalytics()
          .then(() => {})
          .catch(() => {
            console.log('error initialising analytics');
          },
    );
  }

  @Effect()
  journalView$ = this.actions$.pipe(
    ofType(JOURNAL_VIEW_DID_ENTER),
    switchMap(
      () => {
        this.analytics.setCurrentPage(AnalyticsScreenNames.JOURNAL);
        return of();
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

        this.analytics.setCurrentPage(
          `${this.analytics.getDescriptiveDate(action.day)} ${AnalyticsScreenNames.JOURNAL}`);

        return of();
      },
    ),
  );

  @Effect()
  journalRefresh$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH),
    switchMap(
      (action: JournalRefresh) => {
        this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, action.mode);
        return of();
      },
    ),
  );

  @Effect()
  journalRefreshError$ = this.actions$.pipe(
    ofType(JOURNAL_REFRESH_ERROR),
    switchMap(
      (action: JournalRefreshError) => {
        this.analytics.logError(action.errorDescription, action.errorMessage);
        return of();
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
        return of();
      },
    ),
  );

  @Effect()
  testOutcomeStartTest$ = this.actions$.pipe(
    ofType(START_TEST),
    switchMap((action: StartTest) => {
      this.analytics.logEvent(AnalyticsEventCategories.CLICK, AnalyticsEvents.START_TEST);
      return of();
    }),
  );

}
