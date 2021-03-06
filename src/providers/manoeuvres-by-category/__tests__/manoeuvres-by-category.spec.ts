import { ManoeuvresByCategoryProvider } from '../manoeuvres-by-category';
import { TestCategory } from '@dvsa/mes-test-schema/category-definitions/common/test-category';
import { getManoeuvres as getManoeuvresBE } from '../../../modules/tests/test-data/cat-be/test-data.cat-be.selector';
import {
  getManoeuvres as getManoeuvresC,
} from '../../../modules/tests/test-data/cat-c/test-data.cat-c.selector';
import {
  getManoeuvres as getManoeuvresD,
} from '../../../modules/tests/test-data/cat-d/test-data.cat-d.selector';
import {
  getManoeuvres as getManoeuvresHomeTest,
} from '../../../modules/tests/test-data/cat-home-test/test-data.cat-home.selector';

describe('ManoeuvresByCategoryProvider', () => {
  let provider: ManoeuvresByCategoryProvider;

  beforeEach(() => {
    provider = new ManoeuvresByCategoryProvider();
  });

  describe('getManoeuvresByCategoryCode', () => {

    const categories = {
      BE: [
        { category: TestCategory.BE },
      ],
      C: [
        { category: TestCategory.C },
        { category: TestCategory.C1 },
        { category: TestCategory.CE },
        { category: TestCategory.C1E },
      ],
      D: [
        { category: TestCategory.D },
        { category: TestCategory.D1 },
        { category: TestCategory.DE },
        { category: TestCategory.D1E },
      ],
      Home: [
        { category: TestCategory.F },
        { category: TestCategory.G },
        { category: TestCategory.H },
        { category: TestCategory.K },
      ],
    };

    describe('CAT BE', () => {
      categories.BE.forEach((cat) => {
        it(`should return Cat ${cat.category} manoeuvre information for a ${cat.category} Category Code`, () => {
          expect(() => {
            const manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
            expect(manoeuvreData).toEqual(getManoeuvresBE);
          }).not.toThrowError('Error getting test category manoeuvres');
        });
      });
    });

    describe('CAT C', () => {
      categories.C.forEach((cat) => {
        it(`should return Cat ${cat.category} manoeuvre information for a ${cat.category} Category Code`, () => {
          expect(() => {
            const manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
            expect(manoeuvreData).toEqual(getManoeuvresC);
          }).not.toThrowError('Error getting test category manoeuvres');
        });
      });
    });

    describe('CAT D', () => {
      categories.D.forEach((cat) => {
        it(`should return Cat ${cat.category} manoeuvre information for a ${cat.category} Category Code`, () => {
          expect(() => {
            const manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
            expect(manoeuvreData).toEqual(getManoeuvresD);
          }).not.toThrowError('Error getting test category manoeuvres');
        });
      });
    });

    describe('CAT F,G,H,K', () => {
      categories.Home.forEach((cat) => {
        it(`should return Cat ${cat.category} manoeuvre information for a ${cat.category} Category Code`, () => {
          expect(() => {
            const manoeuvreData = provider.getManoeuvresByCategoryCode(cat.category);
            expect(manoeuvreData).toEqual(getManoeuvresHomeTest);
          }).not.toThrowError('Error getting test category manoeuvres');
        });
      });
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
