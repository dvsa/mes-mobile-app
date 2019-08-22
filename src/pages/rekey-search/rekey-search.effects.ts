import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { RekeySearchProvider } from '../../providers/rekey-search/rekey-search';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as rekeySearchActions from './rekey-search.actions';
import { of } from 'rxjs/observable/of';
import { CompressionProvider } from '../../providers/compression/compression';

@Injectable()
export class RekeySearchEffects {

  constructor(
    private actions$: Actions,
    private rekeySearchProvider: RekeySearchProvider,
    private compressionProvider: CompressionProvider,
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
        map(response => this.compressionProvider.extractTestSlotResult(response.toString())),
        map((testSlot: any) => new rekeySearchActions.SearchBookedTestSuccess(testSlot)),
        catchError((err: any) => {
          return of(new rekeySearchActions.SearchBookedTestFailure(err));
        }),
      );
    }),
  );

}
