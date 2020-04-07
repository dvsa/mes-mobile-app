import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';
import * as vehicleChecksCatADI2ActionTypes from './vehicle-checks.cat-adi-part2.action';
import {
  NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions,
}
from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: CatADI2UniqueTypes.VehicleChecks = {
  tellMeQuestions: Array(numberOfTellMeQuestions).fill({}),
  showMeQuestions: [
    {
      code: '',
      description: '',
      outcome: CompetencyOutcome.P,
    },
    {
      code: '',
      description: '',
      outcome: CompetencyOutcome.P,
    },
  ],
};

export function vehicleChecksCatADI2Reducer(
  state: CatADI2UniqueTypes.VehicleChecks = initialState,
  action: vehicleChecksCatADI2ActionTypes.Types,
): CatADI2UniqueTypes.VehicleChecks {
  let showMeQuestionIndex;
  let showMeFaultCount = 0;
  if (state.showMeQuestions) {
    showMeFaultCount = state.showMeQuestions.reduce<number>((acc, question) => {
      if (question.outcome === CompetencyOutcome.DF) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  let tellMeFaultCount = 0;
  if (state.tellMeQuestions) {
    tellMeFaultCount = state.tellMeQuestions.reduce<number>((acc, question) => {
      if (question.outcome === CompetencyOutcome.DF) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }
  const showMeTellMeFaultCount = tellMeFaultCount + showMeFaultCount;

  switch (action.type) {
    case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? {
            ...item,
            code: action.showMeQuestion.code,
            description: action.showMeQuestion.description,
          } : item,
        ),
      };
    case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatADI2ActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };
    case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_DRIVING_FAULT:
      const tempShowMeQuestions = state.showMeQuestions;
      showMeQuestionIndex = tempShowMeQuestions.findIndex(e => e.outcome === CompetencyOutcome.P);
      if (showMeQuestionIndex > -1 && showMeTellMeFaultCount < 4) {
        tempShowMeQuestions[showMeQuestionIndex].outcome = CompetencyOutcome.DF;
      }
      return {
        ...state,
        showMeQuestions: tempShowMeQuestions,
      };
    case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_SERIOUS_FAULT:
      let dangerousFlag: boolean = false;
      if (state.dangerousFault) {
        dangerousFlag = true;
      }
      return {
        ...state,
        seriousFault: true,
        dangerousFault: dangerousFlag,
      };
    case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_DANGEROUS_FAULT:
      let seriousFlag: boolean = false;
      if (state.seriousFault) {
        seriousFlag = true;
      }
      return {
        ...state,
        seriousFault: seriousFlag,
        dangerousFault: true,
      };
    case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT:
      return {
        ...state,
        seriousFault: false,
      };
    case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT:
      return {
        ...state,
        dangerousFault: false,
      };
    case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_PASSED:
      const tempShowQuestions = state.showMeQuestions;
      showMeQuestionIndex = state.showMeQuestions.findIndex(e => e.outcome === CompetencyOutcome.DF);
      if (showMeQuestionIndex > -1) {
        tempShowQuestions[showMeQuestionIndex].outcome = CompetencyOutcome.P;
      }
      return {
        ...state,
        showMeQuestions: tempShowQuestions,
      };
    default:
      return state;
  }
}
