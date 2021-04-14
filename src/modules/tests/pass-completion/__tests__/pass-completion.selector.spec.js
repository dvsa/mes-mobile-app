import { getPassCertificateNumber, isProvisionalLicenseProvided, isProvisionalLicenseNotProvided, } from '../pass-completion.selector';
describe('pass completion selector', function () {
    var state = {
        provisionalLicenceProvided: true,
        passCertificateNumber: 'ABC123',
    };
    describe('getPassCertificateNumber', function () {
        it('should retrieve the pass certificate number', function () {
            expect(getPassCertificateNumber(state)).toBe('ABC123');
        });
    });
    describe('provisionalLicenseProvided', function () {
        it('should retrieve whether the provisional license was provided', function () {
            expect(isProvisionalLicenseProvided(state)).toBe(true);
        });
    });
    describe('provisionalLicenseNotProvided', function () {
        it('should retrieve whether the provisional license was provided', function () {
            expect(isProvisionalLicenseNotProvided(state)).toBe(false);
        });
    });
});
//# sourceMappingURL=pass-completion.selector.spec.js.map