import { createFeatureSelector } from '@ngrx/store';
import * as testCentreActions from './test-centre.actions';
export var initialState = {
    centreId: null,
    costCode: null,
};
export function testCentreReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case testCentreActions.POPULATE_TEST_CENTRE:
            return action.payload;
    }
    return state;
}
export var getTestCentre = createFeatureSelector('testCentre');
//# sourceMappingURL=test-centre.reducer.js.map