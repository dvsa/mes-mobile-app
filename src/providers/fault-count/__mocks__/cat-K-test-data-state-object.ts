import { QuestionResult } from '@dvsa/mes-test-schema/categories/K/partial';
import { CatKUniqueTypes } from '@dvsa/mes-test-schema/categories/K';

export const catKTestDataStateObject: CatKUniqueTypes.TestData = {
  drivingFaults: {
    controlsGears: 1,
    pedestrianCrossings: 2,
    ancillaryControls: 1,
  },
  seriousFaults: {},
  dangerousFaults: {},
  testRequirements: {
    normalStart1: true,
    normalStart2: true,
    angledStart: true,
    uphillStartDesignatedStart: true,
  },
  ETA: {
    physical: false,
    verbal: false,
  },
  eco: {
    adviceGivenControl: false,
    adviceGivenPlanning: false,
  },
  vehicleChecks: this.vehicleChecksNoFaults,
};

export const catKTestDataVCStateObject: CatKUniqueTypes.TestData = {
  drivingFaults: {
    controlsGears: 1,
    pedestrianCrossings: 2,
    ancillaryControls: 1,
  },
  seriousFaults: {},
  dangerousFaults: {},
  testRequirements: {
    normalStart1: true,
    normalStart2: true,
    angledStart: true,
    uphillStartDesignatedStart: true,
  },
  ETA: {
    physical: false,
    verbal: false,
  },
  eco: {
    adviceGivenControl: false,
    adviceGivenPlanning: false,
  },
  vehicleChecks: {
    tellMeQuestions: [{
      code: 'string',
      description: 'string',
      outcome: 'DF',
    }] as QuestionResult[],
    showMeQuestions: [{
      code: 'string',
      description: 'string',
      outcome: 'DF',
    }] as QuestionResult[],
  },
};

export const vehicleChecksNoFaults = {
  tellMeQuestions: [{
    code: 'string',
    description: 'string',
    outcome: 'P',
  }] as QuestionResult[],
  showMeQuestions: [{
    code: 'string',
    description: 'string',
    outcome: 'P',
  }] as QuestionResult[],
};

export const vehicleChecksTwoFaults = {
  tellMeQuestions: [{
    code: 'string',
    description: 'string',
    outcome: 'DF',
  }] as QuestionResult[],
  showMeQuestions: [{
    code: 'string',
    description: 'string',
    outcome: 'DF',
  }] as QuestionResult[],
};
