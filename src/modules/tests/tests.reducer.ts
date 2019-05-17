import * as journalActions from '../../pages/journal/journal.actions';
import * as testActions from './tests.actions';

import { TestsModel } from './tests.model';
import { startsWith } from 'lodash';
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

export const initialState: TestsModel = {
  currentTest: { slotId: null },
  startedTests: {},
  testLifecycles: {},
};

/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export function testsReducer(
  state = initialState,
  action: testActions.Types | journalActions.JournalActionTypes) {

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
    case testActions.START_PRACTICE_TEST:
      const { [slotId]: removedStartedTest, ...updatedStartedTests } = state.startedTests;
      const { [slotId]: removedTestLifecycle, ...updatedTestLifecycles } = state.testLifecycles;
      const newState = {
        ...state,
        currentTest: {
          ...initialState.currentTest,
        },
        startedTests: updatedStartedTests,
        testLifecycles: updatedTestLifecycles,
      };
      return slotId ? createStateObject(newState, action, slotId) : state;
    default:
      return slotId ? createStateObject(state, action, slotId) : state;
  }
}

const deriveSlotId = (state: TestsModel, action: Action): string | null => {
  if (action instanceof testActions.StartPracticeTest) {
    if (!startsWith(action.slotId, 'practice_')) {
      return `practice_${action.slotId}`;
    }
    return `${action.slotId}`;
  }
  if (action instanceof journalActions.StartTest
      || action instanceof journalActions.ActivateTest) {
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
        // @ts-ignore
        )(state.startedTests[slotId], action),
      },
    },
    currentTest: {
      slotId,
    },
    testLifecycles: {
      ...state.testLifecycles,
      [slotId]: testStatusReducer(state.testLifecycles[slotId], action),
    },
  };
};

export const getTests = createFeatureSelector<TestsModel>('tests');
