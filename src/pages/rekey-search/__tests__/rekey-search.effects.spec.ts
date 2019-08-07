import { RekeySearchEffects } from '../rekey-search.effects';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { rekeySearchReducer } from '../rekey-search.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { RekeySearchProvider } from '../../../providers/rekey-search/rekey-search';
import { RekeySearchProviderMock } from '../../../providers/rekey-search/__mocks__/rekey-search.mock';
import * as rekeySearchActions from '../rekey-search.actions';
import { defer } from 'rxjs/observable/defer';

describe('Rekey Search Effects', () => {

  let effects: RekeySearchEffects;
  let actions$: any;
  let rekeySearchProvider: RekeySearchProvider;

  const appRef = '123456';
  const staffNumber = '654321';

  beforeEach(() => {
    actions$ = new ReplaySubject(1);
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          rekeySearch: rekeySearchReducer,
        }),
      ],
      providers: [
        RekeySearchEffects,
        provideMockActions(() => actions$),
        { provide: RekeySearchProvider, useClass: RekeySearchProviderMock },
        Store,
      ],
    });
    effects = TestBed.get(RekeySearchEffects);
    rekeySearchProvider = TestBed.get(RekeySearchProvider);
  });

  it('should dispatch the SearchBookedTestSuccess action when searched with success', (done) => {

    spyOn(rekeySearchProvider, 'getTest').and.callThrough();

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getTest$.subscribe((result) => {
      expect(result instanceof rekeySearchActions.SearchBookedTestSuccess).toBeTruthy();
      done();
    });

  });

  it('should dispatch the SearchBookedTestFailure action when searched with failure', (done) => {

    spyOn(rekeySearchProvider, 'getTest').and.returnValue(asyncError(new HttpErrorResponse({
      error: 'Error message',
      status: 403,
      statusText: 'Forbidden',
    })));

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getTest$.subscribe((result) => {
      expect(result instanceof rekeySearchActions.SearchBookedTestFailure).toBeTruthy();
      done();
    });

  });

});

function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
