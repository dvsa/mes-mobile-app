export var PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT = '[PcvDoorExercise] Add Driving Fault';
export var PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT = '[PcvDoorExercise] Add Serious Fault';
export var PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT = '[PcvDoorExercise] Add Dangerous Fault';
export var PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT = '[PcvDoorExercise] Remove Driving Fault';
export var PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT = '[PcvDoorExercise] Remove Serious Fault';
export var PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT = '[PcvDoorExercise] Remove Dangerous Fault';
export var ADD_PCV_DOOR_EXERCISE_COMMENT = '[PcvDoorExercise] Add Comment';
var PcvDoorExerciseAddDrivingFault = /** @class */ (function () {
    function PcvDoorExerciseAddDrivingFault() {
        this.type = PCV_DOOR_EXERCISE_ADD_DRIVING_FAULT;
    }
    return PcvDoorExerciseAddDrivingFault;
}());
export { PcvDoorExerciseAddDrivingFault };
var PcvDoorExerciseAddSeriousFault = /** @class */ (function () {
    function PcvDoorExerciseAddSeriousFault() {
        this.type = PCV_DOOR_EXERCISE_ADD_SERIOUS_FAULT;
    }
    return PcvDoorExerciseAddSeriousFault;
}());
export { PcvDoorExerciseAddSeriousFault };
var PcvDoorExerciseAddDangerousFault = /** @class */ (function () {
    function PcvDoorExerciseAddDangerousFault() {
        this.type = PCV_DOOR_EXERCISE_ADD_DANGEROUS_FAULT;
    }
    return PcvDoorExerciseAddDangerousFault;
}());
export { PcvDoorExerciseAddDangerousFault };
var PcvDoorExerciseRemoveDrivingFault = /** @class */ (function () {
    function PcvDoorExerciseRemoveDrivingFault() {
        this.type = PCV_DOOR_EXERCISE_REMOVE_DRIVING_FAULT;
    }
    return PcvDoorExerciseRemoveDrivingFault;
}());
export { PcvDoorExerciseRemoveDrivingFault };
var PcvDoorExerciseRemoveSeriousFault = /** @class */ (function () {
    function PcvDoorExerciseRemoveSeriousFault() {
        this.type = PCV_DOOR_EXERCISE_REMOVE_SERIOUS_FAULT;
    }
    return PcvDoorExerciseRemoveSeriousFault;
}());
export { PcvDoorExerciseRemoveSeriousFault };
var PcvDoorExerciseRemoveDangerousFault = /** @class */ (function () {
    function PcvDoorExerciseRemoveDangerousFault() {
        this.type = PCV_DOOR_EXERCISE_REMOVE_DANGEROUS_FAULT;
    }
    return PcvDoorExerciseRemoveDangerousFault;
}());
export { PcvDoorExerciseRemoveDangerousFault };
var AddPcvDoorExerciseComment = /** @class */ (function () {
    function AddPcvDoorExerciseComment(faultType, fieldName, comment) {
        this.faultType = faultType;
        this.fieldName = fieldName;
        this.comment = comment;
        this.type = ADD_PCV_DOOR_EXERCISE_COMMENT;
    }
    return AddPcvDoorExerciseComment;
}());
export { AddPcvDoorExerciseComment };
//# sourceMappingURL=pcv-door-exercise.actions.js.map