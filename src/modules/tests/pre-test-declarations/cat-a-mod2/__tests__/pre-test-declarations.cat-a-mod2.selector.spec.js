import { getCBTNumberStatus } from '../pre-test-declarations.cat-a-mod2.selector';
describe('PreTestDeclarations selector', function () {
    var state = {
        DL196CBTCertNumber: '1234567',
        insuranceDeclarationAccepted: true,
        residencyDeclarationAccepted: false,
        preTestSignature: 'sig',
    };
    describe('getCBTNumberStatus', function () {
        it('should retrieve the cbt number', function () {
            expect(getCBTNumberStatus(state)).toBe('1234567');
        });
    });
});
//# sourceMappingURL=pre-test-declarations.cat-a-mod2.selector.spec.js.map