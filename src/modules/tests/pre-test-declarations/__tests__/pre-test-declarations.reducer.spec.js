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
import { preTestDeclarationsReducer, initialState } from '../common/pre-test-declarations.reducer';
import { ToggleInsuranceDeclaration, ToggleResidencyDeclaration, SignatureDataChanged, SignatureDataCleared, ClearPreTestDeclarations, } from '../common/pre-test-declarations.actions';
describe('PreTestDeclarations reducer', function () {
    it('should toggle the residency status when the toggle action is received', function () {
        var result = preTestDeclarationsReducer(initialState, new ToggleInsuranceDeclaration());
        expect(result.insuranceDeclarationAccepted).toBe(true);
    });
    it('should toggle the insurance status when the toggle action is received', function () {
        var result = preTestDeclarationsReducer(initialState, new ToggleResidencyDeclaration);
        expect(result.residencyDeclarationAccepted).toBe(true);
    });
    it('should set the signature when the SignatureDataChanged action is received', function () {
        var result = preTestDeclarationsReducer(initialState, new SignatureDataChanged('ImSomeNewSignatureData'));
        expect(result.preTestSignature).toEqual('ImSomeNewSignatureData');
    });
    it('should clear the signature when the SignatureDataChanged action is received', function () {
        var state = __assign(__assign({}, initialState), { preTestSignature: 'SomeSignatureData' });
        var result = preTestDeclarationsReducer(state, new SignatureDataCleared());
        expect(result.preTestSignature).toEqual('');
    });
    it('should reset the default state when the clear action is received', function () {
        var dirtyState = {
            insuranceDeclarationAccepted: true,
            residencyDeclarationAccepted: true,
            preTestSignature: 'somesig',
        };
        var result = preTestDeclarationsReducer(dirtyState, new ClearPreTestDeclarations());
        expect(result).toBe(initialState);
    });
});
//# sourceMappingURL=pre-test-declarations.reducer.spec.js.map