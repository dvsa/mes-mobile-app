import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as testDataActions from './test-data.actions';
import { PersistTests } from '../tests.actions';

@Injectable()
export class TestDataEffects {
  constructor(
    private actions$: Actions,
  ) {}

  @Effect()
  addDangerousFaultCommentEffect$ = this.actions$.pipe(
    ofType(testDataActions.ADD_DANGEROUS_FAULT_COMMENT),
    map(() => new PersistTests()),
  );

  @Effect()
  addSeriousFaultCommentEffect$ = this.actions$.pipe(
    ofType(testDataActions.ADD_SERIOUS_FAULT_COMMENT),
    map(() => new PersistTests()),
  );

  @Effect()
  addDrivingFaultCommentEffect$ = this.actions$.pipe(
    ofType(testDataActions.ADD_DRIVING_FAULT_COMMENT),
    map(() => new PersistTests()),
  );
}
