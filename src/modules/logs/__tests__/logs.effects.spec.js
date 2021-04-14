var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReplaySubject, EMPTY, of } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { LogsEffects } from '../logs.effects';
import { Actions } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { NetworkStateProvider } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import * as logsActions from '../logs.actions';
import { DataStoreProvider } from '../../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../../providers/data-store/__mocks__/data-store.mock';
import { logsReducer } from '../logs.reducer';
import { LogsProvider } from '../../../providers/logs/logs';
import { LogsProviderMock } from '../../../providers/logs/__mocks__/log.mock';
import { LogType } from '../../../shared/models/log.model';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { configureTestSuite } from 'ng-bullet';
var TestActions = /** @class */ (function (_super) {
    __extends(TestActions, _super);
    function TestActions() {
        return _super.call(this, EMPTY) || this;
    }
    Object.defineProperty(TestActions.prototype, "stream$", {
        set: function (source$) {
            this.source = source$;
        },
        enumerable: false,
        configurable: true
    });
    return TestActions;
}(Actions));
export { TestActions };
describe('Logs Effects', function () {
    var effects;
    var actions$;
    var cacheDays;
    var appConfigProviderMock;
    var dataStoreMock;
    configureTestSuite(function () {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({
                    logs: logsReducer,
                }),
            ],
            providers: [
                LogsEffects,
                provideMockActions(function () { return actions$; }),
                { provide: AppConfigProvider, useClass: AppConfigProviderMock },
                { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
                { provide: DataStoreProvider, useClass: DataStoreProviderMock },
                { provide: LogsProvider, useClass: LogsProviderMock },
                { provide: DateTimeProvider, useClass: DateTimeProviderMock },
                Store,
            ],
        });
    });
    beforeEach(function () {
        // ARRANGE
        actions$ = new ReplaySubject(1);
        effects = TestBed.get(LogsEffects);
        appConfigProviderMock = TestBed.get(AppConfigProvider);
        cacheDays = appConfigProviderMock.getAppConfig().daysToCacheLogs;
        dataStoreMock = TestBed.get(DataStoreProvider);
    });
    it('should dispatch the persist logs action when the logs post successfully', function (done) {
        // ARRANGE
        var timeStamps = [12345678];
        // ACT
        actions$.next(new logsActions.SendLogsSuccess(timeStamps));
        // ASSERT
        effects.sendLogsSuccessEffect$.subscribe(function (result) {
            expect(result instanceof logsActions.PersistLog).toBe(true);
            done();
        });
    });
    it('should dispatch the persist logs action when an individual log is added', function (done) {
        var _a;
        // ARRANGE
        var log = (_a = {},
            _a['test'] = 'xyz',
            _a.type = LogType.DEBUG,
            _a.message = 'test',
            _a.timestamp = 1234567,
            _a.drivingExaminerId = '1234567',
            _a);
        // ACT
        actions$.next(new logsActions.SaveLog(log));
        // ASSERT
        effects.saveLogEffect$.subscribe(function (result) {
            expect(result instanceof logsActions.PersistLog).toBe(true);
            done();
        });
    });
    describe('persistLogs', function () {
        it('should call saveLogs', fakeAsync(function (done) {
            // ARRANGE
            spyOn(effects, 'saveLogs').and.callThrough();
            // ACT
            actions$.next(new logsActions.PersistLog());
            tick();
            // ASSERT
            effects.persistLogEffect$.subscribe(function (result) {
                expect(effects.saveLogs).toHaveBeenCalled();
                expect(result instanceof of).toBe(true);
                done();
            });
        }));
    });
    describe('LoadLog', function () {
        it('should call getPersistedLogs and return LoadLogState', fakeAsync(function (done) {
            // ARRANGE
            spyOn(effects, 'getPersistedLogs').and.callThrough();
            // ACT
            actions$.next(new logsActions.LoadLog());
            tick();
            // ASSERT
            effects.persistLogEffect$.subscribe(function (result) {
                expect(effects.getPersistedLogs).toHaveBeenCalled();
                expect(result instanceof logsActions.LoadLogState).toBe(true);
                done();
            });
        }));
    });
    describe('getAndConvertPersistedLogs', function () {
        it('should empty cached data if cache is too old', function (done) {
            var _a;
            var log = (_a = {},
                _a['test'] = 'xyz',
                _a.type = LogType.DEBUG,
                _a.message = 'test',
                _a.timestamp = 1234567,
                _a.drivingExaminerId = '1234567',
                _a);
            var agedCache = {
                dateStored: new DateTime().add(-(cacheDays + 1), Duration.DAY).format('YYYY/MM/DD'),
                data: log,
            };
            // override mock getItem as we need data to test
            // @ts-ignore
            dataStoreMock.getItem.and.callFake(function () { return Promise.resolve(JSON.stringify(agedCache)); });
            spyOn(effects, 'emptyCachedData').and.callThrough();
            effects.getAndConvertPersistedLogs().then(function (data) {
                expect(effects.emptyCachedData).toHaveBeenCalled();
                expect(dataStoreMock.setItem).toHaveBeenCalled();
                expect(data).toEqual([]);
                done();
            });
        });
        it('should return data without emptying cache if data is not too old', function (done) {
            var _a;
            var log = (_a = {},
                _a['test'] = 'xyz',
                _a.type = LogType.DEBUG,
                _a.message = 'test',
                _a.timestamp = 1234567,
                _a.drivingExaminerId = '1234567',
                _a);
            var dataWthinWindowCache = {
                dateStored: new DateTime().add(cacheDays, Duration.DAY).format('YYYY/MM/DD'),
                data: log,
            };
            // override mock getItem as we need data to test
            // @ts-ignore
            dataStoreMock.getItem.and.callFake(function () { return Promise.resolve(JSON.stringify(dataWthinWindowCache)); });
            spyOn(effects, 'emptyCachedData').and.callThrough();
            effects.getAndConvertPersistedLogs().then(function (data) {
                expect(effects.emptyCachedData).toHaveBeenCalledTimes(0);
                expect(dataStoreMock.setItem).toHaveBeenCalledTimes(0);
                expect(data).toEqual(dataWthinWindowCache.data);
                done();
            });
        });
    });
    describe('isCacheTooOld', function () {
        it("should return true if date is greater than cacheDays days ago", function (done) {
            var today = new DateTime();
            var tooOld = new DateTime().add(-(cacheDays + 1), Duration.DAY);
            expect(effects.isCacheTooOld(tooOld, today)).toBe(true);
            done();
        });
        it("should return true if date is less than or equal to cacheDays days ago", function (done) {
            var today = new DateTime();
            var withinWindow = new DateTime().add(-cacheDays, Duration.DAY);
            expect(effects.isCacheTooOld(withinWindow, today)).toBe(false);
            done();
        });
    });
});
//# sourceMappingURL=logs.effects.spec.js.map