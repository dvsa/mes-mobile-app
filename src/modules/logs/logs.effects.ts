import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { Store, select } from '@ngrx/store';

import * as logsActions from './logs.actions';
import { LogsProvider } from '../../providers/logs/logs';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StoreModel } from '../../shared/models/store.model';
import { getLogsState } from './logs.reducer';

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private logsProvider: LogsProvider,
    private appConfigProvider: AppConfigProvider,
  ) {}

  @Effect()
  startSendingLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.START_SENDING_LOGS),
    switchMap(() => {
      return interval(this.appConfigProvider.getAppConfig().logging.autoSendInterval)
        .pipe(
          map(() => new logsActions.SendLogs()),
        );
    }),
  );

  @Effect()
  sendLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.SEND_LOGS),
    withLatestFrom(
      this.store$.pipe(
        select(getLogsState),
      ),
    ),
    switchMap(([action, logs]) => {
      return this.logsProvider
        .logMultiple(logs)
        .pipe(
          map((response: any) => {
            const timestamps = logs.map(log => log.timestamp);
            return new logsActions.SendLogsSuccess(timestamps);
          }),
          catchError((err: any) => {
            return of(new logsActions.SendLogsFailure(err));
          }),
        );
    }),
  );
}
