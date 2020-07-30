import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import * as vehicleChecksCatDActionTypes from './vehicle-checks.cat-d.action';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

export const generateInitialState = (category: TestCategory): CatDUniqueTypes.VehicleChecks => {
  switch (category) {
    case TestCategory.D:
    case TestCategory.D1:
      return {
        tellMeQuestions: Array(2).fill({}),
        showMeQuestions: Array(3).fill({}),
        vehicleChecksCompleted: null,
      };
    case TestCategory.DE:
    case TestCategory.D1E:
      return {
        tellMeQuestions: Array(1).fill({}),
        showMeQuestions: Array(1).fill({}),
        vehicleChecksCompleted: null,
      };
  }
};

export function vehicleChecksCatDReducer(
  state: CatDUniqueTypes.VehicleChecks,
  action: vehicleChecksCatDActionTypes.Types): CatDUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatDActionTypes.INITIALIZE_VEHICLE_CHECKS:
      return generateInitialState(action.category);
    case vehicleChecksCatDActionTypes.SHOW_ME_QUESTION_SELECTED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map(
          (item, index) => index === action.index ? action.showMeQuestion : item,
        ),
      };
    case vehicleChecksCatDActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        showMeQuestions: state.showMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.showMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatDActionTypes.TELL_ME_QUESTION_SELECTED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map(
          (item, index) => index === action.index ? action.tellMeQuestion : item,
        ),
      };
    case vehicleChecksCatDActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
      return {
        ...state,
        tellMeQuestions: state.tellMeQuestions.map((item, index) => index === action.index ? {
          ...item,
          outcome: action.tellMeQuestionOutcome,
        } : item),
      };
    case vehicleChecksCatDActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
      return {
        ...state,
        showMeTellMeComments: action.comment,
      };
    case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_COMPLETED:
      return {
        ...state,
        vehicleChecksCompleted: action.toggled,
      };
    default:
      return state;
  }
}
