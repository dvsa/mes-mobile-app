import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import * as waitingRoomActions from './waiting-room.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId } from '../../modules/tests/tests.selector';

@Injectable()
export class WaitingRoomEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  submitWaitingRoomInfoEffect$ = this.actions$.pipe(
    ofType(waitingRoomActions.SUBMIT_WAITING_ROOM_INFO),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTestSlotId),
      ),
    ),
    switchMap(([action, slotId]) => {
      return [
        new testStatusActions.SetTestStatusStarted(slotId),
        new testsActions.PersistTests(),
      ];
    }),
  );
}
