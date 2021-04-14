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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import * as vehicleChecksCatDActionTypes from './vehicle-checks.cat-d.action';
export var generateInitialState = function (category) {
    switch (category) {
        case "D" /* D */:
        case "D1" /* D1 */:
            return {
                tellMeQuestions: Array(2).fill({}),
                showMeQuestions: Array(3).fill({}),
                vehicleChecksCompleted: null,
            };
        case "D+E" /* DE */:
        case "D1+E" /* D1E */:
            return {
                tellMeQuestions: Array(1).fill({}),
                showMeQuestions: Array(1).fill({}),
                vehicleChecksCompleted: null,
            };
    }
};
export function vehicleChecksCatDReducer(state, action) {
    switch (action.type) {
        case vehicleChecksCatDActionTypes.INITIALIZE_VEHICLE_CHECKS:
            return generateInitialState(action.category);
        case vehicleChecksCatDActionTypes.SHOW_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? action.showMeQuestion : item; }) });
        case vehicleChecksCatDActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.showMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatDActionTypes.TELL_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? action.tellMeQuestion : item; }) });
        case vehicleChecksCatDActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.tellMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatDActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
            return __assign(__assign({}, state), { showMeTellMeComments: action.comment });
        case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_COMPLETED:
            return __assign(__assign({}, state), { vehicleChecksCompleted: action.toggled });
        case vehicleChecksCatDActionTypes.VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED:
            return __assign(__assign({}, state), { showMeQuestions: __spreadArray([], action.payload) });
        default:
            return state;
    }
}
//# sourceMappingURL=vehicle-checks.cat-d.reducer.js.map