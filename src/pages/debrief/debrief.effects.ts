import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom, concatMap } from 'rxjs/operators';

import * as debriefActions from './debrief.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';
import { of } from 'rxjs';

@Injectable()
export class DebriefEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  endDebriefEffect$ = this.actions$.pipe(
    ofType(debriefActions.END_DEBRIEF),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTestSlotId),
        ),
      ),
    )),
    switchMap(([action, slotId]) => {
      return [
        new testStatusActions.SetTestStatusDecided(slotId),
        new testsActions.PersistTests(),
      ];
    }),
  );
}
