import {
  getShowMeQuestionText,
  tellMeQuestionHasFault,
  hasVehicleChecksFault,
} from '../vehicle-checks-card.selector';
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

describe('vehicleChecksCardSelector', () => {
  describe('getShowMeQuestionText', () => {
    it('should return dangerous fault text', () => {
      const vehicleChecks: VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.D,
        },
        tellMeQuestion: {},
      };

      const result = getShowMeQuestionText(vehicleChecks);

      expect(result).toBe('Show me question - Dangerous fault');
    });

    it('should return serious fault text', () => {
      const vehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.S,
        },
        tellMeQuestion: {},
      };

      const result = getShowMeQuestionText(vehicleChecks);

      expect(result).toBe('Show me question - Serious fault');
    });

    it('should return driving fault text', () => {
      const vehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
        tellMeQuestion: {},
      };

      const result = getShowMeQuestionText(vehicleChecks);

      expect(result).toBe('Show me question - Driving fault');
    });

    it('should return undefined when no show me fault', () => {
      const vehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.P,
        },
        tellMeQuestion: {},
      };

      const result = getShowMeQuestionText(vehicleChecks);

      expect(result).toBe(undefined);
    });

  });

  describe('tellMeQuestionHasFault', () => {

    it('should return true when theres a driving fault for tell me', () => {
      const vehicleChecks = {
        showMeQuestion: {},
        tellMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result = tellMeQuestionHasFault(vehicleChecks);

      expect(result).toBe(true);
    });

    it('should return false when no tell me fault', () => {
      const vehicleChecks = {
        showMeQuestion: {},
        tellMeQuestion: {
          outcome: CompetencyOutcome.P,
        },
      };

      const result = tellMeQuestionHasFault(vehicleChecks);

      expect(result).toBe(false);
    });

  });

  describe('hasVehicleChecksFault', () => {

    it('should return true if show me has a fault', () => {
      const vehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
        tellMeQuestion: {},
      };

      const result = hasVehicleChecksFault(vehicleChecks);

      expect(result).toBe(true);
    });

    it('should return true if tell me has a fault', () => {
      const vehicleChecks = {
        showMeQuestion: {},
        tellMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result = hasVehicleChecksFault(vehicleChecks);

      expect(result).toBe(true);
    });

    it('should return false when no vehicle checks fault', () => {
      const vehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.P,
        },
        tellMeQuestion: {
          outcome: CompetencyOutcome.P,
        },
      };

      const result = hasVehicleChecksFault(vehicleChecks);

      expect(result).toBe(false);
    });

  });
});
