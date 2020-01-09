import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { ManoeuvreOutcome } from '@dvsa/mes-test-schema/categories/common';
import { sumDrivingFaults, sumSeriousFaults, sumDangerousFaults, sumManoeuvreFaults } from '../sum-faults';

describe('sumFaults', () => {

  describe('sumDrivingFaults', () => {
    it('should the sum of driving faults', () => {
      const result = sumDrivingFaults(1, 2, 3, 4);
      expect(result).toEqual(10);
    });
  });
  describe('sumSeriousFaults', () => {
    it('should the sum of driving faults', () => {
      const result = sumSeriousFaults(1, 2, 3, 4, 5);
      expect(result).toEqual(15);
    });
  });
  describe('sumDangerousFaults', () => {
    it('should the sum of driving faults', () => {
      const result = sumDangerousFaults(1, 2, 3, 4);
      expect(result).toEqual(10);
    });
  });
  describe('sumManoeuvreFaults', () => {
    const mockManoeuvres = {
      forwardPark: {
        selected: true,
        controlFault: CompetencyOutcome.DF as ManoeuvreOutcome,
      },
    }

    it('should the sum of driving faults', () => {
      const result = sumManoeuvreFaults(mockManoeuvres, CompetencyOutcome.DF);
      expect(result).toEqual(1);
    });
  });
});
