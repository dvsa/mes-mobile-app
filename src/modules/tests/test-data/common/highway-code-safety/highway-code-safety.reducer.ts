import { CatFUniqueTypes } from '@dvsa/mes-test-schema/categories/F';
import { CatGUniqueTypes } from '@dvsa/mes-test-schema/categories/G';
import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

import * as highwayCodeSafetyActions from './highway-code-safety.actions';
import { createFeatureSelector } from '@ngrx/store';

export const initialState: CatFUniqueTypes.HighwayCodeSafety = {};

export type HighwayCodeSafetyUnion =
  | CatFUniqueTypes.HighwayCodeSafety
  | CatGUniqueTypes.HighwayCodeSafety
  | CatHUniqueTypes.HighwayCodeSafety
  | CatKUniqueTypes.HighwayCodeSafety;

export function highwayCodeSafetyReducer(
  state = initialState,
  action: highwayCodeSafetyActions.Types,
): HighwayCodeSafetyUnion {
  switch (action.type) {
    case highwayCodeSafetyActions.TOGGLE_HIGHWAYCODE_SAFETY:
      return {
        ...state,
        selected: !state.selected,
      };
    case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT:
      return {
        ...state,
        drivingFault: true,
        selected: true,
      };
    case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT:
      return {
        ...state,
        seriousFault: true,
        selected: true,
      };
    case highwayCodeSafetyActions.HIGHWAY_CODE_SAFETY_REMOVE_FAULT:
      return {
        selected: state.selected,
      };
    case highwayCodeSafetyActions.ADD_HIGHWAY_CODE_SAFETY_COMMENT:
      return {
        ...state,
        faultComments: action.comment,
      };
    default:
      return state;
  }
}

export const getHighwayCodeSafety = createFeatureSelector<HighwayCodeSafetyUnion>('highwayCodeSafety');
