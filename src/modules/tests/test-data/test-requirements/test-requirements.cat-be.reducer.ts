import * as testRequirementsActions from './test-requirements.actions';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const initialState: CatBEUniqueTypes.TestRequirements = {};

export function testRequirementsCatBEReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatBEUniqueTypes.TestRequirements {
  switch (action.type) {
    case testRequirementsActions.TOGGLE_LEGAL_REQUIREMENT:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
}
