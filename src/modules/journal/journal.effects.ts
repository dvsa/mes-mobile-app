import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, takeUntil, mapTo, filter, catchError, startWith, tap, concatMap }
  from 'rxjs/operators';
import { of, interval } from 'rxjs';

import { groupBy } from 'lodash';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getJournalState } from './journal.reducer';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ExaminerWorkSchedule } from '@dvsa/mes-journal-schema';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import {
  JournalRefreshModes,
} from '../../providers/analytics/analytics.model';
import {
  getSelectedDate, getLastRefreshed, getSlots,
  canNavigateToPreviousDay, canNavigateToNextDay, getCompletedTests,
} from './journal.selector';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DateTime, Duration } from '../../shared/helpers/date-time';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { Examiner } from '@dvsa/mes-test-schema/categories/common';
import { DateTimeProvider } from '../../providers/date-time/date-time';
import { ExaminerSlotItems, ExaminerSlotItemsByDate } from './journal.model';
import { LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogHelper } from '../../providers/logs/logsHelper';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';
import { AdvancedSearchParams } from '../../providers/search/search.models';
import moment from 'moment';
import { removeLeadingZeros } from '../../shared/helpers/formatters';
import { getExaminer } from '../tests/journal-data/common/examiner/examiner.reducer';
import { getStaffNumber } from '../tests/journal-data/common/examiner/examiner.selector';
import { hasStartedTests } from '../tests/tests.selector';
import { getTests } from '../tests/tests.reducer';
import { SearchResultTestSchema } from '@dvsa/mes-search-schema';
import { CompletedTestPersistenceProvider } from
    '../../providers/completed-test-persistence/completed-test-persistence';

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
    public searchProvider: SearchProvider,
    private logHelper: LogHelper,
    private completedTestPersistenceProvider: CompletedTestPersistenceProvider,
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
        this.store$.pipe(
          select(getJournalState),
          map(journal => journal.examiner),
        ),
      ),
      switchMap(([action, lastRefreshed, slots, examiner]) => {
        return this.journalProvider
          .getJournal(lastRefreshed)
          .pipe(
            tap((journalData: ExaminerWorkSchedule) => this.journalProvider.saveJournalForOffline(journalData)),
            map((journalData: ExaminerWorkSchedule): ExaminerSlotItems => ({
              examiner: journalData.examiner as Required<Examiner>,
              slotItems: this.slotProvider.detectSlotChanges(slots, journalData),
            })),
            map((examinerSlotItems: ExaminerSlotItems): ExaminerSlotItemsByDate => ({
              examiner: examinerSlotItems.examiner,
              slotItemsByDate: this.getRelevantSlotItemsByDate(examinerSlotItems.slotItems),
            })),
            map((slotItemsByDate: ExaminerSlotItemsByDate) =>
              new journalActions.LoadJournalSuccess(
                slotItemsByDate,
                this.networkStateProvider.getNetworkState(),
                this.authProvider.isInUnAuthenticatedMode(),
                lastRefreshed,
              ),
            ),
            catchError((err: HttpErrorResponse) => {
              // For HTTP 304 NOT_MODIFIED we just use the slots we already have cached
              if (err.status === HttpStatusCodes.NOT_MODIFIED) {
                return of(new journalActions.LoadJournalSuccess(
                  { examiner, slotItemsByDate: slots },
                  this.networkStateProvider.getNetworkState(),
                  this.authProvider.isInUnAuthenticatedMode(),
                  lastRefreshed,
                ));
              }

              if (err.message === 'Timeout has occurred') {
                return of(new journalActions.JournalRefreshError('Retrieving Journal', err.message));
              }

              this.store$.dispatch(new SaveLog(
                this.logHelper.createLog(LogType.ERROR, 'Retrieving Journal', err.message),
              ));

              return ErrorObservable.create(err);
            }),
          );
      }),
    );
  }

  private getRelevantSlotItemsByDate = (slotItems: SlotItem[]): { [date: string]: SlotItem[] } => {
    let slotItemsByDate: { [date: string]: SlotItem[] };
    slotItemsByDate = groupBy(slotItems, this.slotProvider.getSlotDate);
    slotItemsByDate = this.slotProvider.extendWithEmptyDays(slotItemsByDate);
    slotItemsByDate = this.slotProvider.getRelevantSlots(slotItemsByDate);
    return slotItemsByDate;
  }

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_SILENT),
    switchMap(
      () => this.callJournalProvider$(JournalRefreshModes.AUTOMATIC).pipe(
        catchError((err: HttpErrorResponse) => {
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
        catchError((err: HttpErrorResponse) => {
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
  loadCompletedTests$ = this.actions$.pipe(
    ofType(journalActions.LOAD_COMPLETED_TESTS),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          select(getExaminer),
          select(getStaffNumber),
        ),
        this.store$.pipe(
          select(getTests),
          select(hasStartedTests),
        ),
        this.store$.pipe(
          select(getJournalState),
          select(getCompletedTests),
        ),
      ),
    )),
    filter((
      [action, staffNumber, hasStartedTests, completedTests]:
        [journalActions.LoadCompletedTests, string, boolean, SearchResultTestSchema[]],
    ) => {
      // The callThrough property is set to true when doing a manual journal refresh for example
      if (action.callThrough) {
        return true;
      }
      return !hasStartedTests && completedTests && completedTests.length === 0;
    }),
    switchMap(([action, staffNumber]) => {
      const numberOfDaysToView = this.appConfig.getAppConfig().journal.numberOfDaysToView;
      const advancedSearchParams: AdvancedSearchParams = {
        startDate: moment().subtract(numberOfDaysToView, 'days').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
        staffNumber: removeLeadingZeros(staffNumber),
        costCode: '',
        excludeAutoSavedTests: 'true',
      };
      return this.searchProvider.advancedSearch(advancedSearchParams).pipe(
        tap(searchResults => this.completedTestPersistenceProvider.persistCompletedTests(searchResults)),
        map((searchResults) => {
          return new journalActions.LoadCompletedTestsSuccess(searchResults);
        }),
        catchError((err) => {
          return of(new journalActions.LoadCompletedTestsFailure(err));
        }));
    }),
  );

  @Effect()
  selectPreviousDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_PREVIOUS_DAY),
    concatMap(action => of(action).pipe(
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
    )),
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
    concatMap(action => of(action).pipe(
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
    )),
    filter(([action, selectedDate, canNavigateToNextDay]) => canNavigateToNextDay),
    switchMap(([action, selectedDate, canNavigateToNextDay]) => {
      const nextDay = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');

      return [
        new journalActions.SetSelectedDate(nextDay),
        new journalActions.JournalNavigateDay(nextDay),
      ];
    }),
  );

}
