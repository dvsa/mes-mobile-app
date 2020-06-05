import * as totalPercentageActionTypes from './total-percentage.action';

const initialState: number = 0;

export function totalPercentageReducer(
  state: number = initialState,
  action: totalPercentageActionTypes.Types): number {
  switch (action.type) {
    case totalPercentageActionTypes.POPULATE_TOTAL_PERCENTAGE:
      return action.payload;
    default:
      return state;
  }
}
