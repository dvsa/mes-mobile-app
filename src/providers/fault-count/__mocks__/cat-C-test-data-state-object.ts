import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { ManoeuvreOutcome } from '@dvsa/mes-test-schema/categories/common';
import { QuestionResult } from '@dvsa/mes-test-schema/categories/C/partial';
import { CatCUniqueTypes } from '@dvsa/mes-test-schema/categories/C';

export const catCTestDataStateObject: CatCUniqueTypes.TestData = {
  drivingFaults: {
    controlsGears: 1,
    pedestrianCrossings: 1,
    ancillaryControls: 1,
  },
  seriousFaults: {
    awarenessPlanning: true,
  },
  dangerousFaults: {
    useOfSpeed: true,
  },
  testRequirements: {
    normalStart1: true,
    normalStart2: true,
    angledStartControlledStop: true,
    uphillStart: true,
    downhillStart: true,
  },
  ETA: {
    physical: false,
    verbal: false,
  },
  eco: {
    adviceGivenControl: false,
    adviceGivenPlanning: false,
  },
  manoeuvres: {
    reverseLeft: {
      controlFault: CompetencyOutcome.DF as ManoeuvreOutcome,
      selected: true,
    },
  },
  vehicleChecks: {
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
  },
};
