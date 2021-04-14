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
import * as preTestDeclarationActions from './pre-test-declarations.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    insuranceDeclarationAccepted: false,
    residencyDeclarationAccepted: false,
    preTestSignature: '',
    candidateDeclarationSigned: false,
};
export function preTestDeclarationsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case preTestDeclarationActions.CLEAR_DECLARATIONS:
            return initialState;
        case preTestDeclarationActions.TOGGLE_INSURANCE_DECLARATION:
            return __assign(__assign({}, state), { insuranceDeclarationAccepted: !state.insuranceDeclarationAccepted });
        case preTestDeclarationActions.TOGGLE_RESIDENCY_DECLARATION:
            return __assign(__assign({}, state), { residencyDeclarationAccepted: !state.residencyDeclarationAccepted });
        case preTestDeclarationActions.SIGNATURE_DATA_CHANGED:
            return __assign(__assign({}, state), { preTestSignature: action.payload });
        case preTestDeclarationActions.SIGNATURE_DATA_CLEARED:
            return __assign(__assign({}, state), { preTestSignature: '' });
        case preTestDeclarationActions.CANDIDATE_DECLARATION_SIGNED:
            return __assign(__assign({}, state), { candidateDeclarationSigned: true });
        case preTestDeclarationActions.SET_DECLARATION_STATUS:
            return __assign(__assign({}, state), { insuranceDeclarationAccepted: action.payload, residencyDeclarationAccepted: action.payload });
        default:
            return state;
    }
}
export var getPreTestDeclarations = createFeatureSelector('preTestDeclarations');
//# sourceMappingURL=pre-test-declarations.reducer.js.map