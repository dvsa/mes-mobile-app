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
import { preTestDeclarationsCatAMod1Reducer, initialState } from '../pre-test-declarations.cat-a-mod1.reducer';
import { CbtNumberChanged } from '../../cat-a/pre-test-declarations.cat-a.actions';
import { ToggleInsuranceDeclaration, ToggleResidencyDeclaration, SignatureDataChanged, SignatureDataCleared, ClearPreTestDeclarations, } from '../../common/pre-test-declarations.actions';
describe('PreTestDeclarations category a mod1 reducer', function () {
    it('should toggle the residency status when the toggle action is received', function () {
        var result = preTestDeclarationsCatAMod1Reducer(initialState, new ToggleInsuranceDeclaration());
        expect(result.insuranceDeclarationAccepted).toBe(true);
    });
    it('should toggle the insurance status when the toggle action is received', function () {
        var result = preTestDeclarationsCatAMod1Reducer(initialState, new ToggleResidencyDeclaration);
        expect(result.residencyDeclarationAccepted).toBe(true);
    });
    it('should set the signature when the SignatureDataChanged action is received', function () {
        var result = preTestDeclarationsCatAMod1Reducer(initialState, new SignatureDataChanged('ImSomeNewSignatureData'));
        expect(result.preTestSignature).toEqual('ImSomeNewSignatureData');
    });
    it('should clear the signature when the SignatureDataChanged action is received', function () {
        var state = __assign(__assign({}, initialState), { preTestSignature: 'SomeSignatureData' });
        var result = preTestDeclarationsCatAMod1Reducer(state, new SignatureDataCleared());
        expect(result.preTestSignature).toEqual('');
    });
    it('should put the CBT number into the state on cbt number changed action', function () {
        var result = preTestDeclarationsCatAMod1Reducer(initialState, new CbtNumberChanged('12345678'));
        expect(result.DL196CBTCertNumber).toBe('12345678');
    });
    it('should reset the default state when the clear action is received', function () {
        var dirtyState = {
            insuranceDeclarationAccepted: true,
            residencyDeclarationAccepted: true,
            preTestSignature: 'somesig',
        };
        var result = preTestDeclarationsCatAMod1Reducer(dirtyState, new ClearPreTestDeclarations());
        expect(result).toBe(initialState);
    });
});
//# sourceMappingURL=pre-test-declarations.cat-a-mod1.reducer.spec.js.map