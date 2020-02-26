import { TestData } from '@dvsa/mes-test-schema/categories/AM2';

export const catAM2TestDataStateObject: TestData = {
  drivingFaults: {
    controlsGears: 1,
    awarenessPlanning: 1,
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
    angledStart: true,
    hillStart: true,
  },
  ETA: {
    verbal: false,
  },
  eco: {
    adviceGivenControl: false,
    adviceGivenPlanning: false,
  },
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
};
