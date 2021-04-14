export var ADD_AVOIDANCE_SERIOUS_FAULT = '[SpeedCheck] [CatAMod1] Add Avoidance Speed Req Serious Fault';
export var REMOVE_AVOIDANCE_SERIOUS_FAULT = '[SpeedCheck] [CatAMod1] Remove Avoidance Speed Req Serious Fault';
export var RECORD_AVOIDANCE_FIRST_ATTEMPT = '[SpeedCheck] [CatAMod1] Record Avoidance First Attempt';
export var RECORD_AVOIDANCE_SECOND_ATTEMPT = '[SpeedCheck] [CatAMod1] Record Avoidace Second Attempt';
export var ADD_AVOIDANCE_SPEED_REQUIREMENT_COMMENT = '[SpeedCheck] [CatAMod1] Add Avoidance Comment';
var AddAvoidanceSeriousFault = /** @class */ (function () {
    function AddAvoidanceSeriousFault() {
        this.type = ADD_AVOIDANCE_SERIOUS_FAULT;
    }
    return AddAvoidanceSeriousFault;
}());
export { AddAvoidanceSeriousFault };
var RemoveAvoidanceSeriousFault = /** @class */ (function () {
    function RemoveAvoidanceSeriousFault() {
        this.type = REMOVE_AVOIDANCE_SERIOUS_FAULT;
    }
    return RemoveAvoidanceSeriousFault;
}());
export { RemoveAvoidanceSeriousFault };
var RecordAvoidanceFirstAttempt = /** @class */ (function () {
    function RecordAvoidanceFirstAttempt(attemptedSpeed) {
        this.attemptedSpeed = attemptedSpeed;
        this.type = RECORD_AVOIDANCE_FIRST_ATTEMPT;
    }
    return RecordAvoidanceFirstAttempt;
}());
export { RecordAvoidanceFirstAttempt };
var RecordAvoidanceSecondAttempt = /** @class */ (function () {
    function RecordAvoidanceSecondAttempt(attemptedSpeed) {
        this.attemptedSpeed = attemptedSpeed;
        this.type = RECORD_AVOIDANCE_SECOND_ATTEMPT;
    }
    return RecordAvoidanceSecondAttempt;
}());
export { RecordAvoidanceSecondAttempt };
var AddAvoidanceComment = /** @class */ (function () {
    function AddAvoidanceComment(comment) {
        this.comment = comment;
        this.type = ADD_AVOIDANCE_SPEED_REQUIREMENT_COMMENT;
    }
    return AddAvoidanceComment;
}());
export { AddAvoidanceComment };
//# sourceMappingURL=avoidance.actions.js.map