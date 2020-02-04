import * as testRequirementsActions from '../../cat-b/test-requirements/test-requirements.actions';
import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatDUniqueTypes.TestRequirements = {};

export function testRequirementsCatDReducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatDUniqueTypes.TestRequirements {
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
  createFeatureSelector<CatDUniqueTypes.TestRequirements>('testRequirements');
