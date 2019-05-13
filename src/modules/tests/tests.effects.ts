import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map, withLatestFrom } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from } from 'rxjs/observable/from';
import * as testActions from './tests.actions';
import * as testStatusActions from './test-status/test-status.actions';
import { of } from 'rxjs/observable/of';
import { PopulateApplicationReference } from './application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './candidate/candidate.actions';
import { practiceSlot } from './__mocks__/tests.mock';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest } from './tests.selector';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';

@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
    private testSubmissionProvider: TestSubmissionProvider,
    private store$: Store<StoreModel>,
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

  @Effect()
  completeTestEffect$ = this.actions$.pipe(
    ofType(testStatusActions.TEST_STATUS_COMPLETED),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
      ),
    ),
    switchMap(([action, tests]) => {
      const currentTest = getCurrentTest(tests);
      return of(new testActions.SendTest(currentTest));
    }),
  );

  @Effect()
  sendTestEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_TEST),
    switchMap((action: testActions.SendTest) => {
      return this.testSubmissionProvider.submitTests([action.payload])
        .pipe(
          map((response: any) => {
            return new testActions.SendTestSuccess();
          }),
          catchError((err: any) => {
            return of(new testActions.SendTestFailure());
          }),
        );
    }),
  );

  @Effect()
  sendTestSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_TEST_SUCCESS),
    switchMap((action) => {
      return of(new testStatusActions.TestStatusSubmitted());
    }),
  );

}
