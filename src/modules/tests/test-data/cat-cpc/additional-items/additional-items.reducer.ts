import * as additionalItemsActionTypes from './additional-items.action';

const initialState: string[] = [];

export function additionalItemsReducer(
  state: string[] = initialState,
  action: additionalItemsActionTypes.Types): string[] {
  switch (action.type) {
    case additionalItemsActionTypes.POPULATE_ADDITIONAL_ITEMS:
      return action.payload;
    default:
      return state;
  }
}
