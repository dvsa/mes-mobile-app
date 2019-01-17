import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom, tap, mapTo } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';
import { timer } from 'rxjs/observable/timer';

import newSlotsDetectingChanges from './utils/newSlotsDetectingChanges';


@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private store$: Store<StoreModel>
  ) {
  }

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
          map(slots => new journalActions.LoadJournalSuccess(slots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        );
    })
  );

  @Effect()
  journalPolled$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_POLLED),
    // todo - Timer needs to be here somewhere so the withLatestFrom gets refreshed with the latest state and refresh time
    switchMap((action$: journalActions.LoadJournalPolled) =>
      timer(0, 10000).pipe(
        mapTo(action$),
        tap(val => console.log('after mapTo', val)),
        // takeUntil(val => val.payerload === true),
        )
    ),
    tap(val => console.log('before latestFrom', val)),
    withLatestFrom(
      this.store$.pipe(
        select(getJournalState)
      )
    ),
    tap(val => console.log('after latestFrom', val)),
    switchMap(([action, journal]) => {
      return this.journalProvider
        .getJournal(journal.lastRefreshed)
        .pipe(
          map(journalData => newSlotsDetectingChanges(journal.slots, journalData)),
          map(slots => new journalActions.LoadJournalSuccess(slots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        );
    })

  );

}
