export var catC1TestDataStateObject = {
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
    vehicleChecks: {
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
    },
};
//# sourceMappingURL=cat-C1-test-data-state-object.js.map