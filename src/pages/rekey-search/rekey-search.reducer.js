var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as rekeySearchActions from './rekey-search.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    isLoading: false,
    hasSearched: false,
    staffNumber: '',
    bookedTestSlot: {},
    err: {
        message: '',
    },
};
export function rekeySearchReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case rekeySearchActions.REKEY_SEARCH_CLEAR_STATE:
            return initialState;
        case rekeySearchActions.SEARCH_BOOKED_TEST:
            return __assign(__assign({}, state), { bookedTestSlot: {}, isLoading: true, hasSearched: false });
        case rekeySearchActions.SEARCH_BOOKED_TEST_SUCCESS:
            return __assign(__assign({}, state), { bookedTestSlot: action.testSlot, staffNumber: action.staffNumber, isLoading: false, hasSearched: true });
        case rekeySearchActions.SEARCH_BOOKED_TEST_FAILURE:
            return __assign(__assign({}, state), { err: action.err, isLoading: false, hasSearched: true });
        default:
            return state;
    }
}
export var getRekeySearchState = createFeatureSelector('rekeySearch');
//# sourceMappingURL=rekey-search.reducer.js.map