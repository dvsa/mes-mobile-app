import { getCode78 } from '../pass-completion.cat-d.selector';
describe('pass completion cat D selector', function () {
    var state = {
        provisionalLicenceProvided: true,
        passCertificateNumber: 'ABC123',
        code78Present: true,
    };
    describe('getCode78', function () {
        it('should retrieve if the code 78 is present', function () {
            expect(getCode78(state)).toBe(true);
        });
    });
});
//# sourceMappingURL=pass-completion.selector.cat-d.spec.js.map