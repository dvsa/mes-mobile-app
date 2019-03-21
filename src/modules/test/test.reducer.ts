import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import * as testOutcomeActions from '../../pages/journal/components/test-outcome/test-outcome.actions';
import {
  initialState as preTestDeclarationsInitialState,
  preTestDeclarationsReducer,
} from './pre-test-declarations/pre-test-declarations.reducer';
import { candidateReducer, initialState as candidateInitialState } from './candidate/candidate.reducer';

// Extend this with any new test domain action types
type TestAction = preTestDeclarationActions.Types | testOutcomeActions.Types;

interface SlotTestAction<T extends TestAction> {
  type: string;
  slotId: string;
  action: T;
}

export function testActionForSlot<T extends TestAction>(slotId: string, action: T): SlotTestAction<T> {
  return {
    slotId,
    action,
    type: `[${slotId}] ${action.type}`,
  };
}

const initialState = {};

export const testReducer = (
  state = initialState,
  testAction: SlotTestAction<TestAction>,
) => {
  const { slotId } = testAction;
  if (!slotId) {
    return state;
  }

  const existingStateForSlot = state[slotId];

  const bound = existingOrDefaultStateAndActionToReducer(existingStateForSlot, state, slotId, testAction.action);

  return {
    ...state,
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
