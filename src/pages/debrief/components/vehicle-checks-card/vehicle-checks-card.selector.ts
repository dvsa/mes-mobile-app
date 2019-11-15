import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
import { QuestionOutcome } from '@dvsa/mes-test-schema/categories/Common';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';

export const getShowMeQuestionOutcome = (vehicleChecks: CatBUniqueTypes.VehicleChecks|
  CatBEUniqueTypes.VehicleChecks): QuestionOutcome => {
  if (isCatBVehicleCheck(vehicleChecks)) {
    return getShowMeQuestionOutcomeB(vehicleChecks);
  }
  if (isCatBEVehicleCheck(vehicleChecks)) {
    return getShowMeQuestionOutcomeBE(vehicleChecks);
  }
};

export const getShowMeQuestionOutcomeB = (vehicleChecks: CatBUniqueTypes.VehicleChecks): QuestionOutcome => {
  return vehicleChecks.showMeQuestion.outcome;
};

export const getShowMeQuestionOutcomeBE = (vehicleChecks: CatBUniqueTypes.VehicleChecks): QuestionOutcome => {
  // TODO work on functionality of card to handle BE - if needed, it is possible we will have a separate component.
  return 'P';
};

export const tellMeQuestionHasFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks|
  CatBEUniqueTypes.VehicleChecks): boolean => {
  if (isCatBVehicleCheck(vehicleChecks)) {
    return tellMeQuestionHasFaultB(vehicleChecks);
  }
  if (isCatBEVehicleCheck(vehicleChecks)) {
    return tellMeQuestionHasFaultBE(vehicleChecks);
  }
};

export const tellMeQuestionHasFaultB = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome === CompetencyOutcome.DF;
};
export const tellMeQuestionHasFaultBE = (vehicleChecks: CatBEUniqueTypes.VehicleChecks): boolean => {
  const tellMeFaultIndex = vehicleChecks.tellMeQuestions.findIndex(fault => fault.outcome === CompetencyOutcome.DF);

  return tellMeFaultIndex >= 0;
};

export const hasVehicleChecksFaultB = (vehicleChecks: CatBUniqueTypes.VehicleChecks): boolean => {
  return vehicleChecks.tellMeQuestion.outcome && vehicleChecks.tellMeQuestion.outcome !== CompetencyOutcome.P
    || vehicleChecks.showMeQuestion.outcome && vehicleChecks.showMeQuestion.outcome !== CompetencyOutcome.P;
};
export const hasVehicleChecksFaultBE = (vehicleChecks: CatBEUniqueTypes.VehicleChecks): boolean => {
  if (!vehicleChecks || !vehicleChecks.showMeQuestions && !vehicleChecks.tellMeQuestions) {
    return false;
  }
  const showMeFaultIndex = vehicleChecks.showMeQuestions.findIndex(fault => fault.outcome !== CompetencyOutcome.P);
  const tellMeFaultIndex = vehicleChecks.tellMeQuestions.findIndex(fault => fault.outcome !== CompetencyOutcome.P);

  return showMeFaultIndex >= 0 || tellMeFaultIndex >= 0;
};

export const hasVehicleChecksFault = (vehicleChecks: CatBUniqueTypes.VehicleChecks|CatBEUniqueTypes.VehicleChecks) => {
  if (isCatBVehicleCheck(vehicleChecks)) {
    return hasVehicleChecksFaultB(vehicleChecks);
  }
  if (isCatBEVehicleCheck(vehicleChecks)) {
    return hasVehicleChecksFaultBE(vehicleChecks);
  }
};

// type guards to detect correct type
function isCatBVehicleCheck(toBeDetermined: CatBUniqueTypes.VehicleChecks|CatBEUniqueTypes.VehicleChecks):
toBeDetermined is CatBUniqueTypes.VehicleChecks {
  if ((toBeDetermined as CatBUniqueTypes.VehicleChecks).showMeQuestion) {
    return true;
  }
  return false;
}

function isCatBEVehicleCheck(toBeDetermined: CatBUniqueTypes.VehicleChecks|CatBEUniqueTypes.VehicleChecks):
toBeDetermined is CatBEUniqueTypes.VehicleChecks {
  if ((toBeDetermined as CatBEUniqueTypes.VehicleChecks).showMeQuestions) {
    return true;
  }
  return false;
}
