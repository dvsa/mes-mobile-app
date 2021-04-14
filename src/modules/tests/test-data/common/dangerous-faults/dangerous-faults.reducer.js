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
import * as dangerousFaultsActions from './dangerous-faults.actions';
export var initialState = {};
export function dangerousFaultsReducer(state, action) {
    var _a, _b;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case dangerousFaultsActions.ADD_DANGEROUS_FAULT:
            return __assign(__assign({}, state), (_a = {}, _a[action.payload] = true, _a));
        case dangerousFaultsActions.REMOVE_DANGEROUS_FAULT:
            var dangerousCompetency = action.payload;
            var _c = state, _d = dangerousCompetency, removedDangerousFault = _c[_d], updatedDangerousFaults = __rest(_c, [typeof _d === "symbol" ? _d : _d + ""]);
            return __assign({}, updatedDangerousFaults);
        case dangerousFaultsActions.ADD_DANGEROUS_FAULT_COMMENT:
            return __assign(__assign({}, state), (_b = {}, _b[action.competencyName + "Comments"] = action.comment, _b));
        default:
            return state;
    }
}
//# sourceMappingURL=dangerous-faults.reducer.js.map