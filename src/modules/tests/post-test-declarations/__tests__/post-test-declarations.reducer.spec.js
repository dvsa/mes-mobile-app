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
import { postTestDeclarationsReducer, initialState } from '../post-test-declarations.reducer';
import { ToggleHealthDeclaration, ToggleReceiptDeclaration, SignatureDataChanged, SignatureDataCleared, ClearPostTestDeclarations, } from '../post-test-declarations.actions';
describe('PostTestDeclarations reducer', function () {
    it('should toggle the health declaration status when the toggle action is received', function () {
        var result = postTestDeclarationsReducer(initialState, new ToggleHealthDeclaration());
        expect(result.healthDeclarationAccepted).toBe(true);
    });
    it('should toggle the certificate recieved status when the toggle action is received', function () {
        var result = postTestDeclarationsReducer(initialState, new ToggleReceiptDeclaration);
        expect(result.passCertificateNumberReceived).toBe(true);
    });
    it('should set the signature when the SignatureDataChanged action is received', function () {
        var result = postTestDeclarationsReducer(initialState, new SignatureDataChanged('ImSomeNewSignatureData'));
        expect(result.postTestSignature).toEqual('ImSomeNewSignatureData');
    });
    it('should clear the signature when the SignatureDataChanged action is received', function () {
        var state = __assign(__assign({}, initialState), { postTestSignature: 'SomeSignatureData' });
        var result = postTestDeclarationsReducer(state, new SignatureDataCleared());
        expect(result.postTestSignature).toEqual('');
    });
    it('should reset the default state when the clear action is received', function () {
        var dirtyState = {
            healthDeclarationAccepted: true,
            passCertificateNumberReceived: true,
            postTestSignature: 'somesig',
        };
        var result = postTestDeclarationsReducer(dirtyState, new ClearPostTestDeclarations());
        expect(result).toBe(initialState);
    });
});
//# sourceMappingURL=post-test-declarations.reducer.spec.js.map