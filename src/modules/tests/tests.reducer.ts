import * as journalActions from '../../pages/journal/journal.actions';
import * as testActions from './tests.actions';

import { TestsModel } from './tests.model';
import * as testStatusActions from './test-status/test-status.actions';
import { combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import { nestedCombineReducers } from 'nested-combine-reducers';

import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { testDataReducer } from './test-data/test-data.reducer';
import { vehicleDetailsReducer } from './vehicle-details/vehicle-details.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { instructorDetailsReducer } from './instructor-details/instructor-details.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';
import { eyesightTestResultReducer } from './eyesight-test-result/eyesight-test-result.reducer';
import { postTestDeclarationsReducer } from './post-test-declarations/post-test-declarations.reducer';
import { testSummaryReducer } from './test-summary/test-summary.reducer';
import { testStatusReducer } from './test-status/test-status.reducer';
import { communicationPreferencesReducer } from './communication-preferences/communication-preferences.reducer';
import { examinerReducer } from './examiner/examiner.reducer';
import { testCentreReducer } from './test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from './test-slot-attributes/test-slot-attributes.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { applicationReferenceReducer } from './application-reference/application-reference.reducer';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';
import * as fakeJournalActions from '../../pages/fake-journal/fake-journal.actions';
import { testReportPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';

export const initialState: TestsModel = {
  currentTest: { slotId: null },
  startedTests: {},
  testStatus: {},
};

/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export function testsReducer(
  state = initialState,
  action: testActions.Types | journalActions.JournalActionTypes | fakeJournalActions.Types) {

  const slotId = deriveSlotId(state, action);
  switch (action.type){
    case testActions.LOAD_PERSISTED_TESTS_SUCCESS:
      return (<testActions.LoadPersistedTestsSuccess>action).tests;
    case testActions.SET_ACTIVITY_CODE:
      return {
        ...state,
        startedTests: {
          ...state.startedTests,
          [slotId]: {
            ...state.startedTests[slotId],
            activityCode: action.payload,
          },
        },
      };
    case testActions.START_TEST_REPORT_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId) : state;
    case fakeJournalActions.START_E2E_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId) : state;
    default:
      return slotId ? createStateObject(state, action, slotId) : state;
  }
}

const deriveSlotId = (state: TestsModel, action: Action): string | null => {
  if (action instanceof testActions.StartTestReportPracticeTest) {
    return testReportPracticeSlotId;
  }

  if (action instanceof journalActions.StartTest
      || action instanceof journalActions.ActivateTest
      || action instanceof fakeJournalActions.StartE2EPracticeTest) {
    return `${action.slotId}`;
  }

  return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};

const createStateObject = (state: TestsModel, action: Action, slotId: string) => {
  return {
    ...state,
    startedTests: {
      ...state.startedTests,
      [slotId]: {
        ...state.startedTests[slotId],
        // Each sub-reducer deals with state scoped to a specific test and has no knowledge of
        // the context of which test contains it that state.
        // Here, combineReducers delegates management of the sub-state navigated here for a given
        // slotId to the relevant sub-reducer
        ...nestedCombineReducers(
          {
            journalData:  {
              examiner: examinerReducer,
              testCentre: testCentreReducer,
              testSlotAttributes: testSlotsAttributesReducer,
              candidate: candidateReducer,
              applicationReference: applicationReferenceReducer,
            },
            preTestDeclarations: preTestDeclarationsReducer,
            eyesightTestResult: eyesightTestResultReducer,
            accompaniment: accompanimentReducer,
            vehicleDetails: vehicleDetailsReducer,
            instructorDetails: instructorDetailsReducer,
            testData: testDataReducer,
            passCompletion: passCompletionReducer,
            postTestDeclarations: postTestDeclarationsReducer,
            testSummary: testSummaryReducer,
            communicationPreferences: communicationPreferencesReducer,
          }, combineReducers,
        )(
          // The redux pattern necessitates that the state tree be initialised
          // with all its properties declared. This conflicts with the
          // 'StandardCarTestCATBSchema' TS interface as many of its properties are optional (?).
          // In order to reconcile the TS interface and the redux reducer pattern we use
          // the TS 'Required' mapped type which The 'Required' type which strips ? modifiers
          // from all properties of 'StandardCarTestCATBSchema', thus making all properties required.
          state.startedTests[slotId] as Required<StandardCarTestCATBSchema>,
          action,
        ),
      },
    },
    currentTest: {
      slotId,
    },
    testStatus: testStatusReducer(state.testStatus, action as testStatusActions.Types),
  };
};

const removeTest = (state: TestsModel, slotId: string): TestsModel => {
  const { [slotId]: removedStartedTest, ...updatedStartedTests } = state.startedTests;
  const { [slotId]: removedTestStatus, ...updatedTestStatus } = state.testStatus;
  return {
    ...state,
    currentTest: {
      ...initialState.currentTest,
    },
    startedTests: updatedStartedTests,
    testStatus: updatedTestStatus,
  };
};

export const getTests = createFeatureSelector<TestsModel>('tests');
