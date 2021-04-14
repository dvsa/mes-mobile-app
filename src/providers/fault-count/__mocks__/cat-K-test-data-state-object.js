export var catKTestDataStateObject = {
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
export var catKTestDataVCStateObject = {
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
    controlledStop: {},
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
//# sourceMappingURL=cat-K-test-data-state-object.js.map