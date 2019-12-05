import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';

export const validTestCatB: CatBUniqueTypes.TestData = {
  testRequirements: {
    angledStart: true,
    hillStart: true,
    normalStart1: true,
    normalStart2: true,
  },
  vehicleChecks: {
    showMeQuestion: {
      outcome: CompetencyOutcome.P,
    },
    tellMeQuestion: {
      outcome: CompetencyOutcome.P,
    },
  },
  manoeuvres: {
    forwardPark: {
      selected: true,
    },
  },
  eco: {
    completed: true,
  },
};

export const validTestCatBE: CatBEUniqueTypes.TestData = {
  testRequirements: {
    angledStartControlledStop: true,
    normalStart2: true,
    uphillStart: true,
  },
  manoeuvres: {
    reverseLeft: {
      selected: true,
    },
  },
  vehicleChecks: {
    tellMeQuestions: [
      { outcome: CompetencyOutcome.P },
      { outcome: CompetencyOutcome.P },
    ],
    showMeQuestions: [
      { outcome: CompetencyOutcome.P },
      { outcome: CompetencyOutcome.P },
      { outcome: CompetencyOutcome.P },
    ],
  },
  eco: {
    completed: true,
  },
  uncoupleRecouple: {
    selected: true,
  },
};
