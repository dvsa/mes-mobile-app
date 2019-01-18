import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, withLatestFrom, takeUntil, mapTo } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { timer } from 'rxjs/observable/timer';

import * as journalActions from './journal.actions';
import { JournalProvider } from '../../providers/journal/journal';
import { Store, select } from '@ngrx/store';
import { StoreModel } from '../../common/store.model';
import { getJournalState } from './journal.reducer';

import newSlotsDetectingChanges from './utils/newSlotsDetectingChanges';
import { AppConfigProvider } from '../../providers/app-config/app-config';

@Injectable()
export class JournalEffects {

  constructor(
    private actions$: Actions,
    private journalProvider: JournalProvider,
    private store$: Store<StoreModel>,
    public appConfig: AppConfigProvider
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
    switchMap((action$: journalActions.LoadJournalPolled) =>
      timer(0, this.appConfig.getAppConfig().journal.backgroundRefreshTime)
        .pipe(
          takeUntil(this.actions$.ofType(journalActions.CANCEL_JOURNAL_POLL)),
          mapTo({ type: journalActions.LOAD_JOURNAL })
        )
    )
  );

}
