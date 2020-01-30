import { TestDataByCategoryProvider } from '../test-data-by-category';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('TestDataByCategoryProvider', () => {

  let provider: TestDataByCategoryProvider;

  beforeEach(() => {
    provider = new TestDataByCategoryProvider();
  });

  describe('getTestDataByCategoryCode()', () => {
    it('should return CAT C test data for a C Catgeory Code', () => {
      const testData = provider.getTestDataByCategoryCode(TestCategory.C);
      expect(testData).toEqual(jasmine.any(Function));
      expect(testData).not.toThrow();
    });

    it('should throw an error when there is no matching test category', () => {
      expect(() => {
        provider.getTestDataByCategoryCode('z' as TestCategory);
      }).toThrowError('Error getting test category');
    });

    it('should throw an error when test category is undefined', () => {
      expect(() => {
        provider.getTestDataByCategoryCode(undefined);
      }).toThrowError('Error getting test category');
    });
  });
});
