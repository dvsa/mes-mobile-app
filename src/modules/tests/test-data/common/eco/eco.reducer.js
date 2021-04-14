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
import * as ecoActions from './eco.actions';
export var initialState = {};
export function ecoReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case ecoActions.TOGGLE_ECO:
            return __assign(__assign({}, state), { completed: !state.completed });
        case ecoActions.TOGGLE_CONTROL_ECO:
            return __assign(__assign({}, state), { adviceGivenControl: !state.adviceGivenControl });
        case ecoActions.TOGGLE_PLANNING_ECO:
            return __assign(__assign({}, state), { adviceGivenPlanning: !state.adviceGivenPlanning });
        default:
            return state;
    }
}
//# sourceMappingURL=eco.reducer.js.map