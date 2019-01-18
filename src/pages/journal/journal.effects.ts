import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import { ExaminerWorkSchedule } from '../../common/domain/DJournal';
import { SlotItem } from '../../providers/slot-selector/slot-item';
import { SlotProvider } from '../../providers/slot/slot';

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
        select(getJournalState)
      )
    ),
    switchMap(([action, journal]) => {
      return this.journalProvider
        .getJournal(journal.lastRefreshed)
        .pipe(
          map((journalData: ExaminerWorkSchedule) => {
            const updatedSlots = this.slotProvider.detectSlotChanges(journal.slots, journalData);
            console.log('updated slots', updatedSlots);
            return updatedSlots;
          }),
          map((slots: any[]) => {
            const c = this.slotProvider.groupByDate(slots)
            console.log(c);
            return c;
          }),
          map((slots: {[k: string]: SlotItem[]}) => new journalActions.LoadJournalSuccess(slots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  )
}
