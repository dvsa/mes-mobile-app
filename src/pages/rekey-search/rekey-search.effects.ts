import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { CompressionProvider } from '../../providers/compression/compression';
import { SearchProvider } from '../../providers/search/search';
import {
  SEARCH_BOOKED_TEST, SearchBookedTest, SearchBookedTestSuccess, SearchBookedTestFailure,
} from './rekey-search.actions';
import { RekeySearchErrorMessages } from './rekey-search-error-model';
import { HttpResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';

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
        switchMap((response: HttpResponse<any>) => {
          console.log('### getTestResult switchMap response');
          console.log(JSON.stringify(response));
          if (response.status === HttpStatusCodes.OK) {
            return of(new SearchBookedTestFailure({
              message: RekeySearchErrorMessages.BookingAlreadyCompleted,
            }));
          }
        }),
        catchError((err: any) => {
          console.log('### getTestResult switchMap err');
          console.log(JSON.stringify(err));
          const rekeySearchParams = {
            applicationReference: action.appRef,
            staffNumber: action.staffNumber,
          };
          return this.rekeySearchProvider.getBooking(rekeySearchParams).pipe(
            map((response) => {
              console.log('### getBooking switchMap response');
              console.log(JSON.stringify(response));
              return this.compressionProvider.extractTestSlotResult(response.toString());
            }),
            map((testSlot: any) => new SearchBookedTestSuccess(testSlot, action.staffNumber)),
            catchError((err: any) => {
              console.log('### getTestResult switchMap err');
              console.log(JSON.stringify(err));
              return of(new SearchBookedTestFailure(err));
            }),
          );
        }),
      );
    }),
  );

}
