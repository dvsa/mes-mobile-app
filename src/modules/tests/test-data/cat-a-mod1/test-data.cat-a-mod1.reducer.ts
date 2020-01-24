import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { emergencyStopReducer } from './emergency-stop/emergency-stop.reducer';
import { avoidanceReducer } from './avoidance/avoidance.reducer';

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

export const getTestData = createFeatureSelector<TestData>('testData');
