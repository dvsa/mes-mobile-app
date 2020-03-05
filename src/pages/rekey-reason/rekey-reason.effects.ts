import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { catchError, concatMap, withLatestFrom, switchMap } from 'rxjs/operators';

import * as rekeyActions from './rekey-reason.actions';
import { of } from 'rxjs';
import { FindUserProvider } from '../../providers/find-user/find-user';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as testActions from '../../modules/tests/tests.actions';
import { select, Store } from '@ngrx/store';
import { getCurrentTest } from '../../modules/tests/tests.selector';
import { StoreModel } from '../../shared/models/store.model';
import { getTests } from '../../modules/tests/tests.reducer';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';

@Injectable()
export class RekeyReasonEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
    private findUserProvider: FindUserProvider,
  ) { }

  @Effect()
  rekeyReasonValidateTransferEffect$ = this.actions$.pipe(
    ofType(rekeyActions.VALIDATE_TRANSFER_REKEY),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
        ),
      ),
    )),
    switchMap(([action, test]: [rekeyActions.ValidateTransferRekey, CatBUniqueTypes.TestResult]) => {
      if (test.examinerBooked === test.examinerConducted) {
        return of(new testActions.SendCurrentTest());
      }

      return this.findUserProvider.userExists(test.examinerConducted)
        .pipe(
          switchMap((response: HttpResponse<any>) => {
            return of(new testActions.SendCurrentTest());
          }),
          catchError((error: HttpErrorResponse) => {
            return of(new rekeyActions.ValidateTransferRekeyFailed(error.status === HttpStatusCodes.NOT_FOUND));
          }),
        );
    }),
  );
}
