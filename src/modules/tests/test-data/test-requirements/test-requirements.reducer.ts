import { TestRequirements } from '@dvsa/mes-test-schema/categories/B';
import * as testRequirementsActions from './test-requirements.actions';

export const initialState: TestRequirements = {};

export function testRequirementsReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): TestRequirements {
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
