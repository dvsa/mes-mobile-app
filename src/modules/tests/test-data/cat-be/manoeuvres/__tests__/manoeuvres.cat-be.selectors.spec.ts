import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { getReverseLeftSelected } from '../manoeuvres.cat-be.selectors';

fdescribe('Manoeuvres CatBE Selectors', () => {
  describe('getReverseLeftSelected', () => {
    it('should return true when reverse left is selected', () => {
      const manoeuvres: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: true,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeTruthy();
    });

    it('should return false when reverse left is not selected', () => {
      const manoeuvres: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: {
          selected: false,
        },
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });

    it('should return false when reverse left is undefined', () => {
      const manoeuvres: CatBEUniqueTypes.Manoeuvres = {
        reverseLeft: undefined,
      };
      const result = getReverseLeftSelected(manoeuvres);
      expect(result).toBeFalsy();
    });
  });
});
