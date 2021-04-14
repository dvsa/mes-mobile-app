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
import * as etaActions from './eta.actions';
export var initialState = {};
export function etaReducer(state, action) {
    var _a;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case etaActions.TOGGLE_ETA:
            return __assign(__assign({}, state), (_a = {}, _a[action.payload] = !state[action.payload], _a));
        default:
            return state;
    }
}
//# sourceMappingURL=eta.reducer.js.map