import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { CompressionProvider } from '../../providers/compression/compression';
import { SearchProvider } from '../../providers/search/search';
import {
  SEARCH_BOOKED_TEST,
  SearchBookedTest,
  SearchBookedTestSuccess,
  SearchBookedTestFailure,
  RekeySearchActionTypes,
  SEARCH_BOOKED_TEST_FOR_STATUS,
} from './rekey-search.actions';
import { RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';

@Injectable()
export class RekeySearchEffects {

  constructor(
    private actions$: Actions,
    private testSearchProvider: SearchProvider,
    private rekeySearchProvider: RekeySearchProvider,
    private compressionProvider: CompressionProvider) {
  }

  @Effect()
  getBooking$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_TEST),
    switchMap((action: SearchBookedTest) => {
      return this.testSearchProvider.getTestResult(action.appRef, action.staffNumber).pipe(
        switchMap((response: HttpResponse<any>): Observable<RekeySearchActionTypes> => {
          return of(new SearchBookedTestFailure({
            message: RekeySearchErrorMessages.BookingAlreadyCompleted,
          }));
        }),
        catchError((err: HttpErrorResponse): Observable<RekeySearchActionTypes> => {
          if (err.status === HttpStatusCodes.BAD_REQUEST) {
            const rekeySearchParams = {
              applicationReference: action.appRef,
              staffNumber: action.staffNumber,
            };
            return this.rekeySearchProvider.getBooking(rekeySearchParams).pipe(
              map(response => this.compressionProvider.extractTestSlotResult(response.toString())),
              map((testSlot: any) => new SearchBookedTestSuccess(testSlot, action.staffNumber)),
              catchError((err: any) => {
                return of(new SearchBookedTestFailure(err));
              }),
            );
          }
          return of(new SearchBookedTestFailure(err));
        }),
      );
    }),
  );

  @Effect()
  getTestSlotStatus$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_TEST_FOR_STATUS),
    tap(() => console.log('called the new action')),
    switchMap((action: SearchBookedTest) => {
      console.log('action', action);
      return this.testSearchProvider.getTestResult(action.appRef, action.staffNumber).pipe(
        switchMap((response: HttpResponse<any>): Observable<any> => {
          console.log('response', response);
          return of(response);
        }), catchError((err) => {
          console.log('err', err);
          return of(err);
        }),
      );
    }),
  );

}
