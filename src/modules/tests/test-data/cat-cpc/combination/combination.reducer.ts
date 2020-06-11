import * as combinationActionTypes from './combination.action';
import { CombinationCodes } from '@dvsa/mes-test-schema/categories/CPC';

const initialState: CombinationCodes = null;

export function combinationReducer(
  state: CombinationCodes = initialState,
  action: combinationActionTypes.Types): CombinationCodes {
  switch (action.type) {
    case combinationActionTypes.POPULATE_COMBINATION:
      return action.payload;
    default:
      return state;
  }
}
