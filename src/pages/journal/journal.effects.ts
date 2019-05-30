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
  canNavigateToPreviousDay, canNavigateToNextDay, getSlotsOnSelectedDate,
} from './journal.selector';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { PopulateApplicationReference } from '../../modules/tests/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from '../../modules/tests/candidate/candidate.actions';
import { TestCentre } from '@dvsa/mes-test-schema/categories/B';
import {
  PopulateTestSlotAttributes,
} from '../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../modules/tests/test-centre/test-centre.actions';
import { SetTestStatusBooked } from '../../modules/tests/test-status/test-status.actions';
import { extractTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';

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
    public authProvider: AuthenticationProvider,
    public dateTimeProvider: DateTimeProvider,
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
            map((slots: { [k: string]: SlotItem[] }) => this.slotProvider.extendWithEmptyDays(slots)),
            map((slots: { [k: string]: SlotItem[] }) => this.slotProvider.getRelevantSlots(slots)),
            map((slots: { [k: string]: SlotItem[] }) =>
              new journalActions.LoadJournalSuccess(
                slots,
                this.networkStateProvider.getNetworkState(),
                this.authProvider.isInUnAuthenticatedMode(),
                lastRefreshed,
              ),
            ),
            catchError((err) => {
              // For HTTP 304 NOT_MODIFIED we just use the slots we already have cached
              if (err.status === 304) {
                return of(new journalActions.LoadJournalSuccess(
                  slots,
                  this.networkStateProvider.getNetworkState(),
                  this.authProvider.isInUnAuthenticatedMode(),
                  lastRefreshed,
                ));
              }
              return of(err);
            }),
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
          return [
            new journalActions.JournalRefreshError('AutomaticJournalRefresh', err.message),
            new journalActions.LoadJournalSilentFailure(err),
          ];
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
          return [
            new journalActions.JournalRefreshError('ManualJournalRefresh', err.message),
            new journalActions.LoadJournalFailure(err),
          ];
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
  loadJournalSuccessEffect$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_SUCCESS),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDate),
      ),
    ),
    switchMap(([action, selectedDate]) => {
      if (this.dateTimeProvider.now().daysDiff(selectedDate) < 0) {
        return of(new journalActions.SetSelectedDate(this.dateTimeProvider.now().format('YYYY-MM-DD')));
      }
      return of();
    }),
  );

  @Effect()
  startTestEffect$ = this.actions$.pipe(
    ofType(journalActions.START_TEST),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSlotsOnSelectedDate),
      ),
    ),
    switchMap(([action, slots]) => {
      const startTestAction = action as journalActions.StartTest;

      const slot = slots.find(slot => slot.slotData.slotDetail.slotId === startTestAction.slotId);

      return [
        new PopulateApplicationReference(slot.slotData.booking.application),
        new PopulateCandidateDetails(slot.slotData.booking.candidate),
        new PopulateTestSlotAttributes(extractTestSlotAttributes(slot.slotData)),
        new PopulateTestCentre(this.extractTestCentre(slot.slotData)),
        new SetTestStatusBooked(startTestAction.slotId.toString()),
      ];
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
        map(journal => canNavigateToPreviousDay(journal, this.dateTimeProvider.now())),
      ),
    ),
    filter(([action, selectedDate, canNavigateToPreviousDay]) => canNavigateToPreviousDay),
    switchMap(([action, selectedDate, canNavigateToPreviousDay]) => {
      const previousDay = DateTime.at(selectedDate).add(-1, Duration.DAY).format('YYYY-MM-DD');

      return [
        new journalActions.SetSelectedDate(previousDay),
        new journalActions.JournalNavigateDay(previousDay),
      ];
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

      return [
        new journalActions.SetSelectedDate(nextDay),
        new journalActions.JournalNavigateDay(nextDay),
      ];
    }),
  );

  extractTestCentre = (slotData): TestCentre => {
    return {
      costCode: slotData.testCentre.costCode,
    };
  }
}
