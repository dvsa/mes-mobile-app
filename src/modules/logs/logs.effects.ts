import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import * as logsActions from './logs.actions';
import { LogsProvider } from '../../providers/logs/logs';
import { Log, LogType } from '../../shared/models/log.model';
import { AppConfigProvider } from '../../providers/app-config/app-config';

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    private logsProvider: LogsProvider,
    private appConfigProvider: AppConfigProvider,
  ) {}

  @Effect()
  startSendingLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.START_SENDING_LOGS),
    switchMap(() => {
      return interval(this.appConfigProvider.getAppConfig().logging.autoSendInterval);
    }),
  );

  @Effect()
  sendLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.SEND_LOGS),
    switchMap(() => {
      const log: Log = {
        type: LogType.INFO,
        message: 'example log',
        timestamp: Date.now(),
      };
      return this.logsProvider
        .log(log)
        .pipe(
          map((response: any) => {
            console.log('logging response', response);
            return of();
          }),
          catchError((err: any) => {
            console.log('logging error', err);
            return of();
          }),
        );
    }),
  );
}
