import * as journalActions from '../../modules/journal/journal.actions';
import * as testsActions from './tests.actions';
import { TestsModel } from './tests.model';
import * as testStatusActions from './test-status/test-status.actions';
import { Action, createFeatureSelector } from '@ngrx/store';
import { testStatusReducer } from './test-status/test-status.reducer';
import * as fakeJournalActions from '../../pages/fake-journal/fake-journal.actions';
import { testReportPracticeSlotId } from '../../shared/mocks/test-slot-ids.mock';
import { get } from 'lodash';
import { testsReducerFactory } from './tests-reducer-factory';

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
  action: testsActions.Types | journalActions.JournalActionTypes | fakeJournalActions.Types,
  ): TestsModel {

  const slotId = deriveSlotId(state, action);
  const category = deriveCategory(state, action, slotId);
  switch (action.type) {
    case testsActions.LOAD_PERSISTED_TESTS_SUCCESS:
      return (<testsActions.LoadPersistedTestsSuccess>action).tests;
    case testsActions.START_TEST_REPORT_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
    case fakeJournalActions.START_E2E_PRACTICE_TEST:
      return slotId ? createStateObject(removeTest(state, slotId), action, slotId, category) : state;
    default:
      return slotId ? createStateObject(state, action, slotId, category) : state;
  }
}

const deriveSlotId = (state: TestsModel, action: Action): string | null => {
  if (action instanceof testsActions.StartTestReportPracticeTest) {
    return testReportPracticeSlotId;
  }

  if (action instanceof testsActions.StartTest
      || action instanceof testsActions.ActivateTest
      || action instanceof fakeJournalActions.StartE2EPracticeTest) {
    return `${action.slotId}`;
  }

  return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};

const deriveCategory = (state: TestsModel, action: Action, slotId: string | null): string => {
  if (action instanceof testsActions.StartTest
      || action instanceof testsActions.ActivateTest
      || action instanceof testsActions.StartTestReportPracticeTest
      || action instanceof fakeJournalActions.StartE2EPracticeTest) {
    return action.category;
  }

  return get(state.startedTests[slotId], 'category', null);
};

const createStateObject = (state: TestsModel, action: Action, slotId: string, category: string): TestsModel => {
  return {
    ...state,
    startedTests: {
      ...state.startedTests,
      [slotId]: {
<<<<<<< HEAD
        ...testsReducerFactory(category, action, state.startedTests[slotId]),
=======
        ...state.startedTests[slotId],
        // Each sub-reducer deals with state scoped to a specific test and has no knowledge of
        // the context of which test contains it that state.
        // Here, combineReducers delegates management of the sub-state navigated here for a given
        // slotId to the relevant sub-reducer
        ...nestedCombineReducers(
          {
            version: schemaVersionReducer,
            category: categoryReducer,
            journalData: {
              examiner: examinerReducer,
              testCentre: testCentreReducer,
              testSlotAttributes: testSlotsAttributesReducer,
              candidate: candidateReducer,
              applicationReference: applicationReferenceReducer,
            },
            preTestDeclarations: preTestDeclarationsReducer,
            accompaniment: accompanimentReducer,
            vehicleDetails: vehicleDetailsReducer,
            instructorDetails: instructorDetailsReducerFactory(get(state.startedTests[slotId], 'category')),
            testData: testDataReducerFactory(get(state.startedTests[slotId], 'category')),
            passCompletion: passCompletionReducer,
            postTestDeclarations: postTestDeclarationsReducer,
            testSummary: testSummaryReducer,
            communicationPreferences: communicationPreferencesReducer,
            rekey: rekeyReducer,
            rekeyDate: rekeyDateReducer,
            rekeyReason: rekeyReasonReducer,
            examinerBooked: examinerBookedReducer,
            examinerConducted: examinerConductedReducer,
            examinerKeyed: examinerKeyedReducer,
            changeMarker: changeMarkerReducer,
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
>>>>>>> MES-3636: Handling Different Categories in NGRX Store (#803)
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
