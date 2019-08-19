import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from } from 'rxjs/observable/from';
import * as testActions from './tests.actions';
import * as testStatusActions from './test-status/test-status.actions';
import { of } from 'rxjs/observable/of';
import { PopulateApplicationReference } from './application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './candidate/candidate.actions';
import { testReportPracticeModeSlot } from './__mocks__/tests.mock';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest, isPracticeMode } from './tests.selector';
import { TestSubmissionProvider, TestToSubmit } from '../../providers/test-submission/test-submission';
import { interval } from 'rxjs/observable/interval';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { find, startsWith, omit } from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { TestStatus } from './test-status/test-status.model';
import { getRekeyIndicator } from './rekey/rekey.reducer';
import { isRekey } from './rekey/rekey.selector';
import { TestsModel } from './tests.model';

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
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
        this.store$.pipe(
          select(getTests),
          select(isPracticeMode),
        ),
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
          select(getRekeyIndicator),
          map(isRekey),
        ),
      ),
    )),
    filter(([action, tests, isPracticeMode, isRekey]) => !isPracticeMode && !isRekey),
    switchMap(([aciton, tests]) => {
      return this.testPersistenceProvider.persistTests(
        this.getSaveableTestsObject(tests),
      )
        .then(() => console.log('saved successfuly'))
        .catch(err => console.log('error', err));
    }),
    catchError((err) => {
      console.log(`Error persisting tests: ${err}`);
      return of();
    }),
  );

  getSaveableTestsObject(tests: TestsModel): TestsModel {
    const testsNotToSave = Object.keys(tests.startedTests).filter((key) => {
      return startsWith(key, testReportPracticeSlotId) ||
        startsWith(key, end2endPracticeSlotId) ||
        tests.startedTests[key].rekey;
    });

    return {
      currentTest: {
        slotId: testsNotToSave.includes(tests.currentTest.slotId) ? null : tests.currentTest.slotId,
      },
      startedTests: omit(tests.startedTests, testsNotToSave),
      testStatus: omit(tests.testStatus, testsNotToSave),
    };
  }

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
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    filter(() => this.networkStateProvider.getNetworkState() === ConnectionStatus.ONLINE),
    switchMap(([action, tests]) => {

      const completedTestKeys = Object.keys(tests.testStatus).filter((slotId: string) => (
        slotId !== testReportPracticeSlotId &&
        !startsWith(slotId, end2endPracticeSlotId) &&
        tests.testStatus[slotId] === TestStatus.Completed),
      );

      const completedTests: TestToSubmit[] = completedTestKeys.map((slotId: string, index: number) => ({
        index,
        slotId,
        payload: tests.startedTests[slotId],
      }));

      if (completedTests.length === 0) {
        return of();
      }

      return this.testSubmissionProvider.submitTests(completedTests)
        .pipe(
          switchMap((responses: HttpResponse<any>[]) => {
            return responses.map((response, index) => {
              const matchedTests = find(completedTests, ['index', index]);
              if (response.status === HttpStatusCodes.CREATED) {
                return new testActions.SendCompletedTestSuccess(matchedTests.slotId);
              }
              return new testActions.SendCompletedTestsFailure();
            });
          }),
        );
    }),
  );

  @Effect()
  sendCompletedTestsSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_COMPLETED_TEST_SUCCESS),
    switchMap((action: testActions.SendCompletedTestSuccess) => {
      return [
        new testStatusActions.SetTestStatusSubmitted(action.completedTestId),
        new testActions.PersistTests(),
      ];
    }),
  );

  @Effect()
  setTestStatusCompletedEffect$ = this.actions$.pipe(
    ofType(testStatusActions.SET_TEST_STATUS_COMPLETED),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTest),
        ),
      ),
    )),
    map(([action, currentTest]) => {
      return new testActions.SendCompletedTests();
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
