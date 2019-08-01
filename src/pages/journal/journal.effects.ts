import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom, takeUntil, mapTo, filter, catchError, startWith, tap, concatMap }
  from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import { groupBy, has } from 'lodash';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select, Action } from '@ngrx/store';
import { StoreModel } from '../../shared/models/store.model';
import { getJournalState } from './journal.reducer';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { ExaminerWorkSchedule, TestSlot } from '@dvsa/mes-journal-schema';
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
import { TestCentre, Examiner } from '@dvsa/mes-test-schema/categories/B';
import {
  PopulateTestSlotAttributes,
} from '../../modules/tests/test-slot-attributes/test-slot-attributes.actions';
import { PopulateTestCentre } from '../../modules/tests/test-centre/test-centre.actions';
import { SetTestStatusBooked } from '../../modules/tests/test-status/test-status.actions';
import { extractTestSlotAttributes } from '../../modules/tests/test-slot-attributes/test-slot-attributes.selector';
import { PopulateExaminer } from '../../modules/tests/examiner/examiner.actions';
import { PopulateTestCategory } from '../../modules/tests/category/category.actions';
import { ExaminerSlotItems, ExaminerSlotItemsByDate } from './journal.model';
import { MarkAsRekey } from '../../modules/tests/rekey/rekey.actions';
import { LogType } from '../../shared/models/log.model';
import { SaveLog } from '../../modules/logs/logs.actions';
import { LogHelper } from '../../providers/logs/logsHelper';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

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
    private logHelper: LogHelper,
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
              if (err.status !== 304) {
                this.store$.dispatch(new SaveLog(
                  this.logHelper.createLog(LogType.ERROR, 'Retrieving Journal', err.message),
                ));
              }

              if (err.status === 304 || err.message === 'Timeout has occurred') {
                return of(new journalActions.LoadJournalSuccess(
                  { examiner, slotItemsByDate: slots },
                  this.networkStateProvider.getNetworkState(),
                  this.authProvider.isInUnAuthenticatedMode(),
                  lastRefreshed,
                ));
              }

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
  startTestEffect$ = this.actions$.pipe(
    ofType(journalActions.START_TEST),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          map(getSlotsOnSelectedDate),
        ),
        this.store$.pipe(
          select(getJournalState),
          map(journal => journal.examiner),
        ),
      ),
    )),
    switchMap(([action, slots, examiner]) => {
      const startTestAction = action as journalActions.StartTest;
      const slotData = slots.map(slot => slot.slotData);
      const slot: TestSlot = slotData.find(data => data.slotDetail.slotId === startTestAction.slotId &&
        has(data, 'booking'));
      const { staffNumber, individualId } = examiner;

      const arrayOfActions: Action[] = [
        new PopulateExaminer({ staffNumber, individualId }),
        new PopulateApplicationReference(slot.booking.application),
        new PopulateCandidateDetails(slot.booking.candidate),
        new PopulateTestSlotAttributes(extractTestSlotAttributes(slot)),
        new PopulateTestCentre(this.extractTestCentre(slot)),
        new SetTestStatusBooked(startTestAction.slotId.toString()),
        new PopulateTestCategory(slot.booking.application.testCategory),
      ];

      if (startTestAction.rekey) {
        arrayOfActions.push(new MarkAsRekey());
      }

      return arrayOfActions;
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

  extractTestCentre = (slotData): TestCentre => {
    return {
      centreId: slotData.testCentre.centreId,
      costCode: slotData.testCentre.costCode,
    };
  }

  @Effect()
  activateTestEffect$ = this.actions$.pipe(
    ofType(journalActions.ACTIVATE_TEST),
    filter((action: journalActions.ActivateTest) => action.rekey),
    map((action) => {
      const activateTestAction = action as journalActions.ActivateTest;
      if (activateTestAction.rekey) {
        return new MarkAsRekey();
      }
    }),
  );
}
