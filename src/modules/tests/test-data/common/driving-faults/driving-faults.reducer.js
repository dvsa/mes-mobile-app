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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as drivingFaultsActions from './driving-faults.actions';
export var initialState = {};
export function drivingFaultsReducer(state, action) {
    var _a, _b, _c;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case drivingFaultsActions.ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), (_a = {}, _a[action.payload.competency] = action.payload.newFaultCount, _a));
        case drivingFaultsActions.REMOVE_DRIVING_FAULT:
            if (action.payload.newFaultCount === 0) {
                var _d = state, _e = action.payload.competency, removedDrivingFault = _d[_e], updatedDrivingFaults = __rest(_d, [typeof _e === "symbol" ? _e : _e + ""]);
                return __assign({}, updatedDrivingFaults);
            }
            return __assign(__assign({}, state), (_b = {}, _b[action.payload.competency] = action.payload.newFaultCount, _b));
        case drivingFaultsActions.ADD_DRIVING_FAULT_COMMENT:
            return __assign(__assign({}, state), (_c = {}, _c[action.competencyName + "Comments"] = action.comment, _c));
        default:
            return state;
    }
}
//# sourceMappingURL=driving-faults.reducer.js.map