
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
      const { tellMeQuestionOutcome, ...nonOutcomeState } = state;
      return {
        ...nonOutcomeState,
        tellMeQuestionCode: action.tellMeQuestion.tellMeQuestionCode,
        tellMeQuestionDescription: action.tellMeQuestion.tellMeQuestionDescription,
      };
    case vehicleChecksActions.TELL_ME_QUESTION_CORRECT:
      return {
        ...state,
        tellMeQuestionOutcome: 'P',
      };
    case vehicleChecksActions.TELL_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        tellMeQuestionOutcome: 'DF',
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestionCode: action.showMeQuestion.showMeQuestionCode,
        showMeQuestionDescription: action.showMeQuestion.showMeQuestionDescription,
      };
    default:
      return state;
  }
}

export const getVehicleChecks = createFeatureSelector<VehicleChecks>('vehicleChecks');
