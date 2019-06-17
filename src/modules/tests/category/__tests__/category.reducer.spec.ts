import { categoryReducer } from '../category.reducer';
import { PopulateTestCategory } from '../category.actions';

describe('category reducer', () => {
  it('should return the test category for a test', () => {
    const mockTestCategory: string = 'B';
    const result = categoryReducer(null, new PopulateTestCategory(mockTestCategory));

    expect(result).toBe(mockTestCategory);
  });
});
