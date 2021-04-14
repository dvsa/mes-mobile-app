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
import * as vehicleChecksCatADI2ActionTypes from './vehicle-checks.cat-adi-part2.action';
import { NUMBER_OF_TELL_ME_QUESTIONS as numberOfTellMeQuestions, } from '../../../../../shared/constants/tell-me-questions/tell-me-questions.cat-adi-part2.constants';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var initialState = {
    tellMeQuestions: Array(numberOfTellMeQuestions).fill({}),
    showMeQuestions: [
        {
            code: '',
            description: '',
            outcome: CompetencyOutcome.P,
        },
        {
            code: '',
            description: '',
            outcome: CompetencyOutcome.P,
        },
    ],
    seriousFault: false,
    dangerousFault: false,
    vehicleChecksCompleted: false,
};
export function vehicleChecksCatADI2Reducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { code: action.showMeQuestion.code, description: action.showMeQuestion.description, outcome: action.showMeQuestion.outcome }) : item; }) });
        case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_SELECTED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? action.tellMeQuestion : item; }) });
        case vehicleChecksCatADI2ActionTypes.TELL_ME_QUESTION_OUTCOME_CHANGED:
            return __assign(__assign({}, state), { tellMeQuestions: state.tellMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: action.tellMeQuestionOutcome }) : item; }) });
        case vehicleChecksCatADI2ActionTypes.ADD_SHOW_ME_TELL_ME_COMMENT:
            return __assign(__assign({}, state), { showMeTellMeComments: action.comment });
        case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_ADD_DRIVING_FAULT:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: CompetencyOutcome.DF }) : item; }) });
        case vehicleChecksCatADI2ActionTypes.SHOW_ME_QUESTION_REMOVE_DRIVING_FAULT:
            return __assign(__assign({}, state), { showMeQuestions: state.showMeQuestions.map(function (item, index) { return index === action.index ? __assign(__assign({}, item), { outcome: CompetencyOutcome.P }) : item; }) });
        case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_ADD_SERIOUS_FAULT:
            return __assign(__assign({}, state), { seriousFault: true });
        case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_ADD_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { dangerousFault: true });
        case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_REMOVE_SERIOUS_FAULT:
            return __assign(__assign({}, state), { seriousFault: false });
        case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_REMOVE_DANGEROUS_FAULT:
            return __assign(__assign({}, state), { dangerousFault: false });
        case vehicleChecksCatADI2ActionTypes.VEHICLE_CHECKS_TOGGLE:
            return __assign(__assign({}, state), { vehicleChecksCompleted: !state.vehicleChecksCompleted });
        default:
            return state;
    }
}
//# sourceMappingURL=vehicle-checks.cat-adi-part2.reducer.js.map