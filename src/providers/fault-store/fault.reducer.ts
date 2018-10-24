import {
  FaultStoreActions,
  FaultAddAction,
  FaultDeleteAction,
  FaultAction
} from './fault-store.action';
import { IFaultElementState } from './fault-store.model';
import { Action } from 'redux';

const INITIAL_STATE: IFaultElementState = {};

export function faultReducer(
  state: IFaultElementState = INITIAL_STATE,
  action: Action
): IFaultElementState {
  switch (action.type) {
    case FaultStoreActions.RESET_FAULTS:
      return INITIAL_STATE;
    case FaultStoreActions.RESET_FAULT:
      return resetFault(state, action);
    case FaultStoreActions.LOAD_FAULTS:
      return state;
    case FaultStoreActions.ADD_FAULTS:
      return addFault(state, action);
    case FaultStoreActions.DELETE_FAULTS:
      return deleteFault(state, action);
  }

  return state;
}

const resetFault = (state, action) => {
  const faultAction = action as FaultAction;
  const { id: faultId } = faultAction.payload;

  if (state[faultId]) {
    const {
      [faultId]: {},
      ...newState
    } = state;
    return {
      ...newState
    };
  }

  return state;
};

const addFault = (state, action) => {
  const faultAddAction = action as FaultAddAction;
  const { id, faultType } = faultAddAction.payload;
  const currFaults = state[id] || {};

  return {
    ...state,
    [id]: {
      ...currFaults,
      [faultType]: currFaults[faultType] ? (currFaults[faultType] += 1) : 1
    }
  };
};

const deleteFault = (state, action) => {
  const faultDeleteAction = action as FaultDeleteAction;
  let newFaultState;
  const { id, faultType } = faultDeleteAction.payload;
  const currFaults = state[id] || {};

  // reduce fault counter or remove fault type completely
  if (currFaults[faultType] > 1) {
    newFaultState = { [faultType]: (currFaults[faultType] -= 1) };
  } else {
    ({
      [faultType]: {},
      ...newFaultState
    } = currFaults);
  }

  return {
    ...state,
    [id]: {
      ...newFaultState
    }
  };
};
