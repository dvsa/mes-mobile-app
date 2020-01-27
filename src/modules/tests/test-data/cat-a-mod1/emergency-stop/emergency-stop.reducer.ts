import { EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import * as emergencyStopActions from './emergency-stop.actions';

export const initialState: EmergencyStop = {
  speedNotMetSeriousFault: false,
};

export function emergencyStopReducer(
  state: EmergencyStop = initialState,
  action: emergencyStopActions.Types,
): EmergencyStop {
  switch (action.type) {
    case emergencyStopActions.TOGGLE_EMERGENCY_STOP_SPEED_REQ:
      return {
        ...state,
        speedNotMetSeriousFault: !state.speedNotMetSeriousFault,
      };
    case emergencyStopActions.RECORD_EMERGENCY_STOP_FIRST_ATTEMPT:
      return {
        ...state,
        firstAttempt: action.attemptedSpeed,
      };
    case emergencyStopActions.RECORD_EMERGENCY_STOP_SECOND_ATTEMPT:
      return {
        ...state,
        secondAttempt: action.attemptedSpeed,
      };
    default:
      return state;
  }
}
