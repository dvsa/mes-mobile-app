import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import { preTestDeclarationsReducer } from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer } from './candidate/candidate.reducer';
import { get } from 'lodash';
import { combineReducers } from '@ngrx/store';

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

  return {
    ...state,
    [slotId]: {
      ...combineReducers(
        {
          preTestDeclarations: preTestDeclarationsReducer,
          candidate: candidateReducer,
        },
      )(state[slotId], action),
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
