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
import * as vehicleChecksCatAMod2ActionTypes from './safety-and-balance.cat-a-mod2.actions';
import { NUMBER_OF_SAFETY_QUESTIONS as numberOfSafetyQuestions } from '../../../../../shared/constants/safety-questions.cat-a-mod2.constants';
import { NUMBER_OF_BALANCE_QUESTIONS as numberOfBalanceQuestions } from '../../../../../shared/constants/balance-questions.cat-a-mod2.constants';
export var initialState = {
    safetyQuestions: Array(numberOfSafetyQuestions).fill({}),
    balanceQuestions: Array(numberOfBalanceQuestions).fill({}),
};
export function safetyAndBalanceCatAMod2Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case vehicleChecksCatAMod2ActionTypes.SAFETY_QUESTION_SELECTED:
            return __assign(__assign({}, state), { safetyQuestions: state.safetyQuestions.map(function (item, index) {
                    return index === action.index ? action.safetyQuestion : item;
                }) });
        case vehicleChecksCatAMod2ActionTypes.SAFETY_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { safetyQuestions: state.safetyQuestions.map(function (item, index) {
                    return index === action.index
                        ? __assign(__assign({}, item), { outcome: action.safetyQuestionOutcome }) : item;
                }) });
        case vehicleChecksCatAMod2ActionTypes.BALANCE_QUESTION_SELECTED:
            return __assign(__assign({}, state), { balanceQuestions: state.balanceQuestions.map(function (item, index) {
                    return index === action.index ? action.balanceQuestion : item;
                }) });
        case vehicleChecksCatAMod2ActionTypes.BALANCE_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { balanceQuestions: state.balanceQuestions.map(function (item, index) {
                    return index === action.index
                        ? __assign(__assign({}, item), { outcome: action.balanceQuestionOutcome }) : item;
                }) });
        case vehicleChecksCatAMod2ActionTypes.ADD_SAFETY_AND_BALANCE_COMMENT:
            return __assign(__assign({}, state), { safetyAndBalanceComments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=safety-and-balance.cat-a-mod2.reducer.js.map