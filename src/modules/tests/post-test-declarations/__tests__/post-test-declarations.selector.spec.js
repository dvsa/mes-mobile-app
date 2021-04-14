import { getHealthDeclarationStatus, getReceiptDeclarationStatus, getSignatureStatus, } from '../post-test-declarations.selector';
describe('PostTestDeclarations selector', function () {
    var state = {
        healthDeclarationAccepted: true,
        passCertificateNumberReceived: false,
        postTestSignature: 'sig',
    };
    describe('getHealthDeclarationStatus', function () {
        it('should return the health declaration status', function () {
            expect(getHealthDeclarationStatus(state)).toBe(true);
        });
    });
    describe('getReceiptDeclarationStatus', function () {
        it('should return the pass receipt declaration status', function () {
            expect(getReceiptDeclarationStatus(state)).toBe(false);
        });
    });
    describe('getSignatureStatus', function () {
        it('should return the signature status', function () {
            expect(getSignatureStatus(state)).toEqual('sig');
        });
    });
});
//# sourceMappingURL=post-test-declarations.selector.spec.js.map