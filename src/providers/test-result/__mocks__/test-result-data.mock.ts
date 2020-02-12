import { TestData } from '@dvsa/mes-test-schema/categories/common';

export const noFaultsMock: TestData = {};

export const dangerousFaultMock: TestData = {
  dangerousFaults: {
    positioningNormalDriving: true,
  },
};

export const seriousFaultMock : TestData = {
  seriousFaults: {
    positioningNormalDriving: true,
  },
};

export const sixteenDrivingFaultsMock: TestData = {
  drivingFaults: {
    useOfMirrorsSignalling: 1,
    useOfMirrorsChangeDirection: 1,
    useOfMirrorsChangeSpeed: 1,
    signalsNecessary: 1,
    signalsCorrectly: 1,
    signalsTimed: 1,
    junctionsApproachSpeed: 1,
    junctionsObservation: 1,
    junctionsTurningRight: 1,
    junctionsTurningLeft: 1,
    junctionsCuttingCorners: 1,
    controlsAccelerator: 1,
    controlsClutch: 1,
    judgementOvertaking: 1,
    progressAppropriateSpeed: 1,
    ancillaryControls: 1,
  },
};

export const sixteenDrivingFaultsWithDangerousMock: TestData = {
  drivingFaults: sixteenDrivingFaultsMock.drivingFaults,
  dangerousFaults: {
    clearance: true,
  },
};

export const sixteenDrivingFaultsWithSeriousMock: TestData = {
  drivingFaults: sixteenDrivingFaultsMock.drivingFaults,
  seriousFaults: {
    positioningNormalDriving: true,
  },
};

export const fifteenDrivingFaultsMock: TestData = {
  drivingFaults: {
    useOfMirrorsSignalling: 1,
    useOfMirrorsChangeDirection: 1,
    useOfMirrorsChangeSpeed: 1,
    signalsNecessary: 1,
    signalsCorrectly: 1,
    signalsTimed: 1,
    junctionsApproachSpeed: 1,
    junctionsObservation: 1,
    junctionsTurningRight: 1,
    junctionsTurningLeft: 1,
    junctionsCuttingCorners: 1,
    controlsAccelerator: 1,
    controlsClutch: 1,
    judgementOvertaking: 1,
    progressAppropriateSpeed: 1,
  },
};

export const fifteenDrivingFaultsWithDangerousMock = {
  drivingFaults: fifteenDrivingFaultsMock.drivingFaults,
  dangerousFaults: {
    positioningNormalDriving: true,
  },
};

export const fifteenDrivingFaultsWithSeriousMock = {
  drivingFaults: fifteenDrivingFaultsMock.drivingFaults,
  seriousFaults: {
    positioningNormalDriving: true,
  },
};
