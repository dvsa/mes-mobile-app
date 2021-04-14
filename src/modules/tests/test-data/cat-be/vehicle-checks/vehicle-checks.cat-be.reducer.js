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
import * as vehicleChecksCatBeActionTypes from './vehicle-checks.cat-be.action';
import { NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-be.constants';
import { NUMBER_OF_SHOW_ME_QUESTIONS as numberOfShowMeQuestions, } from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-be.constants';
export var initialState = {
    tellMeQuestions: Array(numberOfTellMeQuestions).fill({}),
    showMeQuestions: Array(numberOfShowMeQuestions).fill({}),
    vehicleChecksCompleted: null,
};
export function vehicleChecksCatBEReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? action.showMeQuestion : item; }) });
        case vehicleChecksCatBeActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.showMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatBeActionTypes.TELL_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? action.tellMeQuestion : item; }) });
        case vehicleChecksCatBeActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.tellMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatBeActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
            return __assign(__assign({}, state), { showMeTellMeComments: action.comment });
        case vehicleChecksCatBeActionTypes.VEHICLE_CHECKS_COMPLETED:
            return __assign(__assign({}, state), { vehicleChecksCompleted: action.toggled });
        case vehicleChecksCatBeActionTypes.VEHICLE_CHECKS_DRIVING_FAULTS_NUMBER_CHANGED:
            return __assign(__assign({}, state), { showMeQuestions: __spreadArray([], action.payload) });
        default:
            return state;
    }
}
//# sourceMappingURL=vehicle-checks.cat-be.reducer.js.map