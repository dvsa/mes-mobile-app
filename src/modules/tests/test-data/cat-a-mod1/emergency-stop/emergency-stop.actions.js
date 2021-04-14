export var ADD_EMERGENCY_STOP_SERIOUS_FAULT = '[SpeedCheck] [CatAMod1] Add Emergency Stop Speed Req Serious Fault';
export var REMOVE_EMERGENCY_STOP_SERIOUS_FAULT = '[SpeedCheck] [CatAMod1] Remove Emergency Stop Speed Req Serious Fault';
export var RECORD_EMERGENCY_STOP_FIRST_ATTEMPT = '[SpeedCheck] [CatAMod1] Record Emergency Stop First Attempt';
export var RECORD_EMERGENCY_STOP_SECOND_ATTEMPT = '[SpeedCheck] [CatAMod1] Record Emergency Stop Second Attempt';
export var ADD_EMERGENCY_STOP_COMMENT = '[SpeedCheck] [CatAMod1] Add Emergency Stop Comment';
var AddEmergencyStopSeriousFault = /** @class */ (function () {
    function AddEmergencyStopSeriousFault() {
        this.type = ADD_EMERGENCY_STOP_SERIOUS_FAULT;
    }
    return AddEmergencyStopSeriousFault;
}());
export { AddEmergencyStopSeriousFault };
var RemoveEmergencyStopSeriousFault = /** @class */ (function () {
    function RemoveEmergencyStopSeriousFault() {
        this.type = REMOVE_EMERGENCY_STOP_SERIOUS_FAULT;
    }
    return RemoveEmergencyStopSeriousFault;
}());
export { RemoveEmergencyStopSeriousFault };
var RecordEmergencyStopFirstAttempt = /** @class */ (function () {
    function RecordEmergencyStopFirstAttempt(attemptedSpeed) {
        this.attemptedSpeed = attemptedSpeed;
        this.type = RECORD_EMERGENCY_STOP_FIRST_ATTEMPT;
    }
    return RecordEmergencyStopFirstAttempt;
}());
export { RecordEmergencyStopFirstAttempt };
var RecordEmergencyStopSecondAttempt = /** @class */ (function () {
    function RecordEmergencyStopSecondAttempt(attemptedSpeed) {
        this.attemptedSpeed = attemptedSpeed;
        this.type = RECORD_EMERGENCY_STOP_SECOND_ATTEMPT;
    }
    return RecordEmergencyStopSecondAttempt;
}());
export { RecordEmergencyStopSecondAttempt };
var AddAnEmergencyStopComment = /** @class */ (function () {
    function AddAnEmergencyStopComment(comment) {
        this.comment = comment;
        this.type = ADD_EMERGENCY_STOP_COMMENT;
    }
    return AddAnEmergencyStopComment;
}());
export { AddAnEmergencyStopComment };
//# sourceMappingURL=emergency-stop.actions.js.map