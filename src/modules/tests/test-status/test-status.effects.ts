import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError } from 'rxjs/operators';

import * as testStatusActions from './test-status.actions';
import { TestPersistenceProvider } from '../../../providers/test-persistence/test-persistence';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestStatusEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {}

  @Effect({ dispatch: false })
  testDecidedEffect$ = this.actions$.pipe(
    ofType(testStatusActions.TEST_STATUS_DECIDED),
    switchMap(() => this.testPersistenceProvider.persistAllTests()),
    catchError((err) => {
      console.log(`Error persisting tests: ${err}`);
      return of();
    }),
  );

}
