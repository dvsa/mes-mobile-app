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
import * as communicationPrefActions from './communication-preferences.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    updatedEmail: '',
    communicationMethod: 'Not provided',
    conductedLanguage: 'Not provided',
};
export var communicationPreferencesReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case communicationPrefActions.CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_EMAIL:
            return __assign(__assign({}, state), { updatedEmail: action.updatedEmail, communicationMethod: action.communicationMethod });
        case communicationPrefActions.CANDIDATE_CONFIRMED_COMMUNICATION_PREFERENCE_AS_POST:
            return __assign(__assign({}, state), { communicationMethod: action.communicationMethod });
        case communicationPrefActions.CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_WELSH:
            return __assign(__assign({}, state), { conductedLanguage: action.conductedLanguage });
        case communicationPrefActions.CANDIDATE_CHOSE_TO_PROCEED_WITH_TEST_IN_ENGLISH:
            return __assign(__assign({}, state), { conductedLanguage: action.conductedLanguage });
        case communicationPrefActions.POPULATE_CONDUCTED_LANGUAGE:
            return __assign(__assign({}, state), { conductedLanguage: state.conductedLanguage === initialState.conductedLanguage
                    ? action.conductedLanguage
                    : state.conductedLanguage });
        default:
            return state;
    }
};
export var getCommunicationPreference = createFeatureSelector('communicationPreferences');
//# sourceMappingURL=communication-preferences.reducer.js.map