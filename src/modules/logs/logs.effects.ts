import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';

import * as logsActions from './logs.actions';
// import { LogsProvider } from '../../providers/logs/logs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    // private logsProvider: LogsProvider,
  ) {}

  @Effect()
  startSendingLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.START_SENDING_LOGS),
    switchMap(() => {
      console.log('sending logs has been started');
      return of();
    }),
  );
}
