import * as delegatedTestActions from './delegated-test.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = false;
export var delegatedTestReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case delegatedTestActions.START_DELEGATED_TEST:
            return true;
        default:
            return state;
    }
};
export var getDelegatedTestIndicator = createFeatureSelector('delegatedTest');
//# sourceMappingURL=delegated-test.reducer.js.map