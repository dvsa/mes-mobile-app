import { createFeatureSelector, combineReducers } from '@ngrx/store';
import { dangerousFaultsReducer } from '../common/dangerous-faults/dangerous-faults.reducer';
import { drivingFaultsReducer } from '../common/driving-faults/driving-faults.reducer';
import { etaReducer } from '../common/eta/eta.reducer';
import { seriousFaultsReducer } from '../common/serious-faults/serious-faults.reducer';
import { emergencyStopReducer } from './emergency-stop/emergency-stop.reducer';
import { avoidanceReducer } from './avoidance/avoidance.reducer';
import { singleFaultCompetenciesReducer } from '../common/single-fault-competencies/single-fault-competencies.reducer';
export var initialState = {
    singleFaultCompetencies: {},
    emergencyStop: {},
    avoidance: {},
    dangerousFaults: {},
    drivingFaults: {},
    seriousFaults: {},
    ETA: {},
};
export function testDataCatAMod1Reducer(state, action) {
    return combineReducers({
        singleFaultCompetencies: singleFaultCompetenciesReducer,
        drivingFaults: drivingFaultsReducer,
        dangerousFaults: dangerousFaultsReducer,
        seriousFaults: seriousFaultsReducer,
        emergencyStop: emergencyStopReducer,
        avoidance: avoidanceReducer,
        ETA: etaReducer,
    })(state, action);
}
export var getTestData = createFeatureSelector('testData');
//# sourceMappingURL=test-data.cat-a-mod1.reducer.js.map