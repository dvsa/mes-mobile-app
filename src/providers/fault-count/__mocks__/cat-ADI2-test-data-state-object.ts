import { CatADI2UniqueTypes } from '@dvsa/mes-test-schema/categories/ADI2';

export const catADI2TestDataStateObjectNoDrivingFaults: CatADI2UniqueTypes.TestData = {
  drivingFaults: {},
  dangerousFaults: {},
  seriousFaults: {},
  vehicleChecks: {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'Brakes',
        outcome: 'P',
      },
      {
        code: 'T2',
        description: 'Tyre pressures',
        outcome: 'P',
      },
      {
        code: 'T3',
        description: 'Head restraint',
        outcome: 'P',
      },
    ],
  },
  eco: {},
  ETA: {},
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
  testRequirements: {},
  manoeuvres: [],
  controlledStop: {},
};

export const catADI2TestDataStateObjectManoeuvreFaults: CatADI2UniqueTypes.TestData = {
  drivingFaults: {},
  dangerousFaults: {},
  seriousFaults: {},
  vehicleChecks: {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'Brakes',
        outcome: 'P',
      },
      {
        code: 'T2',
        description: 'Tyre pressures',
        outcome: 'P',
      },
      {
        code: 'T3',
        description: 'Head restraint',
        outcome: 'P',
      },
    ],
  },
  eco: {},
  ETA: {},
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
  testRequirements: {},
  manoeuvres: [
    {
      reverseParkCarpark: {
        selected: true,
        controlFault: 'DF',
      },
    },
  ],
  controlledStop: {},
};

export const catADI2TestDataStateObjectTellMeFaults: CatADI2UniqueTypes.TestData = {
  drivingFaults: {},
  dangerousFaults: {},
  seriousFaults: {},
  vehicleChecks: {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'Brakes',
        outcome: 'DF',
      },
      {
        code: 'T2',
        description: 'Tyre pressures',
        outcome: 'DF',
      },
      {
        code: 'T3',
        description: 'Head restraint',
        outcome: 'P',
      },
    ],
  },
  eco: {},
  ETA: {},
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
  testRequirements: {},
  manoeuvres: [],
  controlledStop: {},
};

export const catADI2TestDataStateObjectControlledStopDrivingFaults: CatADI2UniqueTypes.TestData = {
  drivingFaults: {},
  dangerousFaults: {},
  seriousFaults: {},
  vehicleChecks: {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'Brakes',
        outcome: 'P',
      },
      {
        code: 'T2',
        description: 'Tyre pressures',
        outcome: 'P',
      },
      {
        code: 'T3',
        description: 'Head restraint',
        outcome: 'P',
      },
    ],
  },
  eco: {},
  ETA: {},
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
  testRequirements: {},
  manoeuvres: [],
  controlledStop: {
    fault: 'DF',
    selected: true,
  },
};

export const catADI2TestDataStateObjectSeriousFaults: CatADI2UniqueTypes.TestData = {
  drivingFaults: {},
  dangerousFaults: {},
  seriousFaults: {},
  vehicleChecks: {
    tellMeQuestions: [
      {
        code: 'T1',
        description: 'Brakes',
        outcome: 'P',
      },
      {
        code: 'T2',
        description: 'Tyre pressures',
        outcome: 'P',
      },
      {
        code: 'T3',
        description: 'Head restraint',
        outcome: 'P',
      },
    ],
    showMeQuestions: [
      {
        outcome: 'S',
      },
    ],
  },
  eco: {},
  ETA: {},
  eyesightTest: {
    complete: true,
    seriousFault: false,
  },
  testRequirements: {},
  manoeuvres: [
    {
      reverseParkCarpark: {
        selected: true,
        controlFault: 'S',
      },
    },
  ],
  controlledStop: {
    fault: 'S',
    selected: true,
  },
};
