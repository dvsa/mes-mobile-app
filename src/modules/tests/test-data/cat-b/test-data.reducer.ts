import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { combineReducers, Action } from '@ngrx/store';

import {
  drivingFaultsReducer,
  dangerousFaultsReducer,
  seriousFaultsReducer,
  ecoReducer,
  etaReducer,
  eyesightTestReducer,
} from '../common';
import { vehicleChecksReducer } from './vehicle-checks/vehicle-checks.reducer';
import { controlledStopReducer } from './controlled-stop/controlled-stop.reducer';
import { manoeuvresReducer } from './manoeuvres/manoeuvres.reducer';
import { testRequirementsReducer } from './test-requirements/test-requirements.reducer';

export const initialState: CatBUniqueTypes.TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  controlledStop: {},
  eyesightTest: {},
  vehicleChecks: {
    tellMeQuestion: {},
    showMeQuestion: {},
  },
};

export function testDataReducer(
  state = initialState,
  action: Action,
): Required<CatBUniqueTypes.TestData> {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: vehicleChecksReducer,
    controlledStop: controlledStopReducer,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresReducer,
    testRequirements: testRequirementsReducer,
  })(state as Required<CatBUniqueTypes.TestData>, action);
}
