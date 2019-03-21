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
  let newState = state;
  if (testAction.action instanceof testOutcomeActions.TestOutcomeStartTest) {
    const slotIdToSave = testAction.action.payload.slotDetail.slotId;
    newState = {
      ...newState,
      current: {
        slotId: slotIdToSave,
      },
    };
  }

  if (!has(newState, 'current.slotId') || !testAction.action) {
    return newState;
  }

  // @ts-ignore
  const slotId = newState.current.slotId;
  const existingStateForSlot = newState[slotId];

  const bound = existingOrDefaultStateAndActionToReducer(existingStateForSlot, newState, slotId, testAction.action);

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
