import { TestBed } from '@angular/core/testing';
import { ReplaySubject, Observable, EMPTY, of, defer } from 'rxjs';
import { provideMockActions } from '@ngrx/effects/testing';
import { JournalEffects } from '../journal.effects';
import { Actions } from '@ngrx/effects';
import { JournalProvider } from '../../../providers/journal/journal';
import { JournalProviderMock } from '../../../providers/journal/__mocks__/journal.mock';
import { SlotProvider } from '../../../providers/slot/slot';
import { StoreModule, Store } from '@ngrx/store';
import { journalReducer } from '../journal.reducer';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { NetworkStateProvider, ConnectionStatus } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import * as journalActions from '../journal.actions';
import { JournalModel } from '../journal.model';
import journalSlotsDataMock from '../__mocks__/journal-slots-data.mock';
import { DateTime, Duration } from '../../../shared/helpers/date-time';
import { DataStoreProvider } from '../../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../../providers/data-store/__mocks__/data-store.mock';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { SaveLog } from '../../../modules/logs/logs.actions';
import { LogHelper } from '../../../providers/logs/logsHelper';
import { Device } from '@ionic-native/device';
import { LogHelperMock } from '../../../providers/logs/__mocks__/logsHelper.mock';
import { HttpErrorResponse } from '@angular/common/http';
import { configureTestSuite } from 'ng-bullet';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Journal Effects', () => {

  let effects: JournalEffects;
  let actions$: any;
  let journalProvider: JournalProvider;
  let slotProvider: SlotProvider;
  let store$: Store<JournalModel>;
  let networkStateProvider: NetworkStateProvider;
  let appConfigProvider: AppConfigProvider;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          journal: journalReducer,
          appInfo: () => ({
            versionNumber: '5',
          }),
        }),
      ],
      providers: [
        JournalEffects,
        provideMockActions(() => actions$),
        { provide: JournalProvider, useClass: JournalProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        Store,
        SlotProvider,
        { provide: LogHelper, useClass: LogHelperMock },
        Device,
      ],
    });
  });

  beforeEach(() => {
    // ARRANGE
    actions$ = new ReplaySubject(1);
    journalProvider = TestBed.get(JournalProvider);
    effects = TestBed.get(JournalEffects);
    slotProvider = TestBed.get(SlotProvider);
    store$ = TestBed.get(Store);
    networkStateProvider = TestBed.get(NetworkStateProvider);
    appConfigProvider = TestBed.get(AppConfigProvider);
  });

  it('should dispatch the success action when the journal loads successfully', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.callThrough();
    spyOn(journalProvider, 'saveJournalForOffline').and.callThrough();
    spyOn(slotProvider, 'detectSlotChanges').and.callThrough();
    spyOn(slotProvider, 'extendWithEmptyDays').and.callThrough();
    spyOn(slotProvider, 'getRelevantSlots').and.callThrough();
    // ACT
    actions$.next(new journalActions.LoadJournal());
    // ASSERT
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(journalProvider.saveJournalForOffline).toHaveBeenCalled();
      expect(slotProvider.detectSlotChanges).toHaveBeenCalledWith({}, JournalProviderMock.mockJournal);
      expect(slotProvider.extendWithEmptyDays).toHaveBeenCalled();
      expect(slotProvider.getRelevantSlots).toHaveBeenCalled();
      expect(result instanceof journalActions.LoadJournalSuccess).toBe(true);
      done();
    });

  });

  it('should dispatch the success action when an error is thrown indicating HTTP 304 for the journal', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.callThrough();
    spyOn(journalProvider, 'saveJournalForOffline').and.callThrough();
    spyOn(slotProvider, 'detectSlotChanges').and.callThrough();
    spyOn(slotProvider, 'extendWithEmptyDays').and.callThrough();
    spyOn(slotProvider, 'getRelevantSlots').and.callThrough();
    (<any>journalProvider).setupHttp304Error();
    // ACT
    actions$.next(new journalActions.LoadJournal());
    // ASSERT
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(journalProvider.saveJournalForOffline).not.toHaveBeenCalled();
      expect(slotProvider.detectSlotChanges).not.toHaveBeenCalledWith({}, JournalProviderMock.mockJournal);
      expect(slotProvider.extendWithEmptyDays).not.toHaveBeenCalled();
      expect(slotProvider.getRelevantSlots).not.toHaveBeenCalled();
      expect(result instanceof journalActions.LoadJournalSuccess).toBe(true);
      done();
    });
  });

  it('should save a log if a timeout error occurs', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.callThrough();
    spyOn(journalProvider, 'saveJournalForOffline').and.callThrough();
    spyOn(slotProvider, 'detectSlotChanges').and.callThrough();
    spyOn(slotProvider, 'extendWithEmptyDays').and.callThrough();
    spyOn(slotProvider, 'getRelevantSlots').and.callThrough();
    spyOn(store$, 'dispatch').and.callThrough();
    (<any>journalProvider).setupTimeoutError();
    // ACT
    actions$.next(new journalActions.LoadJournal());
    // ASSERT
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(journalProvider.saveJournalForOffline).not.toHaveBeenCalled();
      expect(slotProvider.detectSlotChanges).not.toHaveBeenCalledWith({}, JournalProviderMock.mockJournal);
      expect(slotProvider.extendWithEmptyDays).not.toHaveBeenCalled();
      expect(slotProvider.getRelevantSlots).not.toHaveBeenCalled();
      expect(result instanceof journalActions.JournalRefreshError).toBe(true);
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(journalActions.JournalRefresh));
      done();
    });
  });

  it('should save a log if an actual error occurs', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.callThrough();
    spyOn(journalProvider, 'saveJournalForOffline').and.callThrough();
    spyOn(slotProvider, 'detectSlotChanges').and.callThrough();
    spyOn(slotProvider, 'extendWithEmptyDays').and.callThrough();
    spyOn(slotProvider, 'getRelevantSlots').and.callThrough();
    spyOn(store$, 'dispatch').and.callThrough();
    (<any>journalProvider).setupActualError();
    // ACT
    actions$.next(new journalActions.LoadJournal());
    // ASSERT
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(journalProvider.saveJournalForOffline).not.toHaveBeenCalled();
      expect(slotProvider.detectSlotChanges).not.toHaveBeenCalledWith({}, JournalProviderMock.mockJournal);
      expect(slotProvider.extendWithEmptyDays).not.toHaveBeenCalled();
      expect(slotProvider.getRelevantSlots).not.toHaveBeenCalled();
      expect(result instanceof journalActions.LoadJournalSuccess).toBe(false);
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(journalActions.JournalRefresh));
      expect(store$.dispatch).toHaveBeenCalledWith(jasmine.any(SaveLog));
      done();
    });
  });

  it('should dispatch the failure action when the journal fails to load', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.returnValue(asyncError(new HttpErrorResponse({
      error: 'Error message',
      status: 403,
      statusText: 'Forbidden',
    })));
    spyOn(slotProvider, 'detectSlotChanges').and.callThrough();
    spyOn(slotProvider, 'extendWithEmptyDays').and.callThrough();
    spyOn(slotProvider, 'getRelevantSlots').and.callThrough();
    // ACT
    actions$.next(new journalActions.LoadJournal());
    // ASSERT
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(slotProvider.detectSlotChanges).toHaveBeenCalledTimes(0);
      expect(slotProvider.extendWithEmptyDays).toHaveBeenCalledTimes(0);
      expect(slotProvider.getRelevantSlots).toHaveBeenCalledTimes(0);

      if (result instanceof journalActions.JournalRefreshError) {
        expect(result instanceof journalActions.JournalRefreshError).toEqual(true);
      } else if (result instanceof journalActions.LoadJournalFailure) {
        expect(result instanceof journalActions.LoadJournalFailure).toEqual(true);
        expect(result.payload.message).toBe('Http failure response for (unknown url): 403 Forbidden');
      } else {
        fail('Unknown Action Sent');
      }
      done();
    });

  });

  it('should dispatch the SetSelectedDate action with the correct date in the select next day effect', (done) => {
    // ARRANGE
    const selectedDate: string = new DateTime().format('YYYY-MM-DD');
    const nextDay: string = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD');
    store$.dispatch(new journalActions.SetSelectedDate(selectedDate));
    store$.dispatch(new journalActions.LoadJournalSuccess(
      { examiner: { staffNumber: '123', individualId: 456 }, slotItemsByDate: journalSlotsDataMock },
      ConnectionStatus.ONLINE,
      false,
      new Date())); // Load in mock journal state
    // ACT
    actions$.next(new journalActions.SelectNextDay());
    // ASSERT
    effects.selectNextDayEffect$.subscribe((result) => {
      if (result instanceof journalActions.SetSelectedDate) {
        expect(result).toEqual(new journalActions.SetSelectedDate(nextDay));
      }
      if (result instanceof journalActions.JournalNavigateDay) {
        expect(result).toEqual(new journalActions.JournalNavigateDay(nextDay));
      }
      done();
    });

  });

  it('should dispatch the SetSelectedDate action with the correct date in the select previous day effect', (done) => {
    // ARRANGE
    const selectedDate: string = new DateTime().format('YYYY-MM-DD'); // Today
    const nextDay: string = DateTime.at(selectedDate).add(1, Duration.DAY).format('YYYY-MM-DD'); // Tomorrow
    store$.dispatch(new journalActions.LoadJournalSuccess(
      { examiner: { staffNumber: '123', individualId: 456 }, slotItemsByDate: journalSlotsDataMock },
      ConnectionStatus.ONLINE,
      false,
      new Date())); // Load in mock journal state
    store$.dispatch(new journalActions.SetSelectedDate(nextDay));
    // ACT
    actions$.next(new journalActions.SelectPreviousDay());
    // ASSERT
    effects.selectPreviousDayEffect$.subscribe((result) => {
      if (result instanceof journalActions.SetSelectedDate) {
        expect(result).toEqual(new journalActions.SetSelectedDate(selectedDate));
      }
      if (result instanceof journalActions.JournalNavigateDay) {
        expect(result).toEqual(new journalActions.JournalNavigateDay(selectedDate));
      }
      done();
    });

  });

  it('should call the relevant methods and return correctly in the pollingSetup effect', (done) => {
    // ARRANGE
    spyOn(networkStateProvider, 'onNetworkChange').and.returnValue(of(ConnectionStatus.ONLINE)); // Force to online
    spyOn(appConfigProvider, 'getAppConfig').and.returnValue({
      journal: { autoRefreshInterval: 200 },
    }); // Set autoRefreshInterval to 200ms for test
    // ACT
    actions$.next(new journalActions.SetupPolling());
    // ASSERT
    effects.pollingSetup$.subscribe((result) => {
      expect(appConfigProvider.getAppConfig).toHaveBeenCalled();
      expect(networkStateProvider.onNetworkChange).toHaveBeenCalled();
      expect(result).toEqual({ type: journalActions.LOAD_JOURNAL_SILENT });
      actions$.next(new journalActions.StopPolling());
      done();
    });
  });
});

function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
