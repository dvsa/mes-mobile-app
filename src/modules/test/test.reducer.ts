import * as preTestDeclarationActions from './pre-test-declarations/pre-test-declarations.actions';
import {
  initialState as preTestDeclarationsInitialState,
  preTestDeclarationsReducer,
} from './pre-test-declarations/pre-test-declarations.reducer';

// Extend this with any new test domain action types
type TestAction = preTestDeclarationActions.Types;

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

  const bound = existingOrDefaultStateAndActionToReducer(existingStateForSlot, state, slotId);

  return {
    ...state,
    [slotId]: {
      preTestDeclarations: bound(
        preTestDeclarationsReducer,
        'preTestDeclarations',
        preTestDeclarationsInitialState,
        testAction.action,
      ),
    },
  };
};

const existingOrDefaultStateAndActionToReducer = (slotExists: boolean, state, slotId) => (
  reducer,
  keyInState: string,
  initialState,
  action,
) => {
  const stateToReduce = slotExists ? state[slotId][keyInState] : initialState;
  return reducer(stateToReduce, action);
};
