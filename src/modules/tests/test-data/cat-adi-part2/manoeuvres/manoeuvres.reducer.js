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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import * as manoeuvresActions from './manoeuvres.actions';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var initialState = [{}, {}];
export function manoeuvresCatADI2Reducer(state, action) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case manoeuvresActions.RECORD_MANOEUVRES_SELECTION:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_a = {},
                    _a[action.manoeuvre] = __assign(__assign({}, state[action.index][action.manoeuvre]), { selected: true }),
                    _a)]), state.slice(action.index + 1));
        case manoeuvresActions.RECORD_MANOEUVRES_DESELECTION:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [{}]), state.slice(action.index + 1));
        case manoeuvresActions.ADD_MANOEUVRE_DRIVING_FAULT:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_b = {},
                    _b[action.payload.manoeuvre] = __assign(__assign({}, state[action.index][action.payload.manoeuvre]), (_c = {}, _c[action.payload.competency] = CompetencyOutcome.DF, _c)),
                    _b)]), state.slice(action.index + 1));
        case manoeuvresActions.ADD_MANOEUVRE_SERIOUS_FAULT:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_d = {},
                    _d[action.payload.manoeuvre] = __assign(__assign({}, state[action.index][action.payload.manoeuvre]), (_e = {}, _e[action.payload.competency] = CompetencyOutcome.S, _e)),
                    _d)]), state.slice(action.index + 1));
        case manoeuvresActions.ADD_MANOEUVRE_DANGEROUS_FAULT:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_f = {},
                    _f[action.payload.manoeuvre] = __assign(__assign({}, state[action.index][action.payload.manoeuvre]), (_g = {}, _g[action.payload.competency] = CompetencyOutcome.D, _g)),
                    _f)]), state.slice(action.index + 1));
        case manoeuvresActions.REMOVE_MANOEUVRE_FAULT:
            var _l = state[action.index][action.payload.manoeuvre], _m = action.payload.competency, competencyToOmit = _l[_m], stateToPreserve = __rest(_l, [typeof _m === "symbol" ? _m : _m + ""]);
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_h = {},
                    _h[action.payload.manoeuvre] = __assign({}, stateToPreserve),
                    _h)]), state.slice(action.index + 1));
        case manoeuvresActions.ADD_MANOEUVRE_COMMENT:
            return __spreadArray(__spreadArray(__spreadArray([], state.slice(0, action.index)), [(_j = {},
                    _j[action.fieldName] = __assign(__assign({}, state[action.index][action.fieldName]), (_k = {}, _k[action.controlOrObservation.toLocaleLowerCase() + "FaultComments"] = action.comment, _k)),
                    _j)]), state.slice(action.index + 1));
        default:
            return state;
    }
}
//# sourceMappingURL=manoeuvres.reducer.js.map