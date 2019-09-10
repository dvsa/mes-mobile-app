import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import * as rekeyActions from './rekey-reason.actions';
import { of } from 'rxjs/observable/of';
import { FindUserProvider } from '../../providers/find-user/find-user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class RekeyReasonEffects {
  constructor(
    private actions$: Actions,
    private findUserProvider: FindUserProvider,
  ) { }

  @Effect()
  findUserEffect$ = this.actions$.pipe(
    ofType(rekeyActions.REKEY_REASON_FIND_USER),
    switchMap((action: rekeyActions.RekeyReasonFindUser) => {
      return this.findUserProvider.userExists(action.staffNumber)
        .pipe(
          map((response: HttpResponse<any>) => {
            return new rekeyActions.RekeyReasonFindUserSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new rekeyActions.RekeyReasonFindUserFailure());
          }),
        );
    }),
  );
}
