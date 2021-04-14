export var noFaultsMock = {};
export var dangerousFaultMock = {
    dangerousFaults: {
        positioningNormalDriving: true,
    },
};
export var seriousFaultMock = {
    seriousFaults: {
        positioningNormalDriving: true,
    },
};
export var adi2SevenDrivingFaultsMock = {
    drivingFaults: {
        useOfMirrorsSignalling: 1,
        useOfMirrorsChangeDirection: 1,
        useOfMirrorsChangeSpeed: 1,
        signalsNecessary: 1,
        signalsCorrectly: 1,
        signalsTimed: 1,
        junctionsApproachSpeed: 1,
    },
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var sixteenDrivingFaultsMock = {
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
export var adi2SevenDrivingFaultsWithDangerousMock = {
    drivingFaults: adi2SevenDrivingFaultsMock.drivingFaults,
    dangerousFaults: {
        clearance: true,
    },
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var sixteenDrivingFaultsWithDangerousMock = {
    drivingFaults: sixteenDrivingFaultsMock.drivingFaults,
    dangerousFaults: {
        clearance: true,
    },
};
export var adi2SevenDrivingFaultsWithSeriousMock = {
    drivingFaults: adi2SevenDrivingFaultsMock.drivingFaults,
    seriousFaults: {
        positioningNormalDriving: true,
    },
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var sixteenDrivingFaultsWithSeriousMock = {
    drivingFaults: sixteenDrivingFaultsMock.drivingFaults,
    seriousFaults: {
        positioningNormalDriving: true,
    },
};
export var sixDrivingFaultsMock = {
    drivingFaults: {
        useOfMirrorsSignalling: 1,
        useOfMirrorsChangeDirection: 1,
        useOfMirrorsChangeSpeed: 1,
        signalsNecessary: 1,
        signalsCorrectly: 1,
        signalsTimed: 1,
    },
};
export var fifteenDrivingFaultsMock = {
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
export var adi2SixDrivingFaultsWithDangerousMock = {
    drivingFaults: sixDrivingFaultsMock.drivingFaults,
    dangerousFaults: {
        positioningNormalDriving: true,
    },
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var fifteenDrivingFaultsWithDangerousMock = {
    drivingFaults: fifteenDrivingFaultsMock.drivingFaults,
    dangerousFaults: {
        positioningNormalDriving: true,
    },
};
export var adi2SixDrivingFaultsWithSeriousMock = {
    drivingFaults: sixDrivingFaultsMock.drivingFaults,
    seriousFaults: {
        positioningNormalDriving: true,
    },
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var adi2SixDrivingFaultsMock = {
    drivingFaults: sixDrivingFaultsMock.drivingFaults,
    vehicleChecks: {
        dangerousFault: false,
        seriousFault: false,
    },
};
export var adi2DangerousVehicleCheckFaultsMock = {
    drivingFaults: sixDrivingFaultsMock.drivingFaults,
    vehicleChecks: {
        dangerousFault: true,
        seriousFault: false,
    },
};
export var fifteenDrivingFaultsWithSeriousMock = {
    drivingFaults: fifteenDrivingFaultsMock.drivingFaults,
    seriousFaults: {
        positioningNormalDriving: true,
    },
};
//# sourceMappingURL=test-result-data.mock.js.map