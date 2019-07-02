import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { concatMap, withLatestFrom } from 'rxjs/operators';

import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { CONTINUE_FROM_DECLARATION } from './health-declaration.actions';

@Injectable()
export class HealthDeclarationEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  endHealthDeclarationEffect$ = this.actions$.pipe(
    ofType(CONTINUE_FROM_DECLARATION),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTestSlotId),
      ),
    ),
    concatMap(([action, slotId]) => {
      return [
        new testStatusActions.SetTestStatusWriteUp(slotId),
        new testsActions.PersistTests(),
      ];
    }),
  );
}
