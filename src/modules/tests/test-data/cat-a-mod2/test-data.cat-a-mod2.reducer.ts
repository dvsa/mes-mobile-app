import { TestData } from '@dvsa/mes-test-schema/categories/AM2';
import { combineReducers, Action } from '@ngrx/store';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { vehicleChecksCatAMod2Reducer } from './vehicle-checks/vehicle-checks.cat-a-mod2.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { eyesightTestReducer } from '../common/eyesight-test/eyesight-test.reducer';

export const initialState: TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  seriousFaults: {},
  ETA: {},
  eco: {},
  safetyAndBalanceQuestions:{
    safetyQuestions: [],
    balanceQuestions: [],
  },
  eyesightTest: {},
};

export function testDataCatAMod2Reducer(
  state = initialState,
  action: Action,
): Required<TestData> {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    safetyAndBalanceQuestions: vehicleChecksCatAMod2Reducer,
    eyesightTest: eyesightTestReducer,
  })(state as Required<TestData>, action);
}
