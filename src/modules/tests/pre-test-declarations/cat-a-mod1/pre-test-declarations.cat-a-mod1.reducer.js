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
import * as preTestDeclarationActionsCatAMod1 from '../cat-a/pre-test-declarations.cat-a.actions';
import * as preTestDeclarationActions from '../common/pre-test-declarations.actions';
import { createFeatureSelector } from '@ngrx/store';
export var initialState = {
    insuranceDeclarationAccepted: false,
    residencyDeclarationAccepted: false,
    preTestSignature: '',
    DL196CBTCertNumber: '',
};
export function preTestDeclarationsCatAMod1Reducer(state, action) {
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
        case preTestDeclarationActionsCatAMod1.CBT_NUMBER_CHANGED:
            return __assign(__assign({}, state), { DL196CBTCertNumber: action.cbtNumber });
        default:
            return state;
    }
}
export var getPreTestDeclarationsCatAMod1 = createFeatureSelector('preTestDeclarations');
//# sourceMappingURL=pre-test-declarations.cat-a-mod1.reducer.js.map