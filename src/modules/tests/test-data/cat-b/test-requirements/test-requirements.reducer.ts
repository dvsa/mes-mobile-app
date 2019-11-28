import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import * as testRequirementsActions from './test-requirements.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatBUniqueTypes.TestRequirements = {};

export function testRequirementsReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatBUniqueTypes.TestRequirements {
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

export const getTestRequirementsCatB =
  createFeatureSelector<CatBUniqueTypes.TestRequirements>('testRequirements');
