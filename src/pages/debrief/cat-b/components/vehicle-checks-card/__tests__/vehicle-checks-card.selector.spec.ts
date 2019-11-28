import {
  VehicleChecksCardComponent
} from '../vehicle-checks-card';
import { CompetencyOutcome } from '../../../../../../shared/models/competency-outcome';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

describe('vehicleChecksCardSelector', () => {

  describe('getShowMeQuestionOutcome', () => {
    it('should return the show me question outcome', () => {
      let vehicleChecks: CatBUniqueTypes.VehicleChecks = {
        showMeQuestion: {
          outcome: CompetencyOutcome.D,
        },
        tellMeQuestion: {},
      };

      let result = VehicleChecksCardComponent.getShowMeQuestionOutcome(vehicleChecks);

      expect(result).toBe(CompetencyOutcome.D);
      vehicleChecks = {
        ...vehicleChecks,
        showMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      result = VehicleChecksCardComponent.getShowMeQuestionOutcome(vehicleChecks);
      expect(result).toBe(CompetencyOutcome.DF);
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

      const result = VehicleChecksCardComponent.tellMeQuestionHasFault(vehicleChecks);

      expect(result).toBe(true);
    });

    it('should return false when no tell me fault', () => {
      const vehicleChecks = {
        showMeQuestion: {},
        tellMeQuestion: {
          outcome: CompetencyOutcome.P,
        },
      };

      const result = VehicleChecksCardComponent.tellMeQuestionHasFault(vehicleChecks);

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

      const result = VehicleChecksCardComponent.hasVehicleChecksFault(vehicleChecks);

      expect(result).toBe(true);
    });

    it('should return true if tell me has a fault', () => {
      const vehicleChecks = {
        showMeQuestion: {},
        tellMeQuestion: {
          outcome: CompetencyOutcome.DF,
        },
      };

      const result = VehicleChecksCardComponent.hasVehicleChecksFault(vehicleChecks);

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

      const result = VehicleChecksCardComponent.hasVehicleChecksFault(vehicleChecks);

      expect(result).toBe(false);
    });

  });
});
