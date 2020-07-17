import { DelegatedRekeySearchEffects } from '../delegated-rekey-search.effects';
import { ReplaySubject, defer } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { delegatedSearchReducer } from '../delegated-rekey-search.reducer';
import { StoreModule, Store } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as delegatedRekeySearchActions from '../delegated-rekey-search.actions';
import { configureTestSuite } from 'ng-bullet';
import { DelegatedRekeySearchProvider } from '../../../providers/delegated-rekey-search/delegated-rekey-search';

describe('Delegated Rekey Search Effects', () => {

  let effects: DelegatedRekeySearchEffects;
  let actions$: any;
  let delegatedRekeySearchProvider: DelegatedRekeySearchProvider;

  const appRef = '123456';

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          delegatedRekeySearch: delegatedSearchReducer,
        }),
      ],
      providers: [
        DelegatedRekeySearchEffects,
        provideMockActions(() => actions$),
        Store,
        DelegatedRekeySearchProvider,
      ],
    });
  });

  beforeEach(async(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(DelegatedRekeySearchEffects);
    delegatedRekeySearchProvider = TestBed.get(DelegatedRekeySearchProvider);
  }));

  it('should dispatch the SearchBookedTestSuccess action when searched with success', (done) => {

    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef').and.callThrough();

    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest('12345678910'));

    effects.getBooking$.subscribe((result) => {
      expect(result instanceof delegatedRekeySearchActions.SearchBookedDelegatedTestSuccess).toBeTruthy();
      done();
    });

  });

  it('should dispatch the SearchBookedTestFailure action when searched with failure', (done) => {

    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef')
      .and.returnValue(asyncError(new HttpErrorResponse({
        error: 'Error message',
        status: 403,
        statusText: 'Forbidden',
      },
    )));

    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest('12345678911'));

    effects.getBooking$.subscribe((result) => {
      expect(result instanceof delegatedRekeySearchActions.SearchBookedDelegatedTestFailure).toBeTruthy();
      done();
    });

  });

  it('should call getDelegatedExaminerBookingByAppRef on the test search provider', (done) => {

    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef').and.callThrough();

    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest(appRef));

    effects.getBooking$.subscribe((result) => {
      expect(delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef).toHaveBeenCalledWith(appRef);
      done();
    });

  });
});

function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
