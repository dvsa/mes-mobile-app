import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
// import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { switchMap,
  // map,
  catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import {
  SEARCH_BOOKED_DELEGATED_TEST,
  SearchBookedDelegatedTest,
  // SearchBookedDelegatedTestSuccess,
  // SearchBookedDelegatedTestFailure,
} from './delegated-rekey-search.actions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  RekeySearchActionTypes, SearchBookedTest,
  // SearchBookedTest,
  SearchBookedTestFailure,
  // SearchBookedTestSuccess,
} from '../rekey-search/rekey-search.actions';
import { RekeySearchErrorMessages } from '../rekey-search/rekey-search-error-model';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { SearchProvider } from '../../providers/search/search';

@Injectable()
export class DelegatedRekeySearchEffects {

  constructor(
    private actions$: Actions,
    // private delegatedRekeySearchProvider: DelegatedRekeySearchProvider,
    private testSearchProvider: SearchProvider,
  ) {
  }

  @Effect()
  getBooking$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_DELEGATED_TEST),
    // switchMap((action: SearchBookedDelegatedTest) => {
      // return this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(
      //   // @TODO - MES-5436 - map real response once available
      //   // @TODO - MES-5435 check for existing search results
      //   map((response: HttpResponse<any>) => {
      //     return response.body;
      //   }),
      //   map((testSlot: any) => new SearchBookedDelegatedTestSuccess(testSlot)),
      //   catchError((err: any) => {
      //     return of(new SearchBookedDelegatedTestFailure(err));
      //   }),
      // );
      switchMap((action: SearchBookedTest) => {
        return this.testSearchProvider.applicationReferenceSearch(action.appRef).pipe(
          switchMap((response: HttpResponse<any>): Observable<RekeySearchActionTypes> => {
            return of(new SearchBookedTestFailure({
              message: RekeySearchErrorMessages.BookingAlreadyCompleted,
            }));
          }),
          catchError((err: HttpErrorResponse): Observable<RekeySearchActionTypes> => {
            if (err.status === HttpStatusCodes.BAD_REQUEST) {
              // return this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(
              //   // @TODO - MES-5436 - map real response once available
              //   map((response: HttpResponse<any>) => {
              //     return response.body;
              //   }),
              //   map((testSlot: any) => new SearchBookedDelegatedTestSuccess(testSlot)),
              //   catchError((err: any) => {
              //     return of(new SearchBookedDelegatedTestFailure(err));
              //   }),
              // );
            }
            return of(new SearchBookedTestFailure(err));
          }),
        );
      }),
    );

}
