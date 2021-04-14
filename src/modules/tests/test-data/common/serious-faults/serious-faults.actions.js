export var ADD_SERIOUS_FAULT = '[Competency] Add Serious Fault';
export var REMOVE_SERIOUS_FAULT = '[Competency] Remove Serious Fault';
export var ADD_SERIOUS_FAULT_COMMENT = '[Office] Add Serious Fault Comment';
var AddSeriousFault = /** @class */ (function () {
    function AddSeriousFault(payload) {
        this.payload = payload;
        this.type = ADD_SERIOUS_FAULT;
    }
    return AddSeriousFault;
}());
export { AddSeriousFault };
var RemoveSeriousFault = /** @class */ (function () {
    function RemoveSeriousFault(payload) {
        this.payload = payload;
        this.type = REMOVE_SERIOUS_FAULT;
    }
    return RemoveSeriousFault;
}());
export { RemoveSeriousFault };
var AddSeriousFaultComment = /** @class */ (function () {
    function AddSeriousFaultComment(competencyName, comment) {
        this.competencyName = competencyName;
        this.comment = comment;
        this.type = ADD_SERIOUS_FAULT_COMMENT;
    }
    return AddSeriousFaultComment;
}());
export { AddSeriousFaultComment };
//# sourceMappingURL=serious-faults.actions.js.map