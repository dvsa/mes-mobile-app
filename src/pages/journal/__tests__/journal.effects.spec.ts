
import { TestBed } from '@angular/core/testing';
// import { cold, hot } from 'jasmine-marbles';
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
import { NetworkStateProvider } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';
import { LoadJournal, JournalActionTypes, LoadJournalSuccess, LoadJournalFailure } from '../journal.actions';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

fdescribe('Journal Effects', () => {

  let effects: JournalEffects;
  let actions$: ReplaySubject<JournalActionTypes>;
  let journalProvider: JournalProvider;

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          journal: journalReducer,
        }),
      ],
      providers: [
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        JournalEffects,
        provideMockActions(() => actions$),
        { provide: JournalProvider, useClass: JournalProviderMock },
        { provide: AnalyticsProvider, useClass: AnalyticsProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        { provide: Store, useClass: Store },
        SlotProvider,
      ],
    });
    journalProvider = TestBed.get(JournalProvider);
    effects = TestBed.get(JournalEffects);
  });

  it('should create the journal effects', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch the success action when the journal loads successfully', (done) => {
    actions$.next(new LoadJournal());
    spyOn(journalProvider, 'getJournal').and.callThrough();
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(result instanceof LoadJournalSuccess).toBe(true);
      actions$.next(result);
      done();
    });
  });

  it('should dispatch the failure action when the journal fails to load', (done) => {
    actions$.next(new LoadJournal());
    spyOn(journalProvider, 'getJournal').and.throwError;
    effects.loadJournal$.subscribe((result) => {
      expect(journalProvider.getJournal).toHaveBeenCalled();
      expect(result instanceof LoadJournalFailure).toBe(true);
      done();
    });
  });
});
