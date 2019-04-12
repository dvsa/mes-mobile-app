import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap, filter } from 'rxjs/operators';

import * as testStatusActions from './test-status.actions';
import { TestPersistenceProvider } from '../../../providers/test-persistence/test-persistence';
import { of } from 'rxjs/observable/of';
import { from } from 'rxjs/observable/from';

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

  @Effect()
  loadPersistedTestsEffect$ = this.actions$.pipe(
    ofType(testStatusActions.TEST_STATUS_LOAD),
    switchMap(() => from(this.testPersistenceProvider.loadPersistedTests()).pipe(
      tap(() => console.log('load persisted tests emitted')),
      filter(testsModel => testsModel !== null),
      tap(testsModel => console.log(`made it past null filter, dispatching with ${testsModel}`)),
      map(testsModel => new testStatusActions.TestStatusRestore(testsModel)),
      catchError((err) => {
        console.log(`Error reading persisted tests: ${err}`);
        return of();
      }),
    )),
  );
}
