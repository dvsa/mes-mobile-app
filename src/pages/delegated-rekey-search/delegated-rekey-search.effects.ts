import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  SEARCH_BOOKED_DELEGATED_TEST,
  SearchBookedDelegatedTest,
  SearchBookedDelegatedTestSuccess,
  SearchBookedDelegatedTestFailure, DelegatedRekeySearchActionTypes,
} from './delegated-rekey-search.actions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';
import { DelegatedRekeySearchErrorMessages } from './delegated-rekey-search-error-model';

@Injectable()
export class DelegatedRekeySearchEffects {

  constructor(
    private actions$: Actions,
    private delegatedRekeySearchProvider: DelegatedRekeySearchProvider,
    private testSearchProvider: SearchProvider,
  ) {
  }

  @Effect()
  getBooking$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_DELEGATED_TEST),
    switchMap((action: SearchBookedDelegatedTest) => {
      return this.testSearchProvider.getTestResult(action.appRef, undefined).pipe(
        switchMap((response: HttpResponse<any>): Observable<DelegatedRekeySearchActionTypes> => {
          return of(new SearchBookedDelegatedTestFailure({
            message: DelegatedRekeySearchErrorMessages.BookingAlreadyCompleted,
          }));
        }),
        catchError((err: HttpErrorResponse): Observable<DelegatedRekeySearchActionTypes> => {
          if (err.status === HttpStatusCodes.BAD_REQUEST) {
            return this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(
              map((testSlot: any) => new SearchBookedDelegatedTestSuccess(testSlot)),
              catchError((err: any) => {
                return of(new SearchBookedDelegatedTestFailure(err));
              }),
            );
          }
          return of(new SearchBookedDelegatedTestFailure(err));
        }),
      );
    }),
  );

}
