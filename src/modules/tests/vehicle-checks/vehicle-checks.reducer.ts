
import { createFeatureSelector } from '@ngrx/store';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import * as vehicleChecksActions from './vehicle-checks.actions';

export const initialState: VehicleChecks = {};

export function vehicleChecksReducer(
  state = initialState,
  action: vehicleChecksActions.Types,
): VehicleChecks {
  switch (action.type) {
    case vehicleChecksActions.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestion: {
          code: action.tellMeQuestion.code as string,
          description: action.tellMeQuestion.description as string,
        },
      };
    case vehicleChecksActions.TELL_ME_QUESTION_CORRECT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: 'P',
        },
      };
    case vehicleChecksActions.TELL_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: 'DF',
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestion: {
          code: action.showMeQuestion.code as string,
          description: action.showMeQuestion.description as string,
        },
      };
    default:
      return state;
  }
}

export const getVehicleChecks = createFeatureSelector<VehicleChecks>('vehicleChecks');
