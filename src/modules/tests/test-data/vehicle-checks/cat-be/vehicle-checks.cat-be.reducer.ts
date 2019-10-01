
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import * as vehicleChecksCatBEActions from './vehicle-checks.cat-be.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: VehicleChecks = {
  tellMeQuestion: {},
  showMeQuestion: {},
};

export function vehicleChecksCatBEReducer(
  state = initialState,
  action: vehicleChecksCatBEActions.Types,
): VehicleChecks | null {

  console.log('vehicle checks for cat-be');

  switch (action.type) {
    case vehicleChecksCatBEActions.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestion: {
          code: action.tellMeQuestion.code as string,
          description: action.tellMeQuestion.shortName as string,
        },
      };
    case vehicleChecksCatBEActions.TELL_ME_QUESTION_CORRECT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: CompetencyOutcome.P,
        },
      };
    case vehicleChecksCatBEActions.TELL_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: CompetencyOutcome.DF,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          code: action.showMeQuestion.code as string,
          description: action.showMeQuestion.shortName as string,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_PASSED:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.P,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_SERIOUS_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.S,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_DANGEROUS_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.D,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.DF,
        },
      };
    case vehicleChecksCatBEActions.SHOW_ME_QUESTION_REMOVE_FAULT:
      const { outcome, ...notOutcome } = state.showMeQuestion;

      return {
        ...state,
        showMeQuestion: {
          ...notOutcome,
        },
      };
    case vehicleChecksCatBEActions.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };
    default:
      return state;
  }

}
