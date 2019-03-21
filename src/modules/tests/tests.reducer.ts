import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import {
  initialState as preTestDeclarationsInitialState,
  preTestDeclarationsReducer,
} from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer, initialState as candidateInitialState } from './candidate/candidate.reducer';
import { get } from 'lodash';

// Extend this with any new test domain action types
type TestAction = preTestDeclarationActions.Types | testOutcomeActions.Types;

const initialState = {};

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

  const existingStateForSlot = state[slotId];
  const applyReducer = makeReducerApplyer(existingStateForSlot, state, slotId, action);

  return {
    ...state,
    [slotId]: {
      preTestDeclarations: applyReducer(
        preTestDeclarationsReducer,
        'preTestDeclarations',
        preTestDeclarationsInitialState,
      ),
      candidate: applyReducer(
        candidateReducer,
        'candidate',
        candidateInitialState,
      ),
    },
    current: {
      slotId,
    },
  };
};

const deriveSlotId = (state, action): string | null => {
  if (action instanceof testOutcomeActions.TestOutcomeStartTest) {
    return `${action.payload.slotDetail.slotId}`;
  }
  return get(state, 'current.slotId', null);
};

const makeReducerApplyer = (slotExists: boolean, state, slotId, action) => (
  reducer,
  keyInState: string,
  initialState,
) => {
  const stateToReduce = slotExists ? state[slotId][keyInState] : initialState;
  return reducer(stateToReduce, action);
};
