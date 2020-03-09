import * as testRequirementsActions from '../../common/test-requirements/test-requirements.actions';
import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatFUniqueTypes.TestRequirements = {};

export function testRequirementsCatHomeReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatFUniqueTypes.TestRequirements {
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

export const getTestRequirementsCatHome =
  createFeatureSelector<CatFUniqueTypes.TestRequirements>('testRequirements');
