import { getPassCertificateNumber, } from '../pass-completion.cat-a-mod1.selector';
describe('pass completion selector', function () {
    var state = {
        passCertificateNumber: 'ABC123',
    };
    describe('getPassCertificateNumber', function () {
        it('should retrieve the pass certificate number', function () {
            expect(getPassCertificateNumber(state)).toBe('ABC123');
        });
    });
});
//# sourceMappingURL=pass-completion.selector.cat-a-mod1.spec.js.map