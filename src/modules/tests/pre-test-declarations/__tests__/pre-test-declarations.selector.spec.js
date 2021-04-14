import { getInsuranceDeclarationStatus, getResidencyDeclarationStatus, getSignatureStatus, } from '../common/pre-test-declarations.selector';
describe('PreTestDeclarations selector', function () {
    var state = {
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: false,
        preTestSignature: 'sig',
    };
    describe('getInsuranceDeclarationStatus', function () {
        it('should return the insurance declaration status', function () {
            expect(getInsuranceDeclarationStatus(state)).toBe(true);
        });
    });
    describe('getResidencyDeclarationStatus', function () {
        it('should return the residency declaration status', function () {
            expect(getResidencyDeclarationStatus(state)).toBe(false);
        });
    });
    describe('getSignatureStatus', function () {
        it('should return the signature status', function () {
            expect(getSignatureStatus(state)).toEqual('sig');
        });
    });
});
//# sourceMappingURL=pre-test-declarations.selector.spec.js.map