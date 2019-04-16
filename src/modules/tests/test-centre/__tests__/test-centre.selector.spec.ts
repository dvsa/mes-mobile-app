import { getCostCentre  } from '../test-centre.selector';
import { TestCentre } from '@dvsa/mes-test-schema/categories/B';

describe('testCentre selector', () => {
  const testCentre: TestCentre = {
    costCode: '1234',
  };

  describe('getCostCentre', () => {
    it('should return the cost centre', () => {
      expect(getCostCentre(testCentre)).toBe('1234');
    });
  });
});
