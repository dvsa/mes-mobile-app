export var SET_SINGLE_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Set Outcome';
export var REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Remove Outcome';
export var REMOVE_SINGLE_SERIOUS_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Remove Serious Outcome';
export var REMOVE_SINGLE_DANGEROUS_FAULT_COMPETENCY_OUTCOME = '[Single Fault Competency] Remove Dangerous Outcome';
export var ADD_SINGLE_FAULT_COMPETENCY_COMMENT = '[Single Fault Competency] Add Comment';
var SetSingleFaultCompetencyOutcome = /** @class */ (function () {
    function SetSingleFaultCompetencyOutcome(competencyName, outcome) {
        this.competencyName = competencyName;
        this.outcome = outcome;
        this.type = SET_SINGLE_FAULT_COMPETENCY_OUTCOME;
    }
    return SetSingleFaultCompetencyOutcome;
}());
export { SetSingleFaultCompetencyOutcome };
var RemoveSingleFaultCompetencyOutcome = /** @class */ (function () {
    function RemoveSingleFaultCompetencyOutcome(competencyName) {
        this.competencyName = competencyName;
        this.type = REMOVE_SINGLE_FAULT_COMPETENCY_OUTCOME;
    }
    return RemoveSingleFaultCompetencyOutcome;
}());
export { RemoveSingleFaultCompetencyOutcome };
var RemoveSingleDangerousFaultCompetencyOutcome = /** @class */ (function () {
    function RemoveSingleDangerousFaultCompetencyOutcome(competencyName) {
        this.competencyName = competencyName;
        this.type = REMOVE_SINGLE_DANGEROUS_FAULT_COMPETENCY_OUTCOME;
    }
    return RemoveSingleDangerousFaultCompetencyOutcome;
}());
export { RemoveSingleDangerousFaultCompetencyOutcome };
var RemoveSingleSeriousFaultCompetencyOutcome = /** @class */ (function () {
    function RemoveSingleSeriousFaultCompetencyOutcome(competencyName) {
        this.competencyName = competencyName;
        this.type = REMOVE_SINGLE_SERIOUS_FAULT_COMPETENCY_OUTCOME;
    }
    return RemoveSingleSeriousFaultCompetencyOutcome;
}());
export { RemoveSingleSeriousFaultCompetencyOutcome };
var AddSingleFaultCompetencyComment = /** @class */ (function () {
    function AddSingleFaultCompetencyComment(competencyName, comment) {
        this.competencyName = competencyName;
        this.comment = comment;
        this.type = ADD_SINGLE_FAULT_COMPETENCY_COMMENT;
    }
    return AddSingleFaultCompetencyComment;
}());
export { AddSingleFaultCompetencyComment };
//# sourceMappingURL=single-fault-competencies.actions.js.map