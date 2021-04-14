import { flattenArray, convertBooleanToString } from '../view-test-result-helpers';
describe('ViewTestResultHelper', function () {
    describe('flattenArray', function () {
        it('should return the correct result when provided with an array with a length of 1', function () {
            var array = ['Item 1'];
            expect(flattenArray(array)).toBe('Item 1');
        });
        it('should return the correct result when provided with an array with a length of 2', function () {
            var array = ['Item 1', 'Item 2'];
            expect(flattenArray(array)).toBe('Item 1 and Item 2');
        });
        it('should return the correct result when provided with an array with a length of 3', function () {
            var array = ['Item 1', 'Item 2', 'Item 3'];
            expect(flattenArray(array)).toBe('Item 1, Item 2 and Item 3');
        });
    });
    describe('convertBooleanToString', function () {
        it('should return the correct result for true', function () {
            expect(convertBooleanToString(true)).toBe('Yes');
        });
        it('should return the correct result for false', function () {
            expect(convertBooleanToString(false)).toBe('No');
        });
    });
});
//# sourceMappingURL=view-test-result-helpers.spec.js.map