export var catGTestDataStateObject = {
    drivingFaults: {
        controlsGears: 1,
        pedestrianCrossings: 2,
        ancillaryControls: 2,
    },
    seriousFaults: {
        controlsGears: true,
        pedestrianCrossings: true,
        ancillaryControls: true,
        awarenessPlanning: true,
    },
    dangerousFaults: {
        controlsGears: true,
        pedestrianCrossings: true,
        ancillaryControls: true,
        awarenessPlanning: true,
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
            controlFault: 'S',
            selected: true,
        },
    },
    controlledStop: {
        fault: 'D',
        selected: true,
    },
    highwayCodeSafety: {
        selected: true,
        seriousFault: true,
    },
    vehicleChecks: this.vehicleChecksNoFaults,
};
export var catGTestDataVCStateObject = {
    drivingFaults: {
        controlsGears: 1,
        pedestrianCrossings: 2,
        ancillaryControls: 2,
    },
    seriousFaults: {
        controlsGears: true,
        pedestrianCrossings: true,
        ancillaryControls: true,
        awarenessPlanning: true,
    },
    dangerousFaults: {
        controlsGears: true,
        pedestrianCrossings: true,
        ancillaryControls: true,
        awarenessPlanning: true,
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
            controlFault: 'S',
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
//# sourceMappingURL=cat-G-test-data-state-object.js.map