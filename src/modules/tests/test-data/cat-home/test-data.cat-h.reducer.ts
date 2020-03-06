import { CatHUniqueTypes } from '@dvsa/mes-test-schema/categories/H';
import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { controlledStopReducer } from '../common/controlled-stop/controlled-stop.reducer';
import { testRequirementsCatHomeReducer } from './test-requirements/test-requirements.cat-home.reducer';
import { eyesightTestReducer } from '../common/eyesight-test/eyesight-test.reducer';
import { manoeuvresReducer } from '../common/manoeuvres/manoeuvres.reducer';

export const initialState: CatHUniqueTypes.TestData = {
  dangerousFaults: {},
  drivingFaults: {},
  manoeuvres: {},
  seriousFaults: {},
  testRequirements: {},
  ETA: {},
  eco: {},
  controlledStop: {},
  eyesightTest: {},
  highwayCodeSafety: {},
  vehicleChecks: {
    tellMeQuestions: [],
    showMeQuestions: [],
  },
};

export function testDataCatHReducer(
  state: CatHUniqueTypes.TestData,
  action: Action,
): Required<CatHUniqueTypes.TestData> {
  return combineReducers({
    drivingFaults: drivingFaultsReducer,
    dangerousFaults: dangerousFaultsReducer,
    seriousFaults: seriousFaultsReducer,
    vehicleChecks: null,
    controlledStop: controlledStopReducer,
    highwayCodeSafety: null,
    eco: ecoReducer,
    ETA: etaReducer,
    eyesightTest: eyesightTestReducer,
    manoeuvres: manoeuvresReducer,
    testRequirements: testRequirementsCatHomeReducer,
  })(state as Required<CatHUniqueTypes.TestData>, action);
}

export const getTestData = createFeatureSelector<CatHUniqueTypes.TestData>('testData');
