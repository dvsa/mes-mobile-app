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
import * as eyesightTestActions from './eyesight-test.actions';
export var initialState = {};
export function eyesightTestReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case eyesightTestActions.EYESIGHT_TEST_PASSED:
            return {
                complete: true,
                seriousFault: false,
            };
        case eyesightTestActions.EYESIGHT_TEST_FAILED:
            return {
                complete: true,
                seriousFault: true,
            };
        case eyesightTestActions.EYESIGHT_TEST_RESET:
            return initialState;
        case eyesightTestActions.EYESIGHT_TEST_ADD_COMMENT:
            return __assign(__assign({}, state), { faultComments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=eyesight-test.reducer.js.map