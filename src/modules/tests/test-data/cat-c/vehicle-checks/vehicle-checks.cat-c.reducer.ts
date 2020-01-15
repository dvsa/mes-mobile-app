import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import * as vehicleChecksCatCActionTypes from './vehicle-checks.cat-c.action';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const generateInitialState = (category: TestCategory): CatCUniqueTypes.VehicleChecks => {
  switch (category) {
    case TestCategory.C:
    case TestCategory.C1:
      return  {
        tellMeQuestions: Array(2).fill({}),
        showMeQuestions: Array(3).fill({}),
      };
    case TestCategory.CE:
    case TestCategory.C1E:
      return {
        tellMeQuestions: Array(1).fill({}),
        showMeQuestions: Array(1).fill({}),
      };
  }
};

export function vehicleChecksCatCReducer(
  state: CatCUniqueTypes.VehicleChecks,
  action: vehicleChecksCatCActionTypes.Types): CatCUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatCActionTypes.INITIALIZE_VEHICLE_CHECKS:
      return generateInitialState(action.category);
    case vehicleChecksCatCActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? action.showMeQuestion : item,
        ),
      };
    case vehicleChecksCatCActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatCActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatCActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatCActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };    default:
      return state;
  }
}
