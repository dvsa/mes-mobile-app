import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DelegatedRekeySearchProvider } from '../../providers/delegated-rekey-search/delegated-rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  SEARCH_BOOKED_DELEGATED_TEST,
  SearchBookedDelegatedTest,
  SearchBookedDelegatedTestSuccess,
  SearchBookedDelegatedTestFailure,
} from './delegated-rekey-search.actions';
import { HttpResponse } from '@angular/common/http';

@Injectable()
export class DelegatedRekeySearchEffects {

  constructor(
    private actions$: Actions,
    private delegatedRekeySearchProvider: DelegatedRekeySearchProvider,
  )
  { }

  @Effect()
  getBooking$ = this.actions$.pipe(
    ofType(SEARCH_BOOKED_DELEGATED_TEST),
    switchMap((action: SearchBookedDelegatedTest) => {
      return this.delegatedRekeySearchProvider.getDelegatedExaminerBookingByAppRef(action.appRef).pipe(
        // @TODO - MES-5436 - map real response once available
        // @TODO - MES-5435 check for existing search results
        map((response: HttpResponse<any>) => {
          return response.body;
        }),
        map((testSlot: any) => new SearchBookedDelegatedTestSuccess(testSlot)),
        catchError((err: any) => {
          return of(new SearchBookedDelegatedTestFailure(err));
        }),
      );
    }),
  );

}
