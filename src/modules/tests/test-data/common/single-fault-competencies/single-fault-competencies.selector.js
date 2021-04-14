import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
export var getSingleFaultCompetencies = function (testData) {
    return testData.singleFaultCompetencies;
};
export var hasCompetencyDrivingFault = function (singleFaultCompetencies, competencyName) {
    return singleFaultCompetencies[competencyName] === CompetencyOutcome.DF;
};
export var hasCompetencySeriousFault = function (singleFaultCompetencies, competencyName) {
    return singleFaultCompetencies[competencyName] === CompetencyOutcome.S;
};
export var hasCompetencyDangerousFault = function (singleFaultCompetencies, competencyName) {
    return singleFaultCompetencies[competencyName] === CompetencyOutcome.D;
};
//# sourceMappingURL=single-fault-competencies.selector.js.map