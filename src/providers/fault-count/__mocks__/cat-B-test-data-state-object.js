import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
export var catBTestDataStateObject = {
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
        physical: false,
        verbal: false,
    },
    eco: {
        adviceGivenControl: false,
        adviceGivenPlanning: false,
    },
    manoeuvres: {
        forwardPark: {
            selected: true,
            controlFault: CompetencyOutcome.DF,
        },
    },
    controlledStop: {
        selected: true,
    },
    vehicleChecks: {
        tellMeQuestion: {
            outcome: CompetencyOutcome.DF,
        },
        showMeQuestion: {
            outcome: CompetencyOutcome.P,
        },
    },
    eyesightTest: {
        complete: true,
        seriousFault: false,
    },
};
//# sourceMappingURL=cat-B-test-data-state-object.js.map