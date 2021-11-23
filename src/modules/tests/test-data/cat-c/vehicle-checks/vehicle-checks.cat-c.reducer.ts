import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import * as vehicleChecksCatCActionTypes from './vehicle-checks.cat-c.action';
import { dropRight } from 'lodash';

export const generateInitialState = (): CatCUniqueTypes.VehicleChecks => ({
  tellMeQuestions: Array(2).fill({}),
  showMeQuestions: Array(3).fill({}),
  vehicleChecksCompleted: null,
  fullLicenceHeld: null,
});

export function vehicleChecksCatCReducer(
  state: CatCUniqueTypes.VehicleChecks,
  action: vehicleChecksCatCActionTypes.Types): CatCUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatCActionTypes.INITIALIZE_VEHICLE_CHECKS:
      return generateInitialState();
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
      };
    case vehicleChecksCatCActionTypes.VEHICLE_CHECKS_COMPLETED:
      return {
        ...state,
        vehicleChecksCompleted: action.toggled,
      };
    case vehicleChecksCatCActionTypes.VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED:
      return {
        ...state,
        tellMeQuestions: [],
        showMeQuestions: [...action.payload],
      };
    case vehicleChecksCatCActionTypes.VEHICLE_CHECKS_DROP_EXTRA:
      return {
        ...state,
        showMeQuestions: dropRight(state.showMeQuestions, state.showMeQuestions.length - 1),
        tellMeQuestions: dropRight(state.tellMeQuestions, state.tellMeQuestions.length - 1),
      };
    case vehicleChecksCatCActionTypes.VEHICLE_CHECKS_DROP_EXTRA_DLG:
      const showMeQuestion1 = state.showMeQuestions.shift();
      return {
        ...state,
        tellMeQuestions: showMeQuestion1 ? [showMeQuestion1] : [],
        showMeQuestions: state.showMeQuestions || [],
      };
    case vehicleChecksCatCActionTypes.VEHICLE_CHECKS_FULL_LICENCE_HELD:
      return {
        ...state,
        fullLicenceHeld: action.payload,
      };
    default:
      return state;
  }
}
