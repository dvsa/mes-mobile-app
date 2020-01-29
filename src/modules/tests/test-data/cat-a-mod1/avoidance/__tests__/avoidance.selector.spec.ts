
import { getAvoidance } from '../avoidance.selector';
import { TestData, Avoidance } from '@dvsa/mes-test-schema/categories/AM1';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('emergency stop selector', () => {
  describe('getEmergencyStop', () => {
    it('should return emergencyStop from testData', () => {
      const testData: TestData = {
        avoidance: {
          outcome: CompetencyOutcome.DF,
          firstAttempt: 44,
          secondAttempt: 50,
          speedNotMetSeriousFault: false,
        } as Avoidance,
      };

      const result = getAvoidance(testData);

      expect(result).toBe(testData.avoidance);
    });
  });
});
