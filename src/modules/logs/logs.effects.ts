import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import * as logsActions from './logs.actions';
import { LogsProvider } from '../../providers/logs/logs';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { StoreModel } from '../../shared/models/store.model';
import { getLogsState } from './logs.reducer';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { Log } from '../../shared/models/log.model';
import { DateTime } from '../../shared/helpers/date-time';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';
import { DateTimeProvider } from '../../providers/date-time/date-time';

type LogCache = {
  dateStored: string,
  data: Log[],
};

@Injectable()
export class LogsEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private logsProvider: LogsProvider,
    private appConfigProvider: AppConfigProvider,
    private dataStore: DataStoreProvider,
    private networkStateProvider: NetworkStateProvider,
    private dateTimeProvider: DateTimeProvider,
  ) {}

  @Effect()
  startSendingLogsEffect$ = this.actions$.pipe(
    ofType(logsActions.START_SENDING_LOGS),
    switchMap(() => {
      return interval(this.appConfigProvider.getAppConfig().logs.autoSendInterval)
        .pipe(
          map(() => new logsActions.SendLogs()),
        );
    }),
  );

  @Effect()
  persistLogEffect$ = this.actions$.pipe(
    ofType(logsActions.PERSIST_LOG),
    withLatestFrom(
      this.store$.pipe(
        select(getLogsState),
      ),
    ),
    switchMap(([action, logs]) => {
      this.saveLogs(logs);
      return of();
    }),
  );

  @Effect()
  loadLogEffect$ = this.actions$.pipe(
    ofType(logsActions.LOAD_LOG),
    switchMap(() => {
      return this.getPersistedLogs()
        .pipe(
          map((logs: Log[]) => new logsActions.LoadLogState(logs)));
    }),
  );

  @Effect()
  saveLogEffect$ = this.actions$.pipe(
    ofType(logsActions.SAVE_LOG),
    switchMap(() => {
      return of(new logsActions.PersistLog());
    }),
  );

  @Effect()
  sendLogsSuccessEffect$ = this.actions$.pipe(
    ofType(logsActions.SEND_LOGS_SUCCESS),
    switchMap(() => {
      return of(new logsActions.PersistLog());
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
      if (this.networkStateProvider.getNetworkState() === ConnectionStatus.OFFLINE) {
        return of();
      }
      return this.logsProvider
        .sendLogs(logs)
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

  // TODO: All this has to be moved to the LogsProvider or DataStore provider

  getPersistedLogs = () : Observable<Log[]> => {
    return from(this.getAndConvertPersistedLogs());
  }

  getAndConvertPersistedLogs = (): Promise<Log[]> =>
    this.dataStore.getItem('LOGS')
      .then((data) => {
        const logCache: LogCache = JSON.parse(data);
        const cachedDate = DateTime.at(logCache.dateStored);
        if (this.isCacheTooOld(cachedDate, new DateTime())) {
          return this.emptyCachedData();
        }
        return logCache.data;
      })
      .catch(() => {
        const emptyLogData: Log[] = [];
        return emptyLogData;
      })

  saveLogs = (logData: Log[]) => {
    const logDataToStore: LogCache = {
      dateStored: this.dateTimeProvider.now().format('YYYY/MM/DD'),
      data: logData,
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then((response) => {});
  }

  isCacheTooOld = (dateStored: DateTime, now: DateTime):boolean => {
    return dateStored.daysDiff(now) > this.appConfigProvider.getAppConfig().daysToCacheLogs;
  }

  emptyCachedData = () => {
    const emptyLogData: Log[] = [];
    const logDataToStore: LogCache = {
      dateStored: this.dateTimeProvider.now().format('YYYY/MM/DD'),
      data: emptyLogData,
    };
    this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(() => {});
    return emptyLogData;
  }

}
