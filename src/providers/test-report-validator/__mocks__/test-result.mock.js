import { CompetencyOutcome } from '../../../shared/models/competency-outcome';
import { legalRequirementsLabels } from '../../../shared/constants/legal-requirements/legal-requirements.constants';
export var validTestCatAMod2 = {
    testRequirements: {
        angledStart: true,
        hillStart: true,
        normalStart1: true,
        normalStart2: true,
    },
    safetyAndBalanceQuestions: {
        safetyQuestions: [
            {
                code: 'S03',
                description: 'Mock safety question number 1.',
                outcome: CompetencyOutcome.P,
            },
            {
                code: 'S04',
                description: 'Mock safety question number 2.',
                outcome: CompetencyOutcome.P,
            },
        ],
        balanceQuestions: [
            {
                code: 'B03',
                description: 'Mock balance question.',
                outcome: CompetencyOutcome.P,
            },
        ],
    },
    eco: {
        completed: true,
    },
};
export var validTestCatADIPart2 = {
    testRequirements: {
        angledStart: true,
        downhillStart: true,
        uphillStart: true,
        normalStart1: true,
        normalStart2: true,
    },
    vehicleChecks: {
        showMeQuestions: [
            {
                outcome: CompetencyOutcome.P,
            },
            {
                outcome: CompetencyOutcome.P,
            },
            {
                outcome: CompetencyOutcome.P,
            },
        ],
        tellMeQuestions: [
            {
                outcome: CompetencyOutcome.P,
            },
            {
                outcome: CompetencyOutcome.P,
            },
            {
                outcome: CompetencyOutcome.P,
            },
        ],
        vehicleChecksCompleted: true,
    },
    manoeuvres: [
        {
            reverseRight: {
                selected: true,
            },
        },
        {
            reverseParkCarpark: {
                selected: true,
            },
        },
    ],
    eco: {
        completed: true,
    },
};
export var validTestCatB = {
    testRequirements: {
        angledStart: true,
        hillStart: true,
        normalStart1: true,
        normalStart2: true,
    },
    vehicleChecks: {
        showMeQuestion: {
            outcome: CompetencyOutcome.P,
        },
        tellMeQuestion: {
            outcome: CompetencyOutcome.P,
        },
    },
    manoeuvres: {
        forwardPark: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validTestCatBE = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validDelegatedTestCatBE = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: false,
        uphillStart: false,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatC = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validDelegatedTestCatCAndC1 = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: false,
        uphillStart: false,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validTestCatC1 = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validDelegatedTestCatCEAndC1E = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: false,
        uphillStart: false,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatCE = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatC1E = {
    testRequirements: {
        angledStartControlledStop: true,
        normalStart2: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validDelegatedTestCatDAndD1 = {
    testRequirements: {
        busStop1: false,
        busStop2: false,
        angledStartControlledStop: true,
        uphillStart: false,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validTestCatD = {
    testRequirements: {
        busStop1: true,
        busStop2: true,
        angledStartControlledStop: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validDelegatedTestCatD1AndD1E = {
    testRequirements: {
        normalStart1: true,
        normalStart2: true,
        angledStartControlledStop: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatD1 = {
    testRequirements: {
        normalStart1: true,
        normalStart2: true,
        angledStartControlledStop: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
};
export var validTestCatDE = {
    testRequirements: {
        busStop1: true,
        busStop2: true,
        angledStartControlledStop: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatD1E = {
    testRequirements: {
        normalStart1: true,
        normalStart2: true,
        angledStartControlledStop: true,
        uphillStart: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    eco: {
        completed: true,
    },
    uncoupleRecouple: {
        selected: true,
    },
};
export var validTestCatF = {
    testRequirements: {
        angledStart: true,
        normalStart1: true,
        normalStart2: true,
        uphillStartDesignatedStart: true,
    },
    eco: {
        completed: true,
    },
    highwayCodeSafety: {
        selected: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    controlledStop: {
        selected: true,
    },
};
export var validTestCatG = {
    testRequirements: {
        angledStart: true,
        normalStart1: true,
        normalStart2: true,
        uphillStartDesignatedStart: true,
    },
    eco: {
        completed: true,
    },
    highwayCodeSafety: {
        selected: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    controlledStop: {
        selected: true,
    },
};
export var validTestCatH = {
    testRequirements: {
        angledStart: true,
        normalStart1: true,
        normalStart2: true,
        uphillStartDesignatedStart: true,
    },
    eco: {
        completed: true,
    },
    highwayCodeSafety: {
        selected: true,
    },
    manoeuvres: {
        reverseLeft: {
            selected: true,
        },
    },
    controlledStop: {
        selected: true,
    },
};
export var validTestCatK = {
    testRequirements: {
        angledStart: true,
        normalStart1: true,
        normalStart2: true,
        uphillStartDesignatedStart: true,
    },
    eco: {
        completed: true,
    },
    highwayCodeSafety: {
        selected: true,
    },
    controlledStop: {
        selected: true,
    },
};
export var legalRequirementsAMod2 = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.hillStart,
    legalRequirementsLabels.safetyAndBalanceQuestions,
    legalRequirementsLabels.eco,
];
export var legalRequirementsADIPart2 = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.downhillStart,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.vehicleChecks,
    legalRequirementsLabels.eco,
];
export var legalRequirementsB = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.hillStart,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.vehicleChecks,
    legalRequirementsLabels.eco,
];
export var legalRequirementsBE = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var delegatedRequirementsBE = [
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var legalRequirementsCatCAndC1 = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
];
export var delegatedRequirementsCatCAndC1 = [
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
];
export var legalRequirementsCatCEAndC1E = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var delegatedRequirementsCatCEAndC1E = [
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var legalRequirementsCatD = [
    legalRequirementsLabels.busStop1,
    legalRequirementsLabels.busStop2,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
];
export var delegatedRequirementsCatDAndD1 = [
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
];
export var legalRequirementsCatD1 = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
];
export var legalRequirementsCatDE = [
    legalRequirementsLabels.busStop1,
    legalRequirementsLabels.busStop2,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var delegatedRequirementsCatDEAndD1E = [
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var legalRequirementsCatD1E = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.uphillStart,
    legalRequirementsLabels.angledStartControlledStop,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.uncoupleRecouple,
];
export var legalRequirementsCatF = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.uphillStartDesignatedStart,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.highwayCodeSafety,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.controlledStop,
];
export var legalRequirementsCatG = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.uphillStartDesignatedStart,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.highwayCodeSafety,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.controlledStop,
];
export var legalRequirementsCatH = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.uphillStartDesignatedStart,
    legalRequirementsLabels.manoeuvre,
    legalRequirementsLabels.highwayCodeSafety,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.controlledStop,
];
export var legalRequirementsCatK = [
    legalRequirementsLabels.normalStart1,
    legalRequirementsLabels.normalStart2,
    legalRequirementsLabels.angledStart,
    legalRequirementsLabels.uphillStartDesignatedStart,
    legalRequirementsLabels.highwayCodeSafety,
    legalRequirementsLabels.eco,
    legalRequirementsLabels.controlledStop,
];
//# sourceMappingURL=test-result.mock.js.map