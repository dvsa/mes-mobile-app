import { getReverseLeftSelected } from '../../../common/manoeuvres/manoeuvres.selectors';
describe('Manoeuvres Selectors', function () {
    describe('getReverseLeftSelected', function () {
        it('should return true when reverse left is selected', function () {
            var manoeuvres = {
                reverseLeft: {
                    selected: true,
                },
            };
            var result = getReverseLeftSelected(manoeuvres);
            expect(result).toBeTruthy();
        });
        it('should return false when reverse left is not selected', function () {
            var manoeuvres = {
                reverseLeft: {
                    selected: false,
                },
            };
            var result = getReverseLeftSelected(manoeuvres);
            expect(result).toBeFalsy();
        });
        it('should return false when reverse left is undefined', function () {
            var manoeuvres = {
                reverseLeft: undefined,
            };
            var result = getReverseLeftSelected(manoeuvres);
            expect(result).toBeFalsy();
        });
    });
});
//# sourceMappingURL=manoeuvres.selectors.spec.js.map