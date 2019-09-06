import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, concatMap, catchError } from 'rxjs/operators';

import * as testActions from '../../modules/tests/tests.actions';
import * as rekeyActions from './rekey-reason.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs/observable/of';
import { FindUserProvider } from '../../providers/find-user/find-user';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators/map';

@Injectable()
export class RekeyReasonEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private findUserProvider: FindUserProvider,
  ) { }

  @Effect()
  sendCurrentTestSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_CURRENT_TEST_SUCCESS),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTestSlotId),
        ),
      ),
    )),
    switchMap(([action, slotId]: [testActions.SendCurrentTestSuccess, string]) => {
      return [
        new testStatusActions.SetTestStatusCompleted(slotId),
      ];
    }),
  );

  @Effect()
  findUserEffect$ = this.actions$.pipe(
    ofType(rekeyActions.REKEY_REASON_FIND_USER),
    switchMap((action: rekeyActions.RekeyReasonFindUser) => {
      return this.findUserProvider.userExists(action.staffNumber)
        .pipe(
          map((response: any) => {
            return new rekeyActions.RekeyReasonFindUserSuccess();
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new rekeyActions.RekeyReasonFindUserFailure());
          }),
        );
    }),
  );
}
