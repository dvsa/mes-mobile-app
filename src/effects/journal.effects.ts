import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, delay, mapTo, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as journalActions from '../store/journal.actions';
import { JournalProvider } from '../providers/journal/journal';

@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider) {}

  @Effect()
  loadJournalStarts$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    mapTo(new messagesActions.AddMessage({
      text: 'Loading Journal...',
      time: Date.now()
    }))
  )

  @Effect()
  loadJournalWithDelayStarts$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_WITH_DELAY),
    mapTo(new messagesActions.AddMessage({
      text: 'Loading Journal...',
      time: Date.now()
    }))
  )

  @Effect()
  loadJournalWithChanceToFailStarts$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_WITH_CHANCE_TO_FAIL),
    mapTo(new messagesActions.AddMessage({
      text: 'Loading Journal...',
      time: Date.now()
    }))
  )

  @Effect()
  journalLoadedSuccessfully$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_SUCCESS),
    mapTo(new messagesActions.AddMessage({
      text: 'Journal loaded successfully',
      time: Date.now()
    }))
  )
  
  @Effect()
  journalLoadedUnsuccessfully$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_FAILURE),
    mapTo(new messagesActions.AddMessage({
      text: 'Journal failed to load',
      time: Date.now()
    }))
  )

  @Effect()
  journal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL),
    switchMap(() => {
      return this.journalProvider
        .getJournal()
        .pipe(
          map(data => this.journalProvider.extractJournalData(data)),
          map(testSlots => new journalActions.LoadJournalSuccess(testSlots)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  )

  @Effect()
  delayedJournal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_WITH_DELAY),
    switchMap(() => {
      return this.journalProvider
        .getJournal()
        .pipe(
          delay(3000),
          map(data => this.journalProvider.extractJournalData(data)),
          map(data => new journalActions.LoadJournalSuccess(data)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  )

  @Effect()
  possiblyFailedJournal$ = this.actions$.pipe(
    ofType(journalActions.LOAD_JOURNAL_WITH_CHANCE_TO_FAIL),
    switchMap(() => {
      return this.journalProvider
        .getJournalWithChanceToFail()
        .pipe(
          map(data => this.journalProvider.extractJournalData(data)),
          map(data => new journalActions.LoadJournalSuccess(data)),
          catchError(err => of(new journalActions.LoadJournalFailure(err)))
        )
    })
  )
}
