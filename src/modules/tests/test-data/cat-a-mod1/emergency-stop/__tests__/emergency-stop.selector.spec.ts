
import { getEmergencyStop } from '../emergency-stop.selector';
import { TestData } from '@dvsa/mes-test-schema/categories/AM1';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';

describe('emergency stop selector', () => {
  describe('getEmergencyStop', () => {
    it('should return emergencyStop from testData', () => {
      const testData: TestData = {
        emergencyStop: {
          outcome: CompetencyOutcome.DF,
          firstAttempt: 44,
          secondAttempt: 50,
          speedNotMetSeriousFault: false,
        },
      };

      const result = getEmergencyStop(testData);

      expect(result).toBe(testData.emergencyStop);
    });
  });
});