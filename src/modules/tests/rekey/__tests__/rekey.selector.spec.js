import { isRekey } from '../rekey.selector';
describe('rekey selector', function () {
    describe('isRekey', function () {
        it('should return true if the test is a rekey', function () {
            var state = true;
            expect(isRekey(state)).toEqual(true);
        });
        it('should return false if the test is not a rekey', function () {
            var state = false;
            expect(isRekey(state)).toEqual(false);
        });
    });
});
//# sourceMappingURL=rekey.selector.spec.js.map