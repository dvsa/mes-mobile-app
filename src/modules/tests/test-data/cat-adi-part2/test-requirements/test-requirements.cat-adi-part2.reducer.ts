import * as testRequirementsActions from '../../common/test-requirements/test-requirements.actions';
import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatADI2UniqueTypes.TestRequirements = {};

export function testRequirementsCatADI2Reducer(
  state = initialState,
  action: testRequirementsActions.Types,
): CatADI2UniqueTypes.TestRequirements {
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

export const getTestRequirementsCatADI2 =
  createFeatureSelector<CatADI2UniqueTypes.TestRequirements>('testRequirements');
