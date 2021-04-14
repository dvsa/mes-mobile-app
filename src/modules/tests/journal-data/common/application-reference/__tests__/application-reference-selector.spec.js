import { getApplicationNumber, } from '../application-reference.selector';
describe('application reference selector', function () {
    var applicationReference = {
        applicationId: 1234567,
        bookingSequence: 8,
        checkDigit: 9,
    };
    describe('getApplicationNumber', function () {
        it('should combine the application reference fields to produce a formatted application number ', function () {
            expect(getApplicationNumber(applicationReference)).toBe('1234567089');
        });
    });
});
//# sourceMappingURL=application-reference-selector.spec.js.map