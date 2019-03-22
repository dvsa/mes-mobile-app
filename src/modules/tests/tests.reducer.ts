import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { combineReducers } from '@ngrx/store';
import { StandardCarTestCATBSchema } from '@dvsa/mes-test-schema/categories/B';

// Extend this with any new test domain action types
type TestAction = preTestDeclarationActions.Types | testOutcomeActions.Types;

export interface CurrentTest {
  slotId: string;
}

export interface TestsModel {
  currentTest: CurrentTest;
  startedTests: { [slotId: string]: StandardCarTestCATBSchema };
}

const initialState: TestsModel = {
  currentTest: { slotId: null },
  startedTests: {},
};

/**
 * Handles actions relating to a particular test by finding which test the actions apply to
 * and applying a test capture domain concept reducer against that test's portion of the state.
 * @param state Test state for all tests
 * @param action The action to modify the state
 */
export const testsReducer = (
  state = initialState,
  action: TestAction,
) => {
  const slotId = deriveSlotId(state, action);
  if (!slotId) {
    return state;
  }

  const res = {
    ...state,
    startedTests: {
      ...state.startedTests,
      [slotId]: {
        ...combineReducers(
          {
            preTestDeclarations: preTestDeclarationsReducer,
            candidate: candidateReducer,
          },
        )(state.startedTests[slotId], action),
      },
    },
    currentTest: {
      slotId,
    },
  };
  return res;
};

const deriveSlotId = (state: TestsModel, action): string | null => {
  if (action instanceof testOutcomeActions.TestOutcomeStartTest) {
    return `${action.payload.slotDetail.slotId}`;
  }
  return (state.currentTest && state.currentTest.slotId) ? state.currentTest.slotId : null;
};
