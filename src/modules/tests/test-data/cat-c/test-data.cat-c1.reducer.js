import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { ecoReducer } from '../common/eco/eco.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { testRequirementsCatCReducer } from './test-requirements/test-requirements.cat-c.reducer';
import { vehicleChecksCatCReducer } from './vehicle-checks/vehicle-checks.cat-c.reducer';
import { manoeuvresReducer } from '../common/manoeuvres/manoeuvres.reducer';
export var initialState = {
    dangerousFaults: {},
    drivingFaults: {},
    manoeuvres: {},
    seriousFaults: {},
    testRequirements: {},
    ETA: {},
    eco: {},
    vehicleChecks: {
        tellMeQuestions: [],
        showMeQuestions: [],
    },
};
export function testDataCatC1Reducer(state, action) {
    return combineReducers({
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        vehicleChecks: vehicleChecksCatCReducer,
        eco: ecoReducer,
        ETA: etaReducer,
        manoeuvres: manoeuvresReducer,
        testRequirements: testRequirementsCatCReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-c1.reducer.js.map