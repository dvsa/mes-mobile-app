import { removeLeadingZeros, removeNonAlphaNumeric } from '../formatters';
describe('Formatters', function () {
    describe('removeLeadingZeros', function () {
        it('should remove leading zeros if there are any', function () {
            expect(removeLeadingZeros('01234567')).toEqual('1234567');
            expect(removeLeadingZeros('0000001234567')).toEqual('1234567');
        });
        it('should not remove leading zeros if there aren=t any', function () {
            expect(removeLeadingZeros('abcdef')).toEqual('abcdef');
            expect(removeLeadingZeros('123450123')).toEqual('123450123');
        });
    });
    describe('removeNonAlphaNumeric', function () {
        it('should remove any non A-Z, 0-9 characters plus white spaces', function () {
            expect(removeNonAlphaNumeric('A@£$%^&Bc   123 $%^&*$')).toEqual('ABc123');
        });
    });
});
//# sourceMappingURL=formatters.spec.js.map