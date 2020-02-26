import { TestRequirements } from '@dvsa/mes-test-schema/categories/AM2';
import * as testRequirementsActions from '../../common/test-requirements/test-requirements.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: TestRequirements = {};

export function testRequirementsCatAMod2Reducer(
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

export const getTestRequirementsCatEUAM2 =
  createFeatureSelector<TestRequirements>('testRequirements');
