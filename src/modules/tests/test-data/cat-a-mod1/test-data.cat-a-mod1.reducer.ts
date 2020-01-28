import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { combineReducers, Action } from '@ngrx/store';

import { avoidanceReducer } from './avoidance/avoidance.reducer';
import { emergencyStopReducer } from './emergency-stop/emergency-stop.reducer';
import {
  dangerousFaultsReducer,
  drivingFaultsReducer,
  seriousFaultsReducer,
  etaReducer,
} from '../common';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  seriousFaults: {},
  ETA: {},
};

export function testDataCatAMod1Reducer(
  state: TestData,
  action: Action,
): TestData {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    emergencyStop: emergencyStopReducer,
    avoidance: avoidanceReducer,
    ETA: etaReducer,

  })(state as Required<TestData>, action);
}
