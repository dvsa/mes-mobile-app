import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { dropRight } from 'lodash';
import * as vehicleChecksCatDActionTypes from './vehicle-checks.cat-d.action';

// removed decision here due to the possibility of needing the 2 TM and 3SM for all of the D sub-categories based upon
// user decision;
export const generateInitialState = (): CatDUniqueTypes.VehicleChecks => ({
  tellMeQuestions: Array(2).fill({}),
  showMeQuestions: Array(3).fill({}),
  vehicleChecksCompleted: null,
  fullLicenceHeld: null,
});

export function vehicleChecksCatDReducer(
  state: CatDUniqueTypes.VehicleChecks,
  action: vehicleChecksCatDActionTypes.Types): CatDUniqueTypes.VehicleChecks {
  switch (action.type) {
    case vehicleChecksCatDActionTypes.INITIALIZE_VEHICLE_CHECKS:
      return generateInitialState();
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
    case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED:
      return {
        ...state,
        showMeQuestions: [...action.payload],
      };
    case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_DROP_EXTRA_VEHICLE_CHECKS:
      return {
        ...state,
        showMeQuestions: dropRight(state.showMeQuestions, state.showMeQuestions.length - 1),
        tellMeQuestions: dropRight(state.tellMeQuestions, state.tellMeQuestions.length - 1),
      };
    case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_FULL_LICENCE_HELD:
      return {
        ...state,
        fullLicenceHeld: action.payload,
      };
    default:
      return state;
  }
}
