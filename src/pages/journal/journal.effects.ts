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
import { getSelectedDay } from './journal.selector';

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

    // TODO: Instead of selecting the entire journal at once we should select the slots and the lastRefreshed with two withLatestFrom functions
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState)
      )
    ),
    switchMap(([action, journal]) => {
      return this.journalProvider
        .getJournal(journal.lastRefreshed)
        .pipe(
          map((journalData: ExaminerWorkSchedule) => this.slotProvider.detectSlotChanges(journal.slots, journalData)),
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
      )
    ),
    switchMap(([action, selectedDay]) => {
      if (moment().format('YYYY-MM-DD') === selectedDay) {
        console.log('can not back from Today');
        return of();
      }
      const previousDay = moment(selectedDay).add(-1, 'day').format('YYYY-MM-DD');

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
      )
    ),
    switchMap(([action, selectedDay]) => {
      console.log('select next day effect');
      
      const nextDay = moment(selectedDay).add(1, 'day').format('YYYY-MM-DD');

      console.log('next day is', nextDay);

      return of(new journalActions.SetSelectedDay(nextDay));
    }),
  )
}
