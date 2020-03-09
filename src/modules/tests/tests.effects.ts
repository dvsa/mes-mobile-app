import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, filter, map, withLatestFrom, concatMap } from 'rxjs/operators';
import { TestPersistenceProvider } from '../../providers/test-persistence/test-persistence';
import { from, of, interval } from 'rxjs';
import * as testActions from './tests.actions';
import * as testStatusActions from './test-status/test-status.actions';
import { PopulateApplicationReference }
  from './journal-data/common/application-reference/application-reference.actions';
import { PopulateCandidateDetails } from './journal-data/common/candidate/candidate.actions';
import { testReportPracticeModeSlot } from './__mocks__/tests.mock';
import { testReportPracticeSlotId, end2endPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { StoreModel } from '../../shared/models/store.model';
import { Store, select, Action } from '@ngrx/store';
import { getTests } from './tests.reducer';
import { getCurrentTest, isPracticeMode, getCurrentTestSlotId, getCurrentTestStatus } from './tests.selector';
import { TestSubmissionProvider, TestToSubmit } from '../../providers/test-submission/test-submission';
import { AppConfigProvider } from '../../providers/app-config/app-config';
import { NetworkStateProvider, ConnectionStatus } from '../../providers/network-state/network-state';
import { find, startsWith, omit, has } from 'lodash';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCodes } from '../../shared/models/http-status-codes';
import { TestStatus } from './test-status/test-status.model';
import { TestsModel } from './tests.model';
import { TestSlot } from '@dvsa/mes-journal-schema';
import { getJournalState } from '../journal/journal.reducer';
import { getSlotsOnSelectedDate } from '../journal/journal.selector';
import { PopulateExaminer } from './journal-data/common/examiner/examiner.actions';
import { PopulateTestSlotAttributes } from './journal-data/common/test-slot-attributes/test-slot-attributes.actions';
import { extractTestSlotAttributes } from './journal-data/common/test-slot-attributes/test-slot-attributes.selector';
import { PopulateTestCentre } from './journal-data/common/test-centre/test-centre.actions';
import { extractTestCentre } from './journal-data/common/test-centre/test-centre.selector';
import { PopulateTestCategory } from './category/category.actions';
import { PopulateTestSchemaVersion } from './schema-version/schema-version.actions';
import { SetExaminerBooked } from './examiner-booked/examiner-booked.actions';
import { SetExaminerConducted } from './examiner-conducted/examiner-conducted.actions';
import { SetExaminerKeyed } from './examiner-keyed/examiner-keyed.actions';
import { MarkAsRekey } from './rekey/rekey.actions';
import { getRekeySearchState, RekeySearchModel } from '../../pages/rekey-search/rekey-search.reducer';
import { getBookedTestSlot, getStaffNumber } from '../../pages/rekey-search/rekey-search.selector';
import { Examiner, TestSlotAttributes, ConductedLanguage, CategoryCode } from '@dvsa/mes-test-schema/categories/common';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { NavigationStateProvider } from '../../providers/navigation-state/navigation-state';
import { JournalModel } from '../journal/journal.model';
import { PopulateConductedLanguage } from './communication-preferences/communication-preferences.actions';
import { Language } from './communication-preferences/communication-preferences.model';
import { version } from '../../environment/test-schema-version';
import { createPopulateCandidateDetailsAction } from './journal-data/common/candidate/candidate.action-creator';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { PopulateVehicleDimensions } from './vehicle-details/common/vehicle-details.actions';
import {
  InitializeVehicleChecks as InitializeVehicleChecksCatC,
} from './test-data/cat-c/vehicle-checks/vehicle-checks.cat-c.action';
import {
  InitializeVehicleChecks as InitializeVehicleChecksCatD,
}
from './test-data/cat-d/vehicle-checks/vehicle-checks.cat-d.action';
@Injectable()
export class TestsEffects {
  constructor(
    private actions$: Actions,
    private testPersistenceProvider: TestPersistenceProvider,
    private testSubmissionProvider: TestSubmissionProvider,
    private appConfigProvider: AppConfigProvider,
    private networkStateProvider: NetworkStateProvider,
    private store$: Store<StoreModel>,
    public authenticationProvider: AuthenticationProvider,
    private navigationStateProvider: NavigationStateProvider,
  ) { }

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
      ),
    )),
    filter(([action, tests, isPracticeMode]) => !isPracticeMode),
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
        startsWith(key, end2endPracticeSlotId);
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
        ),
        this.store$.pipe(
          select(getRekeySearchState),
        ),
      ),
    )),
    switchMap(([action, journal, rekeySearch]: [testActions.StartTest, JournalModel, RekeySearchModel]) => {
      const startTestAction = action as testActions.StartTest;
      const isRekeySearch = this.navigationStateProvider.isRekeySearch();
      const employeeId = this.authenticationProvider.getEmployeeId() || journal.examiner.staffNumber;

      let slot: TestSlot;
      let examiner: Examiner;

      const examinerKeyed: string = employeeId;

      let examinerBooked: string;

      if (isRekeySearch) {
        examinerBooked = getStaffNumber(rekeySearch);
        examiner = {
          staffNumber: examinerBooked,
        };
        slot = getBookedTestSlot(rekeySearch);
      } else {
        examinerBooked = journal.examiner.staffNumber;
        examiner = journal.examiner;
        const slots = getSlotsOnSelectedDate(journal);
        const slotData = slots.map(slot => slot.slotData);
        slot = slotData.find(data => data.slotDetail.slotId === startTestAction.slotId && has(data, 'booking'));
      }
      const testSlotAttributes: TestSlotAttributes = extractTestSlotAttributes(slot);
      const conductedLanguage: ConductedLanguage = testSlotAttributes.welshTest ? Language.CYMRAEG : Language.ENGLISH;

      examiner.individualId;

      const arrayOfActions: Action[] = [
        new PopulateTestCategory(startTestAction.category),
        new PopulateExaminer(examiner),
        new PopulateApplicationReference(slot.booking.application),
        createPopulateCandidateDetailsAction(startTestAction.category, slot.booking),
        new PopulateTestSlotAttributes(testSlotAttributes),
        new PopulateTestCentre(extractTestCentre(slot)),
        new testStatusActions.SetTestStatusBooked(startTestAction.slotId.toString()),
        new SetExaminerBooked(parseInt(examinerBooked, 10) ? parseInt(examinerBooked, 10) : null),
        new SetExaminerConducted(parseInt(examinerBooked, 10) ? parseInt(examinerBooked, 10) : null),
        new SetExaminerKeyed(parseInt(examinerKeyed, 10) ? parseInt(examinerKeyed, 10) : null),
        new PopulateConductedLanguage(conductedLanguage),
        new PopulateTestSchemaVersion(version),
      ];

      if (startTestAction.category !== TestCategory.B
        && startTestAction.category !== TestCategory.ADI2) {
        arrayOfActions.push(new PopulateVehicleDimensions(
          slot.booking.application.vehicleWidth,
          slot.booking.application.vehicleLength,
        ));
      }

      if (startTestAction.rekey) {
        arrayOfActions.push(new MarkAsRekey());
      }

      if (
        startTestAction.category === TestCategory.C ||
        startTestAction.category === TestCategory.C1 ||
        startTestAction.category === TestCategory.C1E ||
        startTestAction.category === TestCategory.CE) {
        arrayOfActions.push(new InitializeVehicleChecksCatC(startTestAction.category));
      }
      if (
        startTestAction.category === TestCategory.D ||
        startTestAction.category === TestCategory.D1 ||
        startTestAction.category === TestCategory.D1E ||
        startTestAction.category === TestCategory.DE) {
        arrayOfActions.push(new InitializeVehicleChecksCatD(startTestAction.category));
      }
      if (
        startTestAction.category === TestCategory.F ||
        startTestAction.category === TestCategory.G ||
        startTestAction.category === TestCategory.H ||
        startTestAction.category === TestCategory.K) {
        // TODO Replace this with Home Test action
        arrayOfActions.push(new InitializeVehicleChecksCatD(startTestAction.category));
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
        new PopulateTestCategory(slotData.booking.application.testCategory as CategoryCode),
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
  sendPartialTest$ = this.actions$.pipe(
    ofType(testStatusActions.SET_TEST_STATUS_WRITE_UP),
    map(() => new testActions.SendCompletedTests()),
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

      const completedTestKeys = Object.keys(tests.testStatus).filter((slotId: string) =>
        slotId !== testReportPracticeSlotId &&
        !startsWith(slotId, end2endPracticeSlotId) &&
        (tests.testStatus[slotId] === TestStatus.Completed || tests.testStatus[slotId] === TestStatus.WriteUp) &&
        !tests.startedTests[slotId].rekey,
      );

      const completedTests: TestToSubmit[] = completedTestKeys.map((slotId: string, index: number) => ({
        index,
        slotId,
        payload: tests.startedTests[slotId],
        status: tests.testStatus[slotId],
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
                return matchedTests.status === TestStatus.WriteUp
                  ? new testActions.SendPartialTestSuccess(matchedTests.slotId)
                  : new testActions.SendCompletedTestSuccess(matchedTests.slotId);
              }
              return matchedTests.status === TestStatus.WriteUp
                ? new testActions.SendPartialTestsFailure()
                : new testActions.SendCompletedTestsFailure();
            });
          }),
        );
    }),
  );

  @Effect()
  sendPartialTestSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_PARTIAL_TEST_SUCCESS),
    switchMap((action: testActions.SendPartialTestSuccess) => {
      return [
        new testStatusActions.SetTestStatusAutosaved(action.slotId),
        new testActions.PersistTests(),
      ];
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
      const testStatus = getCurrentTestStatus(tests);

      const testToSubmit: TestToSubmit = {
        slotId,
        index: 0,
        payload: test,
        status: testStatus,
      };

      return this.testSubmissionProvider.submitTest(testToSubmit)
        .pipe(
          map((response: HttpResponse<any> | HttpErrorResponse) => {
            if (response.status === HttpStatusCodes.CREATED) {
              return new testActions.SendCurrentTestSuccess();
            }
            return new testActions.SendCurrentTestFailure(response.status === HttpStatusCodes.CONFLICT);
          }),
        );
    }),
  );

  @Effect()
  sendCurrentTestSuccessEffect$ = this.actions$.pipe(
    ofType(testActions.SEND_CURRENT_TEST_SUCCESS),
    concatMap(action => of(action).pipe(
      withLatestFrom(
        this.store$.pipe(
          select(getTests),
          select(getCurrentTestSlotId),
        ),
      ),
    )),
    switchMap(([action, slotId]: [testActions.SendCurrentTestSuccess, string]) => {
      return [
        new testStatusActions.SetTestStatusSubmitted(slotId),
        new testActions.PersistTests(),
      ];
    }),
  );

}
