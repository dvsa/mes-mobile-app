import { ManoeuvresByCategoryProvider } from '../manoeuvres-by-category';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import * as selector  from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';

describe('ManoeuvresByCategoryProvider', () => {
  let provider: ManoeuvresByCategoryProvider;

  beforeEach(() => {
    provider = new ManoeuvresByCategoryProvider();
  });

  describe('getManoeuvresByCategoryCode', () => {
    it('should return Cat C manoeuvre information for a C Category Code', () => {
      const manoeuvreData = provider.getManoeuvresByCategoryCode(TestCategory.C);
      expect(manoeuvreData).toEqual(selector.getManoeuvres);
      expect(manoeuvreData).not.toThrowError('Error getting test category manoeuvres');
    });
    it('should throw an error when there is no matching test category', () => {
      expect(() => {
        provider.getManoeuvresByCategoryCode('z' as TestCategory);
      }).toThrowError('Error getting test category manoeuvres');
    });

    it('should throw an error when test category is undefined', () => {
      expect(() => {
        provider.getManoeuvresByCategoryCode(undefined);
      }).toThrowError('Error getting test category manoeuvres');
    });
  });
});
