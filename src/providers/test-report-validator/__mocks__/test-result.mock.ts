import { CatBEUniqueTypes } from '@dvsa/mes-test-schema/categories/BE';
import { CatBUniqueTypes } from '@dvsa/mes-test-schema/categories/B';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';
import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { CatCEUniqueTypes } from '@dvsa/mes-test-schema/categories/CE';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';

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

export const validTestCatCNonTrailer: CatCUniqueTypes.TestData = {
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
};

export const validTestCatCTrailer: CatCEUniqueTypes.TestData = {
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

export const legalRequirementsCatCNonTrailer = [
  legalRequirementsLabels.normalStart1,
  legalRequirementsLabels.uphillStart,
  legalRequirementsLabels.angledStartControlledStop,
  legalRequirementsLabels.manoeuvre,
  legalRequirementsLabels.eco,
];

export const legalRequirementsCatCTrailer = [
  legalRequirementsLabels.normalStart1,
  legalRequirementsLabels.uphillStart,
  legalRequirementsLabels.angledStartControlledStop,
  legalRequirementsLabels.manoeuvre,
  legalRequirementsLabels.eco,
  legalRequirementsLabels.uncoupleRecouple,
];
