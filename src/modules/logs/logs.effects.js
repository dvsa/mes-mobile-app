var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom, concatMap } from 'rxjs/operators';
import { of, interval, from } from 'rxjs';
import * as logsActions from './logs.actions';
import { LogsProvider } from '../../providers/logs/logs';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { getLogsState } from './logs.reducer';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { DataStoreProvider } from '../../providers/data-store/data-store';
import { DateTime } from '../../shared/helpers/date-time';
import { DateTimeProvider } from '../../providers/date-time/date-time';
var LogsEffects = /** @class */ (function () {
    function LogsEffects(actions$, store$, logsProvider, appConfigProvider, dataStore, networkStateProvider, dateTimeProvider) {
        var _this = this;
        this.actions$ = actions$;
        this.store$ = store$;
        this.logsProvider = logsProvider;
        this.appConfigProvider = appConfigProvider;
        this.dataStore = dataStore;
        this.networkStateProvider = networkStateProvider;
        this.dateTimeProvider = dateTimeProvider;
        this.startSendingLogsEffect$ = this.actions$.pipe(ofType(logsActions.START_SENDING_LOGS), switchMap(function () {
            return interval(_this.appConfigProvider.getAppConfig().logsAutoSendInterval)
                .pipe(map(function () { return new logsActions.SendLogs(); }));
        }));
        this.persistLogEffect$ = this.actions$.pipe(ofType(logsActions.PERSIST_LOG), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getLogsState)))); }), switchMap(function (_a) {
            var action = _a[0], logs = _a[1];
            _this.saveLogs(logs);
            return of();
        }));
        this.loadLogEffect$ = this.actions$.pipe(ofType(logsActions.LOAD_LOG), switchMap(function () {
            return _this.getPersistedLogs()
                .pipe(map(function (logs) { return new logsActions.LoadLogState(logs); }));
        }));
        this.saveLogEffect$ = this.actions$.pipe(ofType(logsActions.SAVE_LOG), switchMap(function () {
            return of(new logsActions.PersistLog());
        }));
        this.sendLogsSuccessEffect$ = this.actions$.pipe(ofType(logsActions.SEND_LOGS_SUCCESS), switchMap(function () {
            return of(new logsActions.PersistLog());
        }));
        this.sendLogsEffect$ = this.actions$.pipe(ofType(logsActions.SEND_LOGS), concatMap(function (action) { return of(action).pipe(withLatestFrom(_this.store$.pipe(select(getLogsState)))); }), switchMap(function (_a) {
            var action = _a[0], logs = _a[1];
            if (_this.networkStateProvider.getNetworkState() === ConnectionStatus.OFFLINE) {
                return of();
            }
            return _this.logsProvider
                .sendLogs(logs)
                .pipe(map(function (response) {
                var timestamps = logs.map(function (log) { return log.timestamp; });
                return new logsActions.SendLogsSuccess(timestamps);
            }), catchError(function (err) {
                return of(new logsActions.SendLogsFailure(err));
            }));
        }));
        // TODO: All this has to be moved to the LogsProvider or DataStore provider
        this.getPersistedLogs = function () {
            return from(_this.getAndConvertPersistedLogs());
        };
        this.getAndConvertPersistedLogs = function () {
            return _this.dataStore.getItem('LOGS')
                .then(function (data) {
                var logCache = JSON.parse(data);
                var cachedDate = DateTime.at(logCache.dateStored);
                if (_this.isCacheTooOld(cachedDate, new DateTime())) {
                    return _this.emptyCachedData();
                }
                return logCache.data;
            })
                .catch(function () {
                var emptyLogData = [];
                return emptyLogData;
            });
        };
        this.saveLogs = function (logData) {
            var logDataToStore = {
                dateStored: _this.dateTimeProvider.now().format('YYYY/MM/DD'),
                data: logData,
            };
            _this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(function (response) { });
        };
        this.isCacheTooOld = function (dateStored, now) {
            return dateStored.daysDiff(now) > _this.appConfigProvider.getAppConfig().daysToCacheLogs;
        };
        this.emptyCachedData = function () {
            var emptyLogData = [];
            var logDataToStore = {
                dateStored: _this.dateTimeProvider.now().format('YYYY/MM/DD'),
                data: emptyLogData,
            };
            _this.dataStore.setItem('LOGS', JSON.stringify(logDataToStore)).then(function () { });
            return emptyLogData;
        };
    }
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "startSendingLogsEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "persistLogEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "loadLogEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "saveLogEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "sendLogsSuccessEffect$", void 0);
    __decorate([
        Effect(),
        __metadata("design:type", Object)
    ], LogsEffects.prototype, "sendLogsEffect$", void 0);
    LogsEffects = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Actions,
            Store,
            LogsProvider,
            AppConfigProvider,
            DataStoreProvider,
            NetworkStateProvider,
            DateTimeProvider])
    ], LogsEffects);
    return LogsEffects;
}());
export { LogsEffects };
//# sourceMappingURL=logs.effects.js.map