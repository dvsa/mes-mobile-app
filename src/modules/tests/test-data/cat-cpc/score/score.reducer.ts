import * as scoreActionTypes from './score.action';

const initialState: number = null;

export function scoreReducer(
  state: number = initialState,
  action: scoreActionTypes.Types): number {
  switch (action.type) {
    case scoreActionTypes.POPULATE_SCORE:
      return action.payload;
    default:
      return state;
  }
}
