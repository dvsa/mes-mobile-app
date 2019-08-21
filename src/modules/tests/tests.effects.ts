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
import { Store, select, Action } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest, isPracticeMode, getCurrentTestSlotId } from './tests.selector';
import { TestSubmissionProvider, TestToSubmit } from '../../providers/test-submission/test-submission';
import { interval } from 'rxjs/observable/interval';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { find, startsWith, omit, has } from 'lodash';
import { HttpResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { TestStatus } from './test-status/test-status.model';
import { getRekeyIndicator } from './rekey/rekey.reducer';
import { isRekey } from './rekey/rekey.selector';
import { TestsModel } from './tests.model';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { getJournalState } from '../../pages/journal/journal.reducer';
import { getSlotsOnSelectedDate } from '../../pages/journal/journal.selector';
import { PopulateExaminer } from './examiner/examiner.actions';
import { PopulateTestSlotAttributes } from './test-slot-attributes/test-slot-attributes.actions';
import { extractTestSlotAttributes } from './test-slot-attributes/test-slot-attributes.selector';
import { PopulateTestCentre } from './test-centre/test-centre.actions';
import { extractTestCentre } from './test-centre/test-centre.selector';
import { PopulateTestCategory } from './category/category.actions';
import { SetExaminerBooked } from './examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from './examiner-conducted/examiner-conducted.actions';
import { SetExaminerKeyed } from './examiner-keyed/examiner-keyed.actions';
import { MarkAsRekey } from './rekey/rekey.actions';

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
    switchMap(([action, tests]) => {
      return this.testPersistenceProvider.persistTests(
        this.getSaveableTestsObject(tests),
      );
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
  startTestEffect$ = this.actions$.pipe(
    ofType(testActions.START_TEST),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getJournalState),
          map(getSlotsOnSelectedDate),
        ),
        this.store$.pipe(
          select(getJournalState),
          map(journal => journal.examiner),
        ),
      ),
    )),
    switchMap(([action, slots, examiner]) => {
      const startTestAction = action as testActions.StartTest;
      const slotData = slots.map(slot => slot.slotData);
      const slot: TestSlot = slotData.find(data => data.slotDetail.slotId === startTestAction.slotId &&
        has(data, 'booking'));
      const { staffNumber, individualId } = examiner;

      const arrayOfActions: Action[] = [
        new PopulateExaminer({ staffNumber, individualId }),
        new PopulateApplicationReference(slot.booking.application),
        new PopulateCandidateDetails(slot.booking.candidate),
        new PopulateTestSlotAttributes(extractTestSlotAttributes(slot)),
        new PopulateTestCentre(extractTestCentre(slot)),
        new testStatusActions.SetTestStatusBooked(startTestAction.slotId.toString()),
        new PopulateTestCategory(slot.booking.application.testCategory),
        new SetExaminerBooked(parseInt(staffNumber, 10)),
        new SetExaminerConducted(parseInt(staffNumber, 10)),
        new SetExaminerKeyed(parseInt(staffNumber, 10)),
      ];

      if (startTestAction.rekey) {
        arrayOfActions.push(new MarkAsRekey());
      }

      return arrayOfActions;
    }),
  );

  @Effect()
  activateTestEffect$ = this.actions$.pipe(
    ofType(testActions.ACTIVATE_TEST),
    filter((action: testActions.ActivateTest) => action.rekey),
    map((action) => {
      const activateTestAction = action as testActions.ActivateTest;
      if (activateTestAction.rekey) {
        return new MarkAsRekey();
      }
    }),
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
        tests.testStatus[slotId] === TestStatus.Completed) &&
        !tests.startedTests[slotId].rekey,
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
  sendCurrentTestEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_CURRENT_TEST),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
        ),
      ),
    )),
    switchMap(([action, tests]: [testActions.SendCurrentTest, TestsModel]) => {
      const slotId = getCurrentTestSlotId(tests);
      const test = getCurrentTest(tests);

      if (!test || this.networkStateProvider.getNetworkState() !== ConnectionStatus.ONLINE) {
        return of(new testActions.SendCurrentTestFailure(slotId));
      }

      const testToSubmit: TestToSubmit[] = [{
        slotId,
        index: 0,
        payload: test,
      }];

      return this.testSubmissionProvider.submitTests(testToSubmit)
        .pipe(
          switchMap((responses: HttpResponse<any>[]) => {
            return responses.map((response, index) => {
              const matchedTests = find(testToSubmit, ['index', index]);
              if (response.status === HttpStatusCodes.CREATED) {
                return new testActions.SendCurrentTestSuccess(matchedTests.slotId);
              }
              return new testActions.SendCurrentTestFailure(matchedTests.slotId);
            });
          }),
        );
    }),
  );

  @Effect()
  sendCurrentTestSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_CURRENT_TEST_SUCCESS),
    switchMap((action: testActions.SendCurrentTestSuccess) => {
      return [
        new testStatusActions.SetTestStatusSubmitted(action.slotId),
        new testActions.PersistTests(),
      ];
    }),
  );
}
