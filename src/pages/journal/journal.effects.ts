import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, takeUntil, mapTo, filter, catchError, startWith } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { groupBy } from 'lodash';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import { getSelectedDate, getLastRefreshed, getSlots, canNavigateToPreviousDay, canNavigateToNextDay } from './journal.selector';
import { AnalyticsProvider } from '../../providers/analytics/analytics';
import {
  AnalyticsEventCategories,
  AnalyticsEvents,
  AnalyticsScreenNames,
  AnalyticsDimensionIndices,
  JournalRefreshModes
} from '../../providers/analytics/analytics.model';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DateTime, Duration } from '../../common/date-time';

@Injectable()
export class JournalEffects {
  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private slotProvider: SlotProvider,
    private store$: Store<StoreModel>,
    private analytics: AnalyticsProvider,
    public appConfig: AppConfigProvider,
    public networkStateProvider: NetworkStateProvider,
  ) {
  }

  callJournalProvider$ = (mode: string) => {
    this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.REFRESH_JOURNAL, mode);

    return of(null).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          map(getLastRefreshed)
        ),
        this.store$.pipe(
          select(getJournalState),
          map(getSlots)
        )
      ),
      switchMap(([action, lastRefreshed, slots]) => {
        return this.journalProvider
          .getJournal(lastRefreshed)
          .pipe(
            map((journalData: ExaminerWorkSchedule) => this.slotProvider.detectSlotChanges(slots, journalData)),
            map((slots: any[]) => groupBy(slots, this.slotProvider.getSlotDate)),
            map((slots: {[k: string]: SlotItem[]}) => this.slotProvider.extendWithEmptyDays(slots)),
            map((slots: {[k: string]: SlotItem[]}) => this.slotProvider.getRelevantSlots(slots)),
            map((slots: {[k: string]: SlotItem[]}) => new journalActions.LoadJournalSuccess(slots)),
          );
      })
    );
  }

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_SILENT),
    switchMap(
      () => this.callJournalProvider$(JournalRefreshModes.AUTOMATIC).pipe(
        catchError((err) => {
          this.analytics.logError('AutomaticJournalRefresh', err.message);
          return of();
        })
      )
    ),
  );

  @Effect()
  loadJournal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    switchMap(
      () => this.callJournalProvider$(JournalRefreshModes.MANUAL).pipe(
        catchError((err) => {
          this.analytics.logError('ManualJournalRefresh', err.message);
          return of(new journalActions.LoadJournalFailure(err))
        }),
      )
    ),
  );

  @Effect()
  pollingSetup$ = this.actions$.pipe(
    ofType(journalActions.SETUP_POLLING),
    switchMap((action$: journalActions.SetupPolling) => {
      // Switch map the manual refreshes so they restart the timer.
      const manualRefreshes$ = this.actions$.pipe(
        ofType(journalActions.LOAD_JOURNAL),
        // Initial emission so poll doesn't wait until the first manual refresh
        startWith(null),
      );
      const pollTimer$ = manualRefreshes$.pipe(
        switchMap(() => interval(this.appConfig.getAppConfig().journal.autoRefreshInterval))
      );

      const pollsWhileOnline$ = pollTimer$
        .pipe(
          withLatestFrom(this.networkStateProvider.onNetworkChange()),
          filter(([_, connectionStatus]) => connectionStatus === ConnectionStatus.ONLINE),
        );

      return pollsWhileOnline$
        .pipe(
          takeUntil(this.actions$.pipe(ofType(journalActions.STOP_POLLING))),
          mapTo({ type: journalActions.LOAD_JOURNAL_SILENT }),
        );
    }),
  );

  @Effect()
  selectPreviousDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_PREVIOUS_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToPreviousDay)
      )
    ),
    switchMap(([action, selectedDate, canNavigateToPreviousDay]) => {
      if (!canNavigateToPreviousDay) {
        return of();
      }
      const previousDay = DateTime.at(selectedDate).add(-1, Duration.DAY).format('YYYY-MM-DD');
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, this.analytics.getDescriptiveDate(previousDay));
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.analytics.uniqueDeviceId);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY, this.analytics.getDiffDays(previousDay).toString());
      this.analytics.setCurrentPage(`${this.analytics.getDescriptiveDate(previousDay)} ${AnalyticsScreenNames.JOURNAL}`);
      return of(new journalActions.SetSelectedDate(previousDay));
    }),
  )

  @Effect()
  selectNextDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_NEXT_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToNextDay)
      )
    ),
    switchMap(([action, selectedDate, canNavigateToNextDay]) => {
      if (!canNavigateToNextDay) {
        return of();
      }
      const nextDay = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
      this.analytics.logEvent(AnalyticsEventCategories.JOURNAL, AnalyticsEvents.NAVIGATION, this.analytics.getDescriptiveDate(nextDay));
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.DEVICE_ID, this.analytics.uniqueDeviceId);
      this.analytics.addCustomDimension(AnalyticsDimensionIndices.JOURNAL_DAYS_FROM_TODAY, this.analytics.getDiffDays(nextDay).toString());
      this.analytics.setCurrentPage(`${this.analytics.getDescriptiveDate(nextDay)} ${AnalyticsScreenNames.JOURNAL}`);

      return of(new journalActions.SetSelectedDate(nextDay));
    }),
  )
}
