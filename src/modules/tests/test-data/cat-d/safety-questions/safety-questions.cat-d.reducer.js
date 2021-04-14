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
import * as safetyQuestionsCatDActionTypes from './safety-questions.cat-d.action';
var initialState = {
    questions: [
        {
            description: 'Fire Extinguisher',
            outcome: undefined,
        },
        {
            description: 'Emergency exit',
            outcome: undefined,
        },
        {
            description: 'Fuel cutoff',
            outcome: undefined,
        },
    ],
    faultComments: '',
};
export function safetyQuestionsCatDReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case safetyQuestionsCatDActionTypes.SAFETY_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { questions: state.questions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.safetyQuestionOutcome }) : item; }) });
        case safetyQuestionsCatDActionTypes.ADD_SAFETY_QUESTION_COMMENT:
            return __assign(__assign({}, state), { faultComments: action.comment });
        default:
            return state;
    }
}
//# sourceMappingURL=safety-questions.cat-d.reducer.js.map