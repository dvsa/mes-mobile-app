export var catFTestDataStateObject = {
    drivingFaults: {
        controlsGears: 1,
    },
    seriousFaults: {
        awarenessPlanning: true,
        pedestrianCrossings: true,
    },
    dangerousFaults: {
        useOfSpeed: true,
        ancillaryControls: true,
    },
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
    manoeuvres: {
        reverseLeft: {
            controlFault: 'DF',
            selected: true,
        },
    },
    controlledStop: {
        fault: 'DF',
        selected: true,
    },
    highwayCodeSafety: {
        selected: true,
        drivingFault: true,
    },
    vehicleChecks: this.vehicleChecksNoFaults,
};
export var catFTestDataVCStateObject = {
    drivingFaults: {
        controlsGears: 1,
    },
    seriousFaults: {
        awarenessPlanning: true,
        pedestrianCrossings: true,
    },
    dangerousFaults: {
        useOfSpeed: true,
        ancillaryControls: true,
    },
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
    manoeuvres: {
        reverseLeft: {
            controlFault: 'DF',
            selected: true,
        },
    },
    vehicleChecks: {
        tellMeQuestions: [{
                code: 'string',
                description: 'string',
                outcome: 'DF',
            }],
        showMeQuestions: [{
                code: 'string',
                description: 'string',
                outcome: 'DF',
            }],
    },
};
export var vehicleChecksNoFaults = {
    tellMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'P',
        }],
    showMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'P',
        }],
};
export var vehicleChecksTwoFaults = {
    tellMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'DF',
        }],
    showMeQuestions: [{
            code: 'string',
            description: 'string',
            outcome: 'DF',
        }],
};
//# sourceMappingURL=cat-F-test-data-state-object.js.map