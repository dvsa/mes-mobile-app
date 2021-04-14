var QuestionProviderMock = /** @class */ (function () {
    function QuestionProviderMock() {
    }
    QuestionProviderMock.prototype.getTellMeQuestions = function (testCategory) {
        return [
            { code: 'T1', description: 'What time is it?', shortName: 'What' },
            { code: 'T2', description: 'Where are we?', shortName: 'Where' },
        ];
    };
    QuestionProviderMock.prototype.getShowMeQuestions = function (testCategory) {
        return [
            { code: 'S1', description: 'Who are we?', shortName: 'Who' },
            { code: 'S2', description: 'Why are we here?', shortName: 'Why' },
        ];
    };
    QuestionProviderMock.prototype.calculateFaults = function (vehicleChecksQuestions) {
        return {
            drivingFaults: 4,
            seriousFaults: 1,
        };
    };
    return QuestionProviderMock;
}());
export { QuestionProviderMock };
export function getCatBeVehicleChecks4Faults() {
    return {
        showMeQuestions: [
            generateQuestionResult('a', 'desc', 'P'),
            generateQuestionResult('b', 'desc2', 'DF'),
            generateQuestionResult('c', 'desc3', 'DF'),
        ],
        tellMeQuestions: [
            generateQuestionResult('d', 'desc4', 'DF'),
            generateQuestionResult('e', 'desc5', 'DF'),
        ],
    };
}
export function getCatBeVehicleChecksNoFaults() {
    return {
        showMeQuestions: [
            generateQuestionResult('a', 'desc', 'P'),
            generateQuestionResult('b', 'desc2', 'P'),
            generateQuestionResult('c', 'desc3', 'P'),
        ],
        tellMeQuestions: [
            generateQuestionResult('d', 'desc4', 'P'),
            generateQuestionResult('e', 'desc5', 'P'),
        ],
    };
}
export function getCatBeVehicleChecks5Faults() {
    return {
        showMeQuestions: [
            generateQuestionResult('a', 'desc', 'DF'),
            generateQuestionResult('b', 'desc2', 'DF'),
            generateQuestionResult('c', 'desc3', 'DF'),
        ],
        tellMeQuestions: [
            generateQuestionResult('d', 'desc4', 'DF'),
            generateQuestionResult('e', 'desc5', 'DF'),
        ],
    };
}
function generateQuestionResult(code, description, outcome) {
    return {
        code: code,
        description: description,
        outcome: outcome,
    };
}
export function generateVehicleChecksScoring(drivingFaults, seriousFaults) {
    return {
        seriousFaults: seriousFaults,
        drivingFaults: drivingFaults,
    };
}
//# sourceMappingURL=question.mock.js.map