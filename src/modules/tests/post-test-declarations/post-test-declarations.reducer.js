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
import * as postTestDeclarationActions from './post-test-declarations.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    healthDeclarationAccepted: false,
    passCertificateNumberReceived: false,
    postTestSignature: '',
};
export function postTestDeclarationsReducer(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case postTestDeclarationActions.CLEAR_DECLARATIONS:
            return initialState;
        case postTestDeclarationActions.TOGGLE_HEALTH_DECLARATION:
            return __assign(__assign({}, state), { healthDeclarationAccepted: !state.healthDeclarationAccepted });
        case postTestDeclarationActions.HEALTH_DECLARATION_ACCEPTED:
            return __assign(__assign({}, state), { healthDeclarationAccepted: action.payload });
        case postTestDeclarationActions.TOGGLE_RECEIPT_DECLARATION:
            return __assign(__assign({}, state), { passCertificateNumberReceived: !state.passCertificateNumberReceived });
        case postTestDeclarationActions.PASS_CERTIFICATE_RECIEVED:
            return __assign(__assign({}, state), { passCertificateNumberReceived: action.payload });
        case postTestDeclarationActions.SIGNATURE_DATA_CHANGED:
            return __assign(__assign({}, state), { postTestSignature: action.payload });
        case postTestDeclarationActions.SIGNATURE_DATA_CLEARED:
            return __assign(__assign({}, state), { postTestSignature: '' });
        default:
            return state;
    }
}
export var getPostTestDeclarations = createFeatureSelector('postTestDeclarations');
//# sourceMappingURL=post-test-declarations.reducer.js.map