
import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { LogsEffects } from '../logs.effects';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
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
import { Log, LogType } from '../../../shared/models/log.model';
import { of } from 'rxjs/observable/of';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { configureTestSuite } from 'ng-bullet';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Logs Effects', () => {

  let effects: LogsEffects;
  let actions$: any;
  let cacheDays: number;
  let appConfigProviderMock: AppConfigProvider;
  let dataStoreMock: DataStoreProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          logs: logsReducer,
        }),
      ],
      providers: [
        LogsEffects,
        provideMockActions(() => actions$),
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: LogsProvider, useClass: LogsProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        Store,
      ],
    });
  });

  beforeEach(() => {
    // ARRANGE
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(LogsEffects);
    appConfigProviderMock = TestBed.get(AppConfigProvider);
    cacheDays = appConfigProviderMock.getAppConfig().daysToCacheLogs;
    dataStoreMock = TestBed.get(DataStoreProvider);
  });

  it('should dispatch the persist logs action when the logs post successfully', (done) => {
    // ARRANGE
    const timeStamps: number[] = [12345678];
    // ACT
    actions$.next(new logsActions.SendLogsSuccess(timeStamps));
    // ASSERT
    effects.sendLogsSuccessEffect$.subscribe((result) => {
      expect(result instanceof logsActions.PersistLog).toBe(true);
      done();
    });
  });

  it('should dispatch the persist logs action when an individual log is added', (done) => {
    // ARRANGE
    const log: Log = {
      ['test']: 'xyz',
      type: LogType.DEBUG,
      message: 'test',
      timestamp: 1234567,
      drivingExaminerId: '1234567',
    };
    // ACT
    actions$.next(new logsActions.SaveLog(log));
    // ASSERT
    effects.saveLogEffect$.subscribe((result) => {
      expect(result instanceof logsActions.PersistLog).toBe(true);
      done();
    });
  });

  describe('persistLogs', () => {
    it('should call saveLogs', fakeAsync((done) => {
    // ARRANGE
      spyOn(effects, 'saveLogs').and.callThrough();
    // ACT
      actions$.next(new logsActions.PersistLog());
      tick();
      // ASSERT
      effects.persistLogEffect$.subscribe((result) => {
        expect(effects.saveLogs).toHaveBeenCalled();
        expect(result instanceof of).toBe(true);
        done();
      });
    }));
  });
  describe('LoadLog', () => {
    it('should call getPersistedLogs and return LoadLogState', fakeAsync((done) => {
    // ARRANGE
      spyOn(effects, 'getPersistedLogs').and.callThrough();
    // ACT
      actions$.next(new logsActions.LoadLog());
      tick();
      // ASSERT
      effects.persistLogEffect$.subscribe((result) => {
        expect(effects.getPersistedLogs).toHaveBeenCalled();
        expect(result instanceof logsActions.LoadLogState).toBe(true);
        done();
      });
    }));

  });

  describe('getAndConvertPersistedLogs', () => {
    it('should empty cached data if cache is too old', (done) => {
      const log: Log = {
        ['test']: 'xyz',
        type: LogType.DEBUG,
        message: 'test',
        timestamp: 1234567,
        drivingExaminerId: '1234567',
      };

      const agedCache = {
        dateStored: new DateTime().add(-(cacheDays + 1), Duration.DAY).format('YYYY/MM/DD'),
        data: log,
      };

      // override mock getItem as we need data to test
      // @ts-ignore
      dataStoreMock.getItem.and.callFake(() => Promise.resolve(JSON.stringify(agedCache)));

      spyOn(effects, 'emptyCachedData').and.callThrough();

      effects.getAndConvertPersistedLogs().then((data) => {
        expect(effects.emptyCachedData).toHaveBeenCalled();
        expect(dataStoreMock.setItem).toHaveBeenCalled();
        expect(data).toEqual([] as Log[]);
        done();
      });
    });

    it('should return data without emptying cache if data is not too old', (done) => {
      const log: Log = {
        ['test']: 'xyz',
        type: LogType.DEBUG,
        message: 'test',
        timestamp: 1234567,
        drivingExaminerId: '1234567',
      };
      const dataWthinWindowCache = {
        dateStored: new DateTime().add(cacheDays, Duration.DAY).format('YYYY/MM/DD'),
        data: log,
      };

      // override mock getItem as we need data to test
      // @ts-ignore
      dataStoreMock.getItem.and.callFake(() => Promise.resolve(JSON.stringify(dataWthinWindowCache)));

      spyOn(effects, 'emptyCachedData').and.callThrough();

      effects.getAndConvertPersistedLogs().then((data) => {
        expect(effects.emptyCachedData).toHaveBeenCalledTimes(0);
        expect(dataStoreMock.setItem).toHaveBeenCalledTimes(0);
        expect(data).toEqual(dataWthinWindowCache.data);
        done();
      });
    });

  });

  describe('isCacheTooOld', () => {
    it(`should return true if date is greater than cacheDays days ago`, (done) => {
      const today = new DateTime();
      const tooOld = new DateTime().add(-(cacheDays + 1), Duration.DAY);
      expect(effects.isCacheTooOld(tooOld, today)).toBe(true);
      done();
    });

    it(`should return true if date is less than or equal to cacheDays days ago`, (done) => {
      const today = new DateTime();
      const withinWindow = new DateTime().add(-cacheDays, Duration.DAY);
      expect(effects.isCacheTooOld(withinWindow, today)).toBe(false);
      done();
    });
  });

});
