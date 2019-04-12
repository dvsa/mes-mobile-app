import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from } from 'rxjs/observable/from';
import * as testActions from './tests.actions';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {}

  @Effect()
  loadPersistedTestsEffect$ = this.actions$.pipe(
    ofType(testActions.LOAD_PERSISTED_TESTS),
    switchMap(() => from(this.testPersistenceProvider.loadPersistedTests()).pipe(
      filter(testsModel => testsModel !== null),
      map(testsModel => new testActions.LoadPersistedTestsSuccess(testsModel)),
      catchError((err) => {
        console.log(`Error reading persisted tests: ${err}`);
        return of();
      }),
    )),
  );

}
