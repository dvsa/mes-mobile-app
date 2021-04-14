import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
export var catAM2TestDataStateObject = {
    drivingFaults: {
        controlsGears: 1,
        awarenessPlanning: 1,
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
        angledStart: true,
        hillStart: true,
    },
    ETA: {
        verbal: false,
    },
    eco: {
        adviceGivenControl: false,
        adviceGivenPlanning: false,
    },
    eyesightTest: {
        complete: true,
        seriousFault: false,
    },
};
export var safetyAndBalanceMock0Faults = {};
export var safetyAndBalanceMock2FaultsSafety = {
    safetyQuestions: [
        {
            outcome: CompetencyOutcome.DF,
        },
        {
            outcome: CompetencyOutcome.DF,
        },
    ],
};
export var safetyAndBalanceMock2FaultsSafetyAndBalance = {
    safetyQuestions: [
        {
            outcome: CompetencyOutcome.DF,
        },
    ],
    balanceQuestions: [
        {
            outcome: CompetencyOutcome.DF,
        },
    ],
};
export var safetyAndBalanceMock3FaultsSafetyAndBalance = {
    safetyQuestions: [
        {
            outcome: CompetencyOutcome.DF,
        },
        {
            outcome: CompetencyOutcome.DF,
        },
    ],
    balanceQuestions: [
        {
            outcome: CompetencyOutcome.DF,
        }
    ],
};
//# sourceMappingURL=cat-AM2-test-data-state-object.js.map