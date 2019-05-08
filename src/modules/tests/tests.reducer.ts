import * as journalActions from '../../pages/journal/journal.actions';
import * as testActions from './tests.actions';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { combineReducers, Action, createFeatureSelector } from '@ngrx/store';
import { testDataReducer } from './test-data/test-data.reducer';
import { vehicleDetailsReducer } from './vehicle-details/vehicle-details.reducer';
import { accompanimentReducer } from './accompaniment/accompaniment.reducer';
import { instructorDetailsReducer } from './instructor-details/instructor-details.reducer';
import { applicationReferenceReducer } from './application-reference/application-reference.reducer';
import { passCompletionReducer } from './pass-completion/pass-completion.reducer';
import { eyesightTestResultReducer } from './eyesight-test-result/eyesight-test-result.reducer';
import { postTestDeclarationsReducer } from './post-test-declarations/post-test-declarations.reducer';
import { testSummaryReducer } from './test-summary/test-summary.reducer';
import { testStatusReducer } from './test-status/test-status.reducer';
import { testCentreReducer } from './test-centre/test-centre.reducer';
import { testSlotsAttributesReducer } from './test-slot-attributes/test-slot-attributes.reducer';
import { examinerReducer } from './examiner/examiner.reducer';
import { TestsModel } from './tests.model';

const initialState: TestsModel = {
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
    default:
      return slotId ? createStateObject(state, action, slotId) : state;
  }
}

const deriveSlotId = (state: TestsModel, action: Action): string | null => {
  if (action instanceof journalActions.StartTest
      || action instanceof journalActions.ActivateTest
      || action instanceof journalActions.StartPracticeTest) {
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
        ...combineReducers(
          {
            preTestDeclarations: preTestDeclarationsReducer,
            candidate: candidateReducer,
            testData: testDataReducer,
            vehicleDetails: vehicleDetailsReducer,
            accompaniment: accompanimentReducer,
            instructorDetails: instructorDetailsReducer,
            applicationReference: applicationReferenceReducer,
            passCompletion: passCompletionReducer,
            eyesightTestResult: eyesightTestResultReducer,
            postTestDeclarations: postTestDeclarationsReducer,
            testSummary: testSummaryReducer,
            testSlotAttributes: testSlotsAttributesReducer,
            examiner: examinerReducer,
            testCentre: testCentreReducer,
          },
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
