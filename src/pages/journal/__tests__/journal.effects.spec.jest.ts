
import { TestBed } from '@angular/core/testing';

import { JournalEffects } from '../journal.effects';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { JournalProvider } from '../../../providers/journal/journal'
import { JournalProviderMock } from '../../../providers/journal/__mocks__/journal.mock';
import { SlotProvider } from '../../../providers/slot/slot';
import { StoreModule } from '@ngrx/store';
import { journalReducer } from '../journal.reducer';
import { AppConfigProvider } from '../../../providers/app-config/app-config';
import { AppConfigProviderMock } from '../../../providers/app-config/__mocks__/app-config.mock';
import { NetworkStateProvider } from '../../../providers/network-state/network-state';
import { NetworkStateProviderMock } from '../../../providers/network-state/__mocks__/network-state.mock';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream$(source$: Observable<any>) {
    this.source = source$;
  }
}

describe('Journal Effects', () => {

  // @ts-ignore

  let effects: JournalEffects;

  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [
        // any modules needed
        StoreModule.forRoot({
          journal: journalReducer
        }),
      ],
      providers: [
        JournalEffects,
        {
          provide: Actions,
          useFactory: () => new TestActions(),
        },
        { provide: JournalProvider, useClass: JournalProviderMock },
        { provide: AppConfigProvider, useClass: AppConfigProviderMock },
        { provide: NetworkStateProvider, useClass: NetworkStateProviderMock },
        SlotProvider,
      ]
    });

    effects = TestBed.get(JournalEffects);
  })

  it('should create the journal effects', () => {
    expect(effects).toBeTruthy();
  });

  it('should load journal data', () => {
    // todo - scaffold the load journal test
  });
});
