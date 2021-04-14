import { isDelegatedTest } from '../delegated-test.selector';
describe('Delegated test selector', function () {
    describe('isDelegated', function () {
        it('should return true if the test is a delegated test', function () {
            var state = true;
            expect(isDelegatedTest(state)).toEqual(true);
        });
    });
});
//# sourceMappingURL=delegated-test.selector.spec.js.map