import * as titleActionTypes from './title.action';

const initialState: string = null;

export function titleReducer(
  state: string = initialState,
  action: titleActionTypes.Types): string {
  switch (action.type) {
    case titleActionTypes.POPULATE_TITLE:
      return action.payload;
    default:
      return state;
  }
}
