import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { groupBy } from 'lodash';
import * as moment from 'moment';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';
import { getSelectedDay, getLastRefreshed, getSlots, getAvailableDays } from './journal.selector';

@Injectable()
export class JournalEffects {
  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private slotProvider: SlotProvider,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
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
          map((slots: {[k: string]: SlotItem[]}) => new journalActions.LoadJournalSuccess(slots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        );
    }),
  )

  @Effect()
  selectPreviousDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_PREVIOUS_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDay)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(getAvailableDays)
      )
    ),
    switchMap(([action, selectedDay, availableDays]) => {
      const previousDay = moment(selectedDay).add(-1, 'day').format('YYYY-MM-DD');
      if (moment().format('YYYY-MM-DD') === selectedDay || !availableDays.includes(previousDay)) {
        console.log('can not go to previous day');
        return of();
      }
      console.log('previous day is', previousDay);
      return of(new journalActions.SetSelectedDay(previousDay));
    }),
  )

  @Effect()
  selectNextDayEffect$ = this.actions$.pipe(
    ofType(journalActions.SELECT_NEXT_DAY),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState),
        map(getSelectedDay)
      ),
      this.store$.pipe(
        select(getJournalState),
        map(getAvailableDays)
      )
    ),
    switchMap(([action, selectedDay, availableDays]) => {
      const nextDay = moment(selectedDay).add(1, 'day').format('YYYY-MM-DD');
      if (!availableDays.includes(nextDay)) {
        console.log('can not go to next day');
        return of();
      }
      console.log('next day is', nextDay);
      return of(new journalActions.SetSelectedDay(nextDay));
    }),
  )
}
