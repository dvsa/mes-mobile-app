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
import {
  testReportPracticeModeSlot,
  testReportPracticeSlotId,
  end2endPracticeSlotId,
} from './__mocks__/tests.mock';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest, getCurrentTestSlotId } from './tests.selector';
import { TestSubmissionProvider } from '../../providers/test-submission/test-submission';
import { interval } from 'rxjs/observable/interval';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';

@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
    private testSubmissionProvider: TestSubmissionProvider,
    private appConfigProvider: AppConfigProvider,
    private networkStateProvider: NetworkStateProvider,
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
    ofType(testActions.START_TEST_REPORT_PRACTICE_TEST),
    switchMap(() => {
      const slotData = {
        ...testReportPracticeModeSlot,
      };

      return [
        new PopulateApplicationReference(slotData.booking.application),
        new PopulateCandidateDetails(slotData.booking.candidate),
      ];
    }),
  );

  @Effect()
  startSendingCompletedTestsEffect$ = this.actions$.pipe(
    ofType(testActions.START_SENDING_COMPLETED_TESTS),
    switchMap(() => {
      return interval(this.appConfigProvider.getAppConfig().tests.autoSendInterval)
        .pipe(
          map(() => new testActions.SendCompletedTests()),
        );
    }),
  );

  @Effect()
  sendCompletedTestsEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_COMPLETED_TESTS),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
      ),
    ),
    filter(() => this.networkStateProvider.getNetworkState() === ConnectionStatus.ONLINE),
    switchMap(([action, tests]) => {

      const completedTestKeys = Object.keys(tests.testStatus).filter((slotId: string) => (
        slotId !== testReportPracticeSlotId &&
        slotId !== end2endPracticeSlotId &&
        tests.testStatus[slotId] === 'Completed'),
      );

      const completedTests = completedTestKeys.map(slotId => tests.startedTests[slotId]);

      if (completedTests.length === 0) {
        return of();
      }

      return this.testSubmissionProvider.submitTests(completedTests)
        .pipe(
          map((response: any) => {
            return new testActions.SendCompletedTestsSuccess(completedTestKeys);
          }),
          catchError((err: any) => {
            return of(new testActions.SendCompletedTestsFailure());
          }),
        );
    }),
  );

  @Effect()
  sendCompletedTestsSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_COMPLETED_TESTS_SUCCESS),
    switchMap((action: testActions.SendCompletedTestsSuccess) => {
      return [
        ...action.completedTestIds.map(id => new testStatusActions.SetTestStatusSubmitted(id)),
        new testActions.PersistTests(),
      ];
    }),
  );

  @Effect()
  setTestStatusCompletedEffect$ = this.actions$.pipe(
    ofType(testStatusActions.SET_TEST_STATUS_COMPLETED),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTest),
      ),
    ),
    map(([action, currentTest]) => {
      return new testActions.SendTest(currentTest);
    }),
  );

  @Effect()
  sendTestEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_TEST),
    withLatestFrom(
      this.store$.pipe(
        select(getTests),
        select(getCurrentTestSlotId),
      ),
    ),
    switchMap(([action, currentTestSlotId]) => {
      const sendTestAction = action as testActions.SendTest;
      return this.testSubmissionProvider.submitTests([sendTestAction.payload])
        .pipe(
          map((response: any) => {
            return new testActions.SendTestSuccess(currentTestSlotId);
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
    switchMap((action: testActions.SendTestSuccess) => {
      return [
        new testStatusActions.SetTestStatusSubmitted(action.slotId),
        new testActions.PersistTests(),
      ];
    }),
  );

}
