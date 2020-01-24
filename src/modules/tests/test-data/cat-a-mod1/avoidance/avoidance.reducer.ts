import { Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import * as avoidanceActions from './avoidance.actions';

export const initialState: Avoidance = {
  speedNotMetSeriousFault: false,
};

export function avoidanceReducer(
  state: Avoidance = initialState,
  action: avoidanceActions.Types,
): Avoidance {

  console.log('here in avoidance reducers');
  switch (action.type) {

    case avoidanceActions.TOGGLE_AVOIDANCE_SPEED_REQ:
      return {
        ...state,
        speedNotMetSeriousFault: !state.speedNotMetSeriousFault,
      };

    default:
      return state;
  }
}
