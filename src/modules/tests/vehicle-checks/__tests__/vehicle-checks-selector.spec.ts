import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';
import { isTellMeQuestionSelected } from '../vehicle-checks.selector';

describe('vehicle checks selector', () => {
  describe('isTellMeQuestionSelected', () => {
    it('should return true if there is a tell me question selected', () => {
      const state: VehicleChecks = {
        tellMeQuestionCode: 'T1',
        tellMeQuestionDescription: 'desc',
        tellMeQuestionOutcome: 'P',
      };
      expect(isTellMeQuestionSelected(state)).toBe(true);
    });
    it('should return false if there is no tell me question selected', () => {
      expect(isTellMeQuestionSelected({})).toBe(false);
    });
  });
});
