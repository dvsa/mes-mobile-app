import * as testRequirementsActions from '../../cat-b/test-requirements/test-requirements.actions';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatCUniqueTypes.TestRequirements = {};

export function testRequirementsCatBEReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatCUniqueTypes.TestRequirements {
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

export const getTestRequirementsCatC =
  createFeatureSelector<CatCUniqueTypes.TestRequirements>('testRequirements');
