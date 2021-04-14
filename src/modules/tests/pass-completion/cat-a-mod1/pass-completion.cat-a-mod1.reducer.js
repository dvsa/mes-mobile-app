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
import * as passCompletionActions from '../pass-completion.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    passCertificateNumber: null,
};
export var passCompletionCatAMod1Reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case passCompletionActions.PASS_CERTIFICATE_NUMBER_CHANGED:
            return __assign(__assign({}, state), { passCertificateNumber: action.passCertificateNumber });
        default:
            return state;
    }
};
export var getPassCompletion = createFeatureSelector('passCompletion');
//# sourceMappingURL=pass-completion.cat-a-mod1.reducer.js.map