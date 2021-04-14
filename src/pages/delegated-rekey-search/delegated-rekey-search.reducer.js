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
import * as delegatedRekeySearchActions from './delegated-rekey-search.actions';
import { createFeatureSelector } from '@ngrx/store';
import * as testActions from '../../modules/tests/tests.actions';
export var initialState = {
    isLoading: false,
    hasSearched: false,
    bookedTestSlot: {},
    err: {
        message: '',
    },
};
export function delegatedSearchReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case delegatedRekeySearchActions.DELEGATED_REKEY_SEARCH_CLEAR_STATE:
            return initialState;
        case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST:
            return __assign(__assign({}, state), { bookedTestSlot: {}, isLoading: true, hasSearched: false });
        case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST_SUCCESS:
            return __assign(__assign({}, state), { bookedTestSlot: action.testSlot, isLoading: false, hasSearched: true });
        case delegatedRekeySearchActions.SEARCH_BOOKED_DELEGATED_TEST_FAILURE:
            return __assign(__assign({}, state), { err: action.err, isLoading: false, hasSearched: true });
        case testActions.SEND_CURRENT_TEST:
            return __assign(__assign({}, state), { isLoading: true });
        case testActions.SEND_CURRENT_TEST_SUCCESS:
            return __assign(__assign({}, state), { isLoading: false });
        case testActions.SEND_CURRENT_TEST_FAILURE:
            return __assign(__assign({}, state), { isLoading: false });
        default:
            return state;
    }
}
export var getDelegatedRekeySearchState = createFeatureSelector('delegatedRekeySearch');
//# sourceMappingURL=delegated-rekey-search.reducer.js.map