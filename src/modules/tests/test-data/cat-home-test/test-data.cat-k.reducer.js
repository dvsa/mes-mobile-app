import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { controlledStopReducer } from '../common/controlled-stop/controlled-stop.reducer';
import { testRequirementsCatHomeReducer } from './test-requirements/test-requirements.cat-home.reducer';
import { eyesightTestReducer } from '../common/eyesight-test/eyesight-test.reducer';
import { vehicleChecksCatHomeTestReducer } from './vehicle-checks/vehicle-checks.cat-home-test.reducer';
import { highwayCodeSafetyReducer } from '../common/highway-code-safety/highway-code-safety.reducer';
export var initialState = {
    dangerousFaults: {},
    drivingFaults: {},
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
export function testDataCatKReducer(state, action) {
    return combineReducers({
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        vehicleChecks: vehicleChecksCatHomeTestReducer,
        controlledStop: controlledStopReducer,
        highwayCodeSafety: highwayCodeSafetyReducer,
        eco: ecoReducer,
        ETA: etaReducer,
        eyesightTest: eyesightTestReducer,
        testRequirements: testRequirementsCatHomeReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-k.reducer.js.map