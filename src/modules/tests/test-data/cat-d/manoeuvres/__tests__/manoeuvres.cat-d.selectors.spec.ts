import { CatDUniqueTypes } from '@dvsa/mes-test-schema/categories/D';
import { getReverseLeftSelected } from '../manoeuvres.cat-d.selectors';

describe('Manoeuvres CatD Selectors', () => {
  describe('getReverseLeftSelected', () => {
    it('should return true when reverse left is selected', () => {
      const manoeuvres: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: true,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeTruthy();
    });

    it('should return false when reverse left is not selected', () => {
      const manoeuvres: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: false,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });

    it('should return false when reverse left is undefined', () => {
      const manoeuvres: CatDUniqueTypes.Manoeuvres = {
        reverseLeft: undefined,
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });
  });
});
