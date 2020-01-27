import { Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import * as avoidanceActions from './avoidance.actions';

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
    default:
      return state;
  }
}
