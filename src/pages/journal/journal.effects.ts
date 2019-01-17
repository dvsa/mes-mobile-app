import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import newSlotsDetectingChanges from './utils/newSlotsDetectingChanges';

@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
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
          map(journalData => newSlotsDetectingChanges(journal.slots, journalData)),
          map(journalData => new journalActions.LoadJournalSuccess(journalData)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  )
}
