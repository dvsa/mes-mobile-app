
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import * as vehicleChecksActions from './vehicle-checks.actions';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

export const initialState: VehicleChecks = {
  tellMeQuestion: {},
  showMeQuestion: {},
};

export function vehicleChecksReducer(
  state = initialState,
  action: vehicleChecksActions.Types,
): VehicleChecks | null {
  switch (action.type) {
    case vehicleChecksActions.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestion: {
          code: action.tellMeQuestion.code as string,
          description: action.tellMeQuestion.shortName as string,
        },
      };
    case vehicleChecksActions.TELL_ME_QUESTION_CORRECT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: CompetencyOutcome.P,
        },
      };
    case vehicleChecksActions.TELL_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        tellMeQuestion: {
          ...state.tellMeQuestion,
          outcome: CompetencyOutcome.DF,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          code: action.showMeQuestion.code as string,
          description: action.showMeQuestion.shortName as string,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_PASSED:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.P,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_SERIOUS_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.S,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_DANGEROUS_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.D,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_DRIVING_FAULT:
      return {
        ...state,
        showMeQuestion: {
          ...state.showMeQuestion,
          outcome: CompetencyOutcome.DF,
        },
      };
    case vehicleChecksActions.SHOW_ME_QUESTION_REMOVE_FAULT:
      const { outcome, ...notOutcome } = state.showMeQuestion;

      return {
        ...state,
        showMeQuestion: {
          ...notOutcome,
        },
      };
    case vehicleChecksActions.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };
    default:
      return state;
  }

}
