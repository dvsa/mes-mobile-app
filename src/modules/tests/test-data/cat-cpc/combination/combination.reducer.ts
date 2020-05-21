import * as combinationActionTypes from './combination.action';

const initialState: string = null;

// @TODO - Create Combination ENUM instead of using generic string
export function combinationReducer(
  state: string = initialState,
  action: combinationActionTypes.Types): string {
  switch (action.type) {
    case combinationActionTypes.POPULATE_COMBINATION:
      return action.payload;
    default:
      return state;
  }
}
