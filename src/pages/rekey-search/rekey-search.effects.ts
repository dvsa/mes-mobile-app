import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as rekeySearchActions from './rekey-search.actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class RekeySearchEffects {

  constructor(
    private actions$: Actions,
    private rekeySearchProvider: RekeySearchProvider,
  )
  { }

  @Effect()
  getTest$ = this.actions$.pipe(
    ofType(rekeySearchActions.SEARCH_BOOKED_TEST),
    switchMap((action: rekeySearchActions.SearchBookedTest) => {
      const rekeySearchParams = {
        applicationReference: action.appRef,
        staffNumber: action.staffNumber,
      };
      return this.rekeySearchProvider.getTest(rekeySearchParams).pipe(
        map((response: any) => {
          return new rekeySearchActions.SearchBookedTestSuccess(response);
        }),
        catchError((err: any) => {
          return of(new rekeySearchActions.SearchBookedTestFailure(err));
        }),
      );
    }),
  );

}
