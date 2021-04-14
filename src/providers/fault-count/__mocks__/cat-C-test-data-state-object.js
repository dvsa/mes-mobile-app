export var catCTestDataStateObject = {
    drivingFaults: {
        controlsGears: 1,
        pedestrianCrossings: 2,
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
            controlFault: 'DF',
            selected: true,
        },
    },
    vehicleChecks: this.vehicleChecksNoFaults,
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
export var vehicleChecksFiveFaults = {
    tellMeQuestions: [
        {
            code: 'string',
            description: 'string',
            outcome: 'DF',
        },
        {
            code: 'string',
            description: 'string',
            outcome: 'DF',
        },
        {
            code: 'string',
            description: 'string',
            outcome: 'DF',
        },
    ],
    showMeQuestions: [
        {
            code: 'string',
            description: 'string',
            outcome: 'DF',
        },
        {
            code: 'string',
            description: 'string',
            outcome: 'DF',
        },
    ],
};
//# sourceMappingURL=cat-C-test-data-state-object.js.map