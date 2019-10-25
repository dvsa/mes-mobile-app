import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';

export const getShowMeQuestionOutcome = (vehicleChecks: CatBUniqueTypes.VehicleChecks): QuestionOutcome => {
  return vehicleChecks.showMeQuestion.outcome;
};

export const tellMeQuestionHasFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF;
};

export const hasVehicleChecksFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P
    || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P;
};
