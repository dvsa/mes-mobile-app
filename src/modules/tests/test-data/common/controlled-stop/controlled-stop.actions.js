export var TOGGLE_CONTROLLED_STOP = '[ControlledStop] Toggle Controlled Stop';
export var CONTROLLED_STOP_ADD_DRIVING_FAULT = '[ControlledStop] Add Driving Fault';
export var CONTROLLED_STOP_ADD_SERIOUS_FAULT = '[ControlledStop] Add Serious Fault';
export var CONTROLLED_STOP_ADD_DANGEROUS_FAULT = '[ControlledStop] Add Dangerous Fault';
export var CONTROLLED_STOP_REMOVE_FAULT = '[ControlledStop] Remove Fault';
export var ADD_CONTROLLED_STOP_COMMENT = '[ControlledStop] Add Comment';
var ToggleControlledStop = /** @class */ (function () {
    function ToggleControlledStop() {
        this.type = TOGGLE_CONTROLLED_STOP;
    }
    return ToggleControlledStop;
}());
export { ToggleControlledStop };
var ControlledStopAddDrivingFault = /** @class */ (function () {
    function ControlledStopAddDrivingFault() {
        this.type = CONTROLLED_STOP_ADD_DRIVING_FAULT;
    }
    return ControlledStopAddDrivingFault;
}());
export { ControlledStopAddDrivingFault };
var ControlledStopAddSeriousFault = /** @class */ (function () {
    function ControlledStopAddSeriousFault() {
        this.type = CONTROLLED_STOP_ADD_SERIOUS_FAULT;
    }
    return ControlledStopAddSeriousFault;
}());
export { ControlledStopAddSeriousFault };
var ControlledStopAddDangerousFault = /** @class */ (function () {
    function ControlledStopAddDangerousFault() {
        this.type = CONTROLLED_STOP_ADD_DANGEROUS_FAULT;
    }
    return ControlledStopAddDangerousFault;
}());
export { ControlledStopAddDangerousFault };
var ControlledStopRemoveFault = /** @class */ (function () {
    function ControlledStopRemoveFault() {
        this.type = CONTROLLED_STOP_REMOVE_FAULT;
    }
    return ControlledStopRemoveFault;
}());
export { ControlledStopRemoveFault };
var AddControlledStopComment = /** @class */ (function () {
    function AddControlledStopComment(comment) {
        this.comment = comment;
        this.type = ADD_CONTROLLED_STOP_COMMENT;
    }
    return AddControlledStopComment;
}());
export { AddControlledStopComment };
//# sourceMappingURL=controlled-stop.actions.js.map