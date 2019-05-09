import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from } from 'rxjs/observable/from';
import * as testActions from './tests.actions';
import { of } from 'rxjs/observable/of';
import { PopulateApplicationReference } from './application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './candidate/candidate.actions';
import { practiceSlot } from './__mocks__/tests.mock';

@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
  ) {}

  @Effect({ dispatch: false })
  persistTestsEffect$ = this.actions$.pipe(
    ofType(testActions.PERSIST_TESTS),
    switchMap(() => this.testPersistenceProvider.persistAllTests()),
    catchError((err) => {
      console.log(`Error persisting tests: ${err}`);
      return of();
    }),
  );

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

  @Effect()
  startPracticeTestEffect$ = this.actions$.pipe(
    ofType(testActions.START_PRACTICE_TEST),
    switchMap(() => {
      const slotData = {
        ...practiceSlot,
      };

      return [
        new PopulateApplicationReference(slotData.booking.application),
        new PopulateCandidateDetails(slotData.booking.candidate),
      ];
    }),
  );

}
