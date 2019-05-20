import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { VehicleChecks } from '@dvsa/mes-test-schema/categories/B';

export const getShowMeQuestionText = (vehicleChecks: VehicleChecks): string => {
  if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.D) {
    return 'Show me question - Dangerous fault';
  }
  if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.S) {
    return 'Show me question - Serious fault';
  }
  if (vehicleChecks.showMeQuestion.outcome === CompetencyOutcome.DF) {
    return 'Show me question - Driving fault';
  }
  return;
};

export const tellMeQuestionHasFault = (vehicleChecks: VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF;
};

export const hasVehicleChecksFault = (vehicleChecks: VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P
    || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P;
};
