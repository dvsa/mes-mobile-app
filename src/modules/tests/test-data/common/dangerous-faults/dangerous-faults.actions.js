export var ADD_DANGEROUS_FAULT = '[Competency] Add Dangerous Fault';
export var REMOVE_DANGEROUS_FAULT = '[Competency] Remove Dangerous Fault';
export var ADD_DANGEROUS_FAULT_COMMENT = '[Office] Add Dangerous Fault Comment';
var AddDangerousFault = /** @class */ (function () {
    function AddDangerousFault(payload) {
        this.payload = payload;
        this.type = ADD_DANGEROUS_FAULT;
    }
    return AddDangerousFault;
}());
export { AddDangerousFault };
var RemoveDangerousFault = /** @class */ (function () {
    function RemoveDangerousFault(payload) {
        this.payload = payload;
        this.type = REMOVE_DANGEROUS_FAULT;
    }
    return RemoveDangerousFault;
}());
export { RemoveDangerousFault };
var AddDangerousFaultComment = /** @class */ (function () {
    function AddDangerousFaultComment(competencyName, comment) {
        this.competencyName = competencyName;
        this.comment = comment;
        this.type = ADD_DANGEROUS_FAULT_COMMENT;
    }
    return AddDangerousFaultComment;
}());
export { AddDangerousFaultComment };
//# sourceMappingURL=dangerous-faults.actions.js.map