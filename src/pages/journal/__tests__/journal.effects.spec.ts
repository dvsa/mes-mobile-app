import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { provideMockActions } from '@ngrx/effects/testing';
import { JournalEffects } from '../journal.effects';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { JournalProvider } from '../../../providers/journal/journal';
import { JournalProviderMock } from '../../../providers/journal/__mocks__/journal.mock';
import { AnalyticsProvider } from '../../../providers/analytics/analytics';
import { AnalyticsProviderMock } from '../../../providers/analytics/__mocks__/analytics.mock';
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
import { of } from 'rxjs/observable/of';
import { DataStoreProvider } from '../../../providers/data-store/data-store';
import { DataStoreProviderMock } from '../../../providers/data-store/__mocks__/data-store.mock';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { AuthenticationProviderMock } from '../../../providers/authentication/__mocks__/authentication.mock';
import { DateTimeProvider } from '../../../providers/date-time/date-time';
import { DateTimeProviderMock } from '../../../providers/date-time/__mocks__/date-time.mock';
import { PopulateExaminer } from '../../../modules/tests/examiner/examiner.actions';
import * as rekeyActions from '../../../modules/tests/rekey/rekey.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
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

  beforeEach(() => {
    // ARRANGE
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          journal: journalReducer,
        }),
      ],
      providers: [
        JournalEffects,
        provideMockActions(() => actions$),
        { provide: JournalProvider, useClass: JournalProviderMock },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: DataStoreProvider, useClass: DataStoreProviderMock },
        { provide: AuthenticationProvider, useClass: AuthenticationProviderMock },
        { provide: DateTimeProvider, useClass: DateTimeProviderMock },
        Store,
        SlotProvider,
      ],
    });
    journalProvider = TestBed.get(JournalProvider);
    effects = TestBed.get(JournalEffects);
    slotProvider = TestBed.get(SlotProvider);
    store$ = TestBed.get(Store);
    networkStateProvider = TestBed.get(NetworkStateProvider);
    appConfigProvider = TestBed.get(AppConfigProvider);
  });

  it('should create the journal effects', () => {
    expect(effects).toBeTruthy();
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

  it('should dispatch the failure action when the journal fails to load', (done) => {
    // ARRANGE
    spyOn(journalProvider, 'getJournal').and.throwError;
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
        expect(result instanceof journalActions.JournalRefreshError).toBeTruthy();
      } else if (result instanceof journalActions.LoadJournalFailure) {
        expect(result instanceof journalActions.LoadJournalFailure).toBeTruthy();
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

  describe('startTestEffect', () => {
    it('should copy the examiner from the journal state into the test state', (done) => {
      const selectedDate: string = new DateTime().format('YYYY-MM-DD');
      const examiner = { staffNumber: '123', individualId: 456 };
      store$.dispatch(new journalActions.SetSelectedDate(selectedDate));
      store$.dispatch(
        new journalActions.LoadJournalSuccess(
          { examiner, slotItemsByDate: journalSlotsDataMock },
          ConnectionStatus.ONLINE,
          false,
          new Date(),
        ),
      ); // Load in mock journal state
      // ACT
      actions$.next(new journalActions.StartTest(1001));
      // ASSERT
      effects.startTestEffect$.subscribe((result) => {
        if (result instanceof PopulateExaminer) {
          expect(result.payload).toEqual(examiner);
          done();
        }
      });
    });
  });

  describe('activateTestEffect', () => {
    it('should call theMarkAsRekey action', (done) => {
      // ACT
      actions$.next(new journalActions.ActivateTest(1234, true));
      // ASSERT
      effects.activateTestEffect$.subscribe((effect$) => {
        effect$.subscribe((action) => {
          expect(action instanceof rekeyActions.MarkAsRekey).toBe(true);
          done();
        });
      });
    });
  });
});
