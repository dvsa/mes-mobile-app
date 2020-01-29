import { Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import * as avoidanceActions from './avoidance.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';

export const initialState: Avoidance = {
  speedNotMetSeriousFault: false,
};

export function avoidanceReducer(
  state: Avoidance = initialState,
  action: avoidanceActions.Types,
): Avoidance {
  switch (action.type) {
    case avoidanceActions.TOGGLE_AVOIDANCE_SPEED_REQ:
      return {
        ...state,
        speedNotMetSeriousFault: !state.speedNotMetSeriousFault,
      };
    case avoidanceActions.RECORD_AVOIDANCE_FIRST_ATTEMPT:
      return {
        ...state,
        firstAttempt: action.attemptedSpeed,
      };
    case avoidanceActions.RECORD_AVOIDANCE_SECOND_ATTEMPT:
      return {
        ...state,
        secondAttempt: action.attemptedSpeed,
      };
    case avoidanceActions.ADD_AVOIDANCE_RIDING_FAULT:
      return {
        ...state,
        outcome: CompetencyOutcome.DF,
      };
    case avoidanceActions.ADD_AVOIDANCE_SERIOUS_FAULT:
      return {
        ...state,
        outcome: CompetencyOutcome.S,
      };
    case avoidanceActions.ADD_AVOIDANCE_DANGEROUS_FAULT:
      return {
        ...state,
        outcome: CompetencyOutcome.D,
      };
    case avoidanceActions.REMOVE_AVOIDANCE_FAULT:
      return {
        ...state,
        outcome: undefined,
      };
    default:
      return state;
  }
}
