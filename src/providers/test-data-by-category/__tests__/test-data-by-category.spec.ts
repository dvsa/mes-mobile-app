import { TestDataByCategoryProvider } from '../test-data-by-category';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';

describe('TestDataByCategoryProvider', () => {

  let provider: TestDataByCategoryProvider;

  beforeEach(() => {
    provider = new TestDataByCategoryProvider();
  });

  describe('getTestDataByCategoryCode()', () => {
    describe('CAT BE', () => {
      it('should return CAT BE test data for a BE Catgeory Code', () => {
        const testData = provider.getTestDataByCategoryCode(TestCategory.BE);
        expect(testData).toEqual(jasmine.any(Function));
        expect(testData).not.toThrow();
      });
    });

    describe('CAT C', () => {
      it('should return CAT C test data for a C Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT CE test data for a CE Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.CE);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.CE);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT C1 test data for a C1 Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C1);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C1);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT C1E test data for a C1E Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C1E);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.C1E);
        }).not.toThrowError('Error getting test category');
      });
    });

    describe('CAT D', () => {
      it('should return CAT D test data for a D Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT DE test data for a DE Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.DE);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.DE);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT D1 test data for a D1 Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D1);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D1);
        }).not.toThrowError('Error getting test category');
      });

      it('should return CAT D1E test data for a D1E Catgeory Code', () => {
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D1E);
        }).toEqual(jasmine.any(Function));
        expect(() => {
          provider.getTestDataByCategoryCode(TestCategory.D1E);
        }).not.toThrowError('Error getting test category');
      });
    });

    describe('When there is no matching test category', () => {
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
});
