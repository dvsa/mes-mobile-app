import * as combinationActionTypes from './combination.action';
import { CombinationCodes } from '../../../../../shared/constants/cpc-questions/cpc-question-combinations.constants';

const initialState: CombinationCodes = null;

export function combinationReducer(
  state: CombinationCodes = initialState,
  action: combinationActionTypes.Types): string {
  switch (action.type) {
    case combinationActionTypes.POPULATE_COMBINATION:
      return action.payload;
    default:
      return state;
  }
}
