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
    });
  });
});
