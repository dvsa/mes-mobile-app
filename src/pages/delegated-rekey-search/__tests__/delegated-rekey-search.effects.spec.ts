import { DelegatedRekeySearchEffects } from '../delegated-rekey-search.effects';
import { defer, ReplaySubject } from 'rxjs';
import { async, TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { delegatedSearchReducer } from '../delegated-rekey-search.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import * as delegatedRekeySearchActions from '../delegated-rekey-search.actions';
import { configureTestSuite } from 'ng-bullet';
import { DelegatedRekeySearchProvider } from '../../../providers/delegated-rekey-search/delegated-rekey-search';
import { SearchProvider } from '../../../providers/search/search';
import { HttpStatusCodes } from '../../../shared/models/http-status-codes';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { DelegatedRekeySearchErrorMessages } from '../delegated-rekey-search-error-model';

describe('Delegated Rekey Search Effects', () => {

  let effects: DelegatedRekeySearchEffects;
  let actions$: any;
  let delegatedRekeySearchProvider: DelegatedRekeySearchProvider;
  let searchProvider: SearchProvider;

  const getTestResultHttpErrorResponse = (status: HttpStatusCodes = 400): HttpErrorResponse => {
    return new HttpErrorResponse({
      status,
      error: 'Error message',
      statusText: 'Bad request',
    });
  };

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
        { provide: SearchProvider, useClass: SearchProviderMock },
      ],
    });
  });

  beforeEach(async(() => {
    actions$ = new ReplaySubject(1);
    effects = TestBed.get(DelegatedRekeySearchEffects);
    delegatedRekeySearchProvider = TestBed.get(DelegatedRekeySearchProvider);
    searchProvider = TestBed.get(SearchProvider);
  }));

  it('should dispatch the SearchBookedTestSuccess action when searched with success', (done) => {

    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef').and.callThrough();
    spyOn(searchProvider, 'getTestResult')
      .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest('12345678910'));

    effects.getBooking$.subscribe((result) => {
      expect(result instanceof delegatedRekeySearchActions.SearchBookedDelegatedTestSuccess).toBeTruthy();
      done();
    });

  });

  it('should dispatch the SearchBookedTestFailure action when searched with failure', (done) => {
    spyOn(searchProvider, 'getTestResult')
      .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
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
    spyOn(searchProvider, 'getTestResult')
      .and.returnValue(asyncError(getTestResultHttpErrorResponse(HttpStatusCodes.BAD_REQUEST)));
    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef').and.callThrough();

    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest(appRef));

    effects.getBooking$.subscribe((result) => {
      expect(delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef).toHaveBeenCalledWith(appRef);
      done();
    });

  });

  it('should not call getBooking if getTestResult succeeds', (done) => {

    spyOn(delegatedRekeySearchProvider, 'getDelegatedExaminerBookingByAppRef').and.callThrough();

    const expectedFailureAction = new delegatedRekeySearchActions.SearchBookedDelegatedTestFailure({
      message: DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted,
    });
    actions$.next(new delegatedRekeySearchActions.SearchBookedDelegatedTest(appRef));

    effects.getBooking$.subscribe((result) => {
      expect(delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef).not.toHaveBeenCalled();
      expect(result).toEqual(expectedFailureAction);
      done();
    });

  });

});

function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
