import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import {
  initialState as preTestDeclarationsInitialState,
  preTestDeclarationsReducer,
} from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer, initialState as candidateInitialState } from './candidate/candidate.reducer';
import { has } from 'lodash';

// Extend this with any new test domain action types
type TestAction = preTestDeclarationActions.Types | testOutcomeActions.Types;

const initialState = {};

export const testReducer = (
  state = initialState,
  action: TestAction,
) => {
  let newState = state;
  if (action instanceof testOutcomeActions.TestOutcomeStartTest) {
    const slotIdToSave = action.payload.slotDetail.slotId;
    newState = {
      ...newState,
      current: {
        slotId: slotIdToSave,
      },
    };
  }

  if (!has(newState, 'current.slotId') || !action) {
    return newState;
  }

  // @ts-ignore
  const slotId = newState.current.slotId;
  const existingStateForSlot = newState[slotId];

  const bound = existingOrDefaultStateAndActionToReducer(existingStateForSlot, newState, slotId, action);

  return {
    ...newState,
    [slotId]: {
      preTestDeclarations: bound(
        preTestDeclarationsReducer,
        'preTestDeclarations',
        preTestDeclarationsInitialState,
      ),
      candidate: bound(
        candidateReducer,
        'candidate',
        candidateInitialState,
      ),
    },
  };

};

const existingOrDefaultStateAndActionToReducer = (slotExists: boolean, state, slotId, action) => (
  reducer,
  keyInState: string,
  initialState,
) => {
  const stateToReduce = slotExists ? state[slotId][keyInState] : initialState;
  return reducer(stateToReduce, action);
};
