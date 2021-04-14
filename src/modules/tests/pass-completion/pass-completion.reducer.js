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
import * as passCompletionActions from './pass-completion.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    passCertificateNumber: null,
    provisionalLicenceProvided: null,
};
export var passCompletionReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case passCompletionActions.PASS_CERTIFICATE_NUMBER_CHANGED:
            return __assign(__assign({}, state), { passCertificateNumber: action.passCertificateNumber });
        case passCompletionActions.PROVISIONAL_LICENSE_RECEIVED:
            return __assign(__assign({}, state), { provisionalLicenceProvided: true });
        case passCompletionActions.PROVISIONAL_LICENSE_NOT_RECEIVED:
            return __assign(__assign({}, state), { provisionalLicenceProvided: false });
        default:
            return state;
    }
};
export var getPassCompletion = createFeatureSelector('passCompletion');
//# sourceMappingURL=pass-completion.reducer.js.map