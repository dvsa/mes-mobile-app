import { categoryReducer } from '../category.reducer';
import { PopulateTestCategory } from '../category.actions';
describe('category reducer', function () {
    it('should return the test category for a test', function () {
        var mockTestCategory = 'B';
        var result = categoryReducer(null, new PopulateTestCategory(mockTestCategory));
        expect(result).toBe(mockTestCategory);
    });
});
//# sourceMappingURL=category.reducer.spec.js.map