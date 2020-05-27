import * as subTitleActionTypes from './sub-title.action';

const initialState: string = null;

export function subTitleReducer(
  state: string = initialState,
  action: subTitleActionTypes.Types): string {
  switch (action.type) {
    case subTitleActionTypes.POPULATE_SUB_TITLE:
      return action.payload;
    default:
      return state;
  }
}
