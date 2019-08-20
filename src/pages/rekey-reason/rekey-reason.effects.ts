import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';

import * as testActions from '../../modules/tests/tests.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs/observable/of';

@Injectable()
export class OfficeEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

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
}
