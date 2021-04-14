import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
export var catADI2TestDataStateObjectNoDrivingFaults = {
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
export var catADI2TestDataStateObjectManoeuvreFaults = {
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
export var catADI2TestDataStateObjectShowMeFaults = {
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
                code: 'T2',
                description: 'Tyre pressures',
                outcome: 'DF',
            },
            {
                code: 'T3',
                description: 'Head restraint',
                outcome: 'DF',
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
export var catADI2TestDataStateObjectTellMeFaults = {
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
        showMeQuestions: [
            {
                code: 'T1',
                description: 'something',
                outcome: 'P',
            },
            {
                code: 'T2',
                description: 'something else',
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
export var catADI2TestDataStateObjectTellShowMeFaults = {
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
                code: 'T1',
                description: 'something',
                outcome: 'DF',
            },
            {
                code: 'T2',
                description: 'something else',
                outcome: 'DF',
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
export var catADI2TestDataStateObjectControlledStopDrivingFaults = {
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
export var catADI2TestDataStateObjectSeriousFaults = {
    drivingFaults: {},
    dangerousFaults: {},
    seriousFaults: {
        useOfMirrorsChangeDirection: true,
    },
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
                outcome: CompetencyOutcome.DF,
            },
        ],
        seriousFault: true,
        dangerousFault: false,
    },
    eco: {},
    ETA: {},
    eyesightTest: {
        complete: true,
        seriousFault: true,
    },
    testRequirements: {},
    manoeuvres: [
        {
            reverseParkCarpark: {
                selected: true,
                controlFault: CompetencyOutcome.S,
            },
        },
    ],
    controlledStop: {
        fault: CompetencyOutcome.S,
        selected: true,
    },
};
export var catADI2TestDataStateObjectDangerousFaults = {
    drivingFaults: {},
    dangerousFaults: {
        useOfMirrorsChangeDirection: true,
    },
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
                outcome: CompetencyOutcome.DF,
            },
        ],
        seriousFault: false,
        dangerousFault: true,
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
                controlFault: CompetencyOutcome.D,
            },
        },
    ],
    controlledStop: {
        fault: CompetencyOutcome.D,
        selected: true,
    },
};
//# sourceMappingURL=cat-ADI2-test-data-state-object.js.map