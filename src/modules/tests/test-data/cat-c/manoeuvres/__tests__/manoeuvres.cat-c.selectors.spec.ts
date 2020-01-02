import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { getReverseLeftSelected } from '../manoeuvres.cat-c.selectors';

describe('Manoeuvres CatBE Selectors', () => {
  describe('getReverseLeftSelected', () => {
    it('should return true when reverse left is selected', () => {
      const manoeuvres: CatCUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: true,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeTruthy();
    });

    it('should return false when reverse left is not selected', () => {
      const manoeuvres: CatCUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: false,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });

    it('should return false when reverse left is undefined', () => {
      const manoeuvres: CatCUniqueTypes.Manoeuvres = {
        reverseLeft: undefined,
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });
  });
});
