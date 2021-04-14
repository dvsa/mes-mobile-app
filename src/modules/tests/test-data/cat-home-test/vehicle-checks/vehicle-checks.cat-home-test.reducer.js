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
import * as vehicleChecksCatHomeTestActionTypes from './vehicle-checks.cat-home-test.action';
import { NUMBER_OF_SHOW_ME_QUESTIONS, } from '../../../../../shared/constants/show-me-questions/show-me-questions.cat-home-test.constants';
import { NUMBER_OF_TELL_ME_QUESTIONS, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-home-test.constants';
export var initialState = {
    tellMeQuestions: Array(NUMBER_OF_TELL_ME_QUESTIONS).fill({}),
    showMeQuestions: Array(NUMBER_OF_SHOW_ME_QUESTIONS).fill({}),
};
export function vehicleChecksCatHomeTestReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case vehicleChecksCatHomeTestActionTypes.SHOW_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? action.showMeQuestion : item; }) });
        case vehicleChecksCatHomeTestActionTypes.SHOW_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.showMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatHomeTestActionTypes.TELL_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? action.tellMeQuestion : item; }) });
        case vehicleChecksCatHomeTestActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.tellMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatHomeTestActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
            return __assign(__assign({}, state), { showMeTellMeComments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=vehicle-checks.cat-home-test.reducer.js.map