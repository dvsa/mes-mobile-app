export var catHTestDataStateObject = {
    drivingFaults: {},
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
            controlFault: 'D',
            selected: true,
        },
    },
    controlledStop: {
        fault: 'S',
        selected: true,
    },
    vehicleChecks: this.vehicleChecksNoFaults,
};
export var catHTestDataVCStateObject = {
    drivingFaults: {},
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
            controlFault: 'D',
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
//# sourceMappingURL=cat-H-test-data-state-object.js.map