import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import * as debriefActions from './debrief.actions';
import * as testStatusActions from '../../modules/tests/test-status/test-status.actions';
import * as testsActions from '../../modules/tests/tests.actions';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from '../../modules/tests/tests.reducer';
import { getCurrentTestSlotId, getCurrentTest, getTestOutcomeText } from '../../modules/tests/tests.selector';
import { TestOutcome } from '../../modules/tests/tests.constants';

@Injectable()
export class DebriefEffects {
  constructor(
    private actions$: Actions,
    private store$: Store<StoreModel>,
  ) {}

  @Effect()
  endDebriefEffect$ = this.actions$.pipe(
    ofType(debriefActions.END_DEBRIEF),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTestSlotId),
      ),
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
        select(getTestOutcomeText),
      ),
    ),
    switchMap(([action, slotId, testOutcome]) => {
      // Passed test flow goes through additional pages before write up
      const testStatusAction = testOutcome === TestOutcome.Passed ?
        new testStatusActions.SetTestStatusDecided(slotId)
        : new testStatusActions.SetTestStatusWriteUp(slotId);
      return [
        testStatusAction,
        new testsActions.PersistTests(),
      ];
    }),
  );
}
