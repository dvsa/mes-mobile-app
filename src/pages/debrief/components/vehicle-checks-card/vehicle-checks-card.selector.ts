import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { VehicleChecks, QuestionOutcome } from '@dvsa/mes-test-schema/categories/B';

export const getShowMeQuestionOutcome = (vehicleChecks: VehicleChecks): QuestionOutcome => {
  return vehicleChecks.showMeQuestion.outcome;
};

export const tellMeQuestionHasFault = (vehicleChecks: VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF;
};

export const hasVehicleChecksFault = (vehicleChecks: VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P
    || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P;
};
