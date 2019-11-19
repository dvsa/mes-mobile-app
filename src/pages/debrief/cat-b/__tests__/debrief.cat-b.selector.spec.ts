import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import {
    getManoeuvreFaults,
  } from '../debrief.cat-b.selector';
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';

describe('debriefSelector', () => {
  const manoeuvres: CatBUniqueTypes.Manoeuvres = {};

  describe('getManoeuvreFaults', () => {
    it('should return an empty array if there are no manoeuvre driving faults', () => {
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result.length).toBe(0);
    });

    it('should return an array length matching the number of manoeuvre driving faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result.length).toBe(2);
    });

    it('should return an array length matching the number of manoeuvre serious faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'S',
        observationFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.S);
      expect(result.length).toBe(1);
    });

    it('should return an array length matching the number of manoeuvre dangerous faults', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
        observationFault: 'D',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.D);
      expect(result.length).toBe(1);
    });

    it('should return an array with a correctly formatted fault object ', () => {
      manoeuvres.reverseRight = {
        selected: true,
        controlFault: 'DF',
      };
      const result = getManoeuvreFaults(manoeuvres, CompetencyOutcome.DF);
      expect(result[0].competencyDisplayName).toBe('Reverse right - Control');
      expect(result[0].faultCount).toBe(1);
    });
  });

});
