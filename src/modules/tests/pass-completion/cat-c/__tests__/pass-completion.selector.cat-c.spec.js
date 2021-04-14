import { getCode78 } from '../pass-completion.cat-c.selector';
describe('pass completion cat C selector', function () {
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
//# sourceMappingURL=pass-completion.selector.cat-c.spec.js.map