import * as categoryActions from './category.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = null;
export var categoryReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case categoryActions.POPULATE_TEST_CATEGORY:
            return action.payload;
        default:
            return state;
    }
};
export var getTestCategory = createFeatureSelector('category');
//# sourceMappingURL=category.reducer.js.map