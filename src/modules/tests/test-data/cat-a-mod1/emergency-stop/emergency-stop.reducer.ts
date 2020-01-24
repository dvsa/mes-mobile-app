import { EmergencyStop } from '@dvsa/mes-test-schema/categories/AM1';
import * as emergencyStopActions from './emergency-stop.actions';

export const initialState: EmergencyStop = {
  speedNotMetSeriousFault: false,
};

export function emergencyStopReducer(
  state: EmergencyStop = initialState,
  action: any,
): EmergencyStop {
  switch (action.type) {

    case emergencyStopActions.TOGGLE_EMERGENCY_STOP_SPEED_REQ:
      return {
        ...state,
        speedNotMetSeriousFault: !state.speedNotMetSeriousFault,
      };

    default:
      return state;
  }
}
