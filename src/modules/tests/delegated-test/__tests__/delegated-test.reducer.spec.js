import { delegatedTestReducer } from '../delegated-test.reducer';
import { StartDelegatedTest } from '../delegated-test.actions';
describe('delegatedTestReducer', function () {
    it('should return true if StartDelegatedTest action passed', function () {
        var result = delegatedTestReducer(null, new StartDelegatedTest());
        expect(result).toBe(true);
    });
});
//# sourceMappingURL=delegated-test.reducer.spec.js.map