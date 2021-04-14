import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
export var catAM1TestDataStateObject = {
    singleFaultCompetencies: {
        useOfStand: CompetencyOutcome.D,
        manualHandling: CompetencyOutcome.D,
        slalom: CompetencyOutcome.D,
        slowControl: CompetencyOutcome.S,
        uTurn: CompetencyOutcome.D,
        controlledStop: CompetencyOutcome.S,
        emergencyStop: CompetencyOutcome.DF,
        avoidance: CompetencyOutcome.DF,
    },
    emergencyStop: {
        outcome: CompetencyOutcome.S,
    },
    avoidance: {
        outcome: CompetencyOutcome.S,
    },
    drivingFaults: {
        precautions: 2,
        moveOffSafety: 1,
    },
    seriousFaults: {
        precautions: true,
    },
    dangerousFaults: {
        moveOffControl: true,
    },
    ETA: {
        physical: false,
        verbal: false,
    },
};
//# sourceMappingURL=cat-AM1-test-data-state-object.js.map