import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, takeUntil, mapTo, filter, catchError, startWith, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { groupBy } from 'lodash';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getJournalState } from './journal.reducer';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ExaminerWorkSchedule } from '../../shared/models/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import { JournalRefreshModes } from '../../providers/analytics/analytics.model';
import {
  getSelectedDate, getLastRefreshed, getSlots,
  canNavigateToPreviousDay, canNavigateToNextDay,
} from './journal.selector';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { DataStoreProvider } from '../../providers/data-store/data-store';

@Injectable()
export class JournalEffects {
  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private slotProvider: SlotProvider,
    private store$: Store<StoreModel>,
    public appConfig: AppConfigProvider,
    public networkStateProvider: NetworkStateProvider,
    public dataStoreprovider: DataStoreProvider,
  ) {
  }

  callJournalProvider$ = (mode: string) => {
    this.store$.dispatch(new journalActions.JournalRefresh(mode));
    return of(null).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          map(getLastRefreshed),
        ),
        this.store$.pipe(
          select(getJournalState),
          map(getSlots),
        ),
      ),
      switchMap(([action, lastRefreshed, slots]) => {
        return this.journalProvider
          .getJournal(lastRefreshed)
          .pipe(
            tap((journalData: ExaminerWorkSchedule) => this.journalProvider.saveJournalForOffline(journalData)),
            map((journalData: ExaminerWorkSchedule) => this.slotProvider.detectSlotChanges(slots, journalData)),
            map((slots: any[]) => groupBy(slots, this.slotProvider.getSlotDate)),
            map((slots: {[k: string]: SlotItem[]}) => this.slotProvider.extendWithEmptyDays(slots)),
            map((slots: {[k: string]: SlotItem[]}) => this.slotProvider.getRelevantSlots(slots)),
            map((slots: {[k: string]: SlotItem[]}) =>
              new journalActions.LoadJournalSuccess(slots,
                                                    this.networkStateProvider.getNetworkState(),
                                                    lastRefreshed)),
          );
      }),
    );
  }

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_SILENT),
    switchMap(
      () => this.callJournalProvider$(JournalRefreshModes.AUTOMATIC).pipe(
        catchError((err) => {
          // TODO: We don't need to use the store here, just return the action wrapped in an Observable
          this.store$.dispatch(new journalActions.JournalRefreshError('AutomaticJournalRefresh', err.message));
          console.log(err);
          return of(new journalActions.LoadJournalSilentFailure(err));
        }),
      ),
    ),
  );

  @Effect()
  loadJournal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    switchMap(
      () => this.callJournalProvider$(JournalRefreshModes.MANUAL).pipe(
        catchError((err) => {
          // TODO: We don't need to use the store here, just return the action wrapped in an Observable
          this.store$.dispatch(new journalActions.JournalRefreshError('ManualJournalRefresh', err.message));
          return of(new journalActions.LoadJournalFailure(err));
        }),
      ),
    ),
  );

  @Effect()
  pollingSetup$ = this.actions$.pipe(
    ofType(journalActions.SETUP_JOURNAL_POLLING),
    switchMap(() => {
      // Switch map the manual refreshes so they restart the timer.
      const manualRefreshes$ = this.actions$.pipe(
        ofType(journalActions.LOAD_JOURNAL),
        // Initial emission so poll doesn't wait until the first manual refresh
        startWith(null),
      );
      const pollTimer$ = manualRefreshes$.pipe(
        switchMap(() => interval(this.appConfig.getAppConfig().journal.autoRefreshInterval)),
      );

      const pollsWhileOnline$ = pollTimer$
        .pipe(
          withLatestFrom(this.networkStateProvider.onNetworkChange()),
          filter(([_, connectionStatus]) => connectionStatus === ConnectionStatus.ONLINE),
        );

      return pollsWhileOnline$
        .pipe(
          takeUntil(this.actions$.pipe(ofType(journalActions.STOP_JOURNAL_POLLING))),
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
        map(getSelectedDate),
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToPreviousDay),
      ),
    ),
    filter(([action, selectedDate, canNavigateToPreviousDay]) => canNavigateToPreviousDay),
    switchMap(([action, selectedDate, canNavigateToPreviousDay]) => {
      const previousDay = DateTime.at(selectedDate).add(-1, Duration.DAY).format('YYYY-MM-DD');

      // TODO: We don't need to use the store here, just return the action wrapped in an Observable
      this.store$.dispatch(new journalActions.JournalNavigateDay(previousDay));
      return of(new journalActions.SetSelectedDate(previousDay));
    }),
  );

  @Effect()
  selectNextDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_NEXT_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
      ),
      this.store$.pipe(
        select(getJournalState),
        map(canNavigateToNextDay),
      ),
    ),
    filter(([action, selectedDate, canNavigateToNextDay]) => canNavigateToNextDay),
    switchMap(([action, selectedDate, canNavigateToNextDay]) => {
      const nextDay = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');

      // TODO: We don't need to use the store here, just return the action wrapped in an Observable
      this.store$.dispatch(new journalActions.JournalNavigateDay(nextDay));
      return of(new journalActions.SetSelectedDate(nextDay));
    }),
  );
}
