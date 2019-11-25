import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CompressionProvider } from '../../providers/compression/compression';
import { SearchProvider } from '../../providers/search/search';
import {
  SEARCH_BOOKED_TEST, SearchBookedTest, SearchBookedTestSuccess, SearchBookedTestFailure, RekeySearchActionTypes,
} from './rekey-search.actions';
import { RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RekeySearchEffects {

  constructor(
    private actions$: Actions,
    private testSearchProvider: SearchProvider,
    private rekeySearchProvider: RekeySearchProvider,
    private compressionProvider: CompressionProvider,
  )
  { }

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

}
