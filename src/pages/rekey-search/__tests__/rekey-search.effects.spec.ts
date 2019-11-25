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
import { CompressionProvider } from '../../../providers/compression/compression';
import { CompressionProviderMock } from '../../../providers/compression/__mocks__/compression.mock';
import { SearchProvider } from '../../../providers/search/search';
import { SearchProviderMock } from '../../../providers/search/__mocks__/search.mock';
import { RekeySearchErrorMessages } from '../rekey-search-error-model';

describe('Rekey Search Effects', () => {

  let effects: RekeySearchEffects;
  let actions$: any;
  let rekeySearchProvider: RekeySearchProvider;
  let compressionProvider: CompressionProvider;
  let testSearchProvider: SearchProvider;

  const appRef = '123456';
  const staffNumber = '654321';

  const getTestResultHttpErrorResponse = new HttpErrorResponse({
    error: 'Error message',
    status: 400,
    statusText: 'Bad request',
  });

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
        { provide: SearchProvider, useClass: SearchProviderMock },
        { provide: CompressionProvider, useClass: CompressionProviderMock },
        Store,
      ],
    });
    effects = TestBed.get(RekeySearchEffects);
    testSearchProvider = TestBed.get(SearchProvider);
    rekeySearchProvider = TestBed.get(RekeySearchProvider);
    compressionProvider = TestBed.get(CompressionProvider);
  });

  it('should dispatch the SearchBookedTestSuccess action when searched with success', (done) => {

    spyOn(testSearchProvider, 'getTestResult').and.returnValue(asyncError(getTestResultHttpErrorResponse));
    spyOn(rekeySearchProvider, 'getBooking').and.callThrough();
    spyOn(compressionProvider, 'extractTestSlotResult');

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getBooking$.subscribe((result) => {
      expect(compressionProvider.extractTestSlotResult).toHaveBeenCalled();
      expect(result instanceof rekeySearchActions.SearchBookedTestSuccess).toBeTruthy();
      done();
    });

  });

  it('should dispatch the SearchBookedTestFailure action when searched with failure', (done) => {

    spyOn(testSearchProvider, 'getTestResult').and.returnValue(asyncError(getTestResultHttpErrorResponse));
    spyOn(rekeySearchProvider, 'getBooking').and.returnValue(asyncError(new HttpErrorResponse({
      error: 'Error message',
      status: 403,
      statusText: 'Forbidden',
    })));

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getBooking$.subscribe((result) => {
      expect(result instanceof rekeySearchActions.SearchBookedTestFailure).toBeTruthy();
      done();
    });

  });

  it('should call getTestResult on the test search provider', (done) => {

    spyOn(testSearchProvider, 'getTestResult').and.callThrough();

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getBooking$.subscribe((result) => {
      expect(testSearchProvider.getTestResult).toHaveBeenCalledWith(appRef, staffNumber);
      done();
    });

  });

  it('should not call getBooking if getTestResult succeeds', (done) => {

    spyOn(rekeySearchProvider, 'getBooking').and.callThrough();

    const expectedFailureAction = new rekeySearchActions.SearchBookedTestFailure({
      message: RekeySearchErrorMessages.BookingAlreadyCompleted,
    });

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getBooking$.subscribe((result) => {
      expect(rekeySearchProvider.getBooking).not.toHaveBeenCalled();
      expect(result).toEqual(expectedFailureAction);
      done();
    });

  });

  it('should call getBooking if getTestResult fails', (done) => {

    spyOn(testSearchProvider, 'getTestResult').and.returnValue(asyncError(getTestResultHttpErrorResponse));
    spyOn(rekeySearchProvider, 'getBooking').and.callThrough();

    actions$.next(new rekeySearchActions.SearchBookedTest(appRef, staffNumber));

    effects.getBooking$.subscribe((result) => {
      expect(rekeySearchProvider.getBooking).toHaveBeenCalledWith({
        staffNumber,
        applicationReference: appRef,
      });
      expect(result instanceof rekeySearchActions.SearchBookedTestSuccess).toBeTruthy();
      done();
    });

  });

});

function asyncError(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}
