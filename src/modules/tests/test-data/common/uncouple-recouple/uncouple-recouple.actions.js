export var TOGGLE_UNCOUPLE_RECOUPLE = '[UncoupleRecouple] Toggle Uncouple Recouple';
export var UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT = '[UncoupleRecouple] Add Driving Fault';
export var UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT = '[UncoupleRecouple] Add Serious Fault';
export var UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT = '[UncoupleRecouple] Add Dangerous Fault';
export var UNCOUPLE_RECOUPLE_REMOVE_FAULT = '[UncoupleRecouple] Remove Fault';
export var ADD_UNCOUPLE_RECOUPLE_COMMENT = '[UncoupleRecouple] Add Comment';
var ToggleUncoupleRecouple = /** @class */ (function () {
    function ToggleUncoupleRecouple() {
        this.type = TOGGLE_UNCOUPLE_RECOUPLE;
    }
    return ToggleUncoupleRecouple;
}());
export { ToggleUncoupleRecouple };
var UncoupleRecoupleAddDrivingFault = /** @class */ (function () {
    function UncoupleRecoupleAddDrivingFault() {
        this.type = UNCOUPLE_RECOUPLE_ADD_DRIVING_FAULT;
    }
    return UncoupleRecoupleAddDrivingFault;
}());
export { UncoupleRecoupleAddDrivingFault };
var UncoupleRecoupleAddSeriousFault = /** @class */ (function () {
    function UncoupleRecoupleAddSeriousFault() {
        this.type = UNCOUPLE_RECOUPLE_ADD_SERIOUS_FAULT;
    }
    return UncoupleRecoupleAddSeriousFault;
}());
export { UncoupleRecoupleAddSeriousFault };
var UncoupleRecoupleAddDangerousFault = /** @class */ (function () {
    function UncoupleRecoupleAddDangerousFault() {
        this.type = UNCOUPLE_RECOUPLE_ADD_DANGEROUS_FAULT;
    }
    return UncoupleRecoupleAddDangerousFault;
}());
export { UncoupleRecoupleAddDangerousFault };
var UncoupleRecoupleRemoveFault = /** @class */ (function () {
    function UncoupleRecoupleRemoveFault() {
        this.type = UNCOUPLE_RECOUPLE_REMOVE_FAULT;
    }
    return UncoupleRecoupleRemoveFault;
}());
export { UncoupleRecoupleRemoveFault };
var AddUncoupleRecoupleComment = /** @class */ (function () {
    function AddUncoupleRecoupleComment(comment) {
        this.comment = comment;
        this.type = ADD_UNCOUPLE_RECOUPLE_COMMENT;
    }
    return AddUncoupleRecoupleComment;
}());
export { AddUncoupleRecoupleComment };
//# sourceMappingURL=uncouple-recouple.actions.js.map