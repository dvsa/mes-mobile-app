import * as questionCodeActionTypes from './question-code.action';

const initialState: string = null;

export function questionCodeReducer(
  state: string = initialState,
  action: questionCodeActionTypes.Types): string {
  switch (action.type) {
    case questionCodeActionTypes.POPULATE_QUESTION_CODE:
      return action.payload;
    default:
      return state;
  }
}
