import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
export var catAM1TestDataStateObject = {
    singleFaultCompetencies: {
        useOfStand: CompetencyOutcome.DF,
        manualHandling: CompetencyOutcome.DF,
        slalom: CompetencyOutcome.D,
        slowControl: CompetencyOutcome.S,
        slowControlComments: 'slowControlComments',
        uTurn: CompetencyOutcome.D,
        uTurnComments: 'uTurnComments',
        controlledStop: CompetencyOutcome.S,
        controlledStopComments: 'controlledStopComments',
        emergencyStop: CompetencyOutcome.S,
        emergencyStopComments: 'emergencyStopComments',
        avoidance: CompetencyOutcome.S,
        avoidanceComments: 'avoidanceComments',
    },
    emergencyStop: {
        outcome: CompetencyOutcome.S,
        comments: 'comment1',
    },
    avoidance: {
        outcome: CompetencyOutcome.S,
        comments: 'comment2',
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
//# sourceMappingURL=cat-AM1-test-data-mock.js.map