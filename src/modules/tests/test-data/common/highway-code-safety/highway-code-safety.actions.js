export var TOGGLE_HIGHWAYCODE_SAFETY = '[HighwayCodeSafety] Toggle Highway code Safety';
export var HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT = '[HighwayCodeSafety] Add Driving Fault';
export var HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT = '[HighwayCodeSafety] Add Serious Fault';
export var HIGHWAY_CODE_SAFETY_REMOVE_FAULT = '[HighwayCodeSafety] Remove Fault';
export var ADD_HIGHWAY_CODE_SAFETY_COMMENT = '[HighwayCodeSafety] Add Comment';
var ToggleHighwayCodeSafety = /** @class */ (function () {
    function ToggleHighwayCodeSafety() {
        this.type = TOGGLE_HIGHWAYCODE_SAFETY;
    }
    return ToggleHighwayCodeSafety;
}());
export { ToggleHighwayCodeSafety };
var HighwayCodeSafetyAddDrivingFault = /** @class */ (function () {
    function HighwayCodeSafetyAddDrivingFault() {
        this.type = HIGHWAY_CODE_SAFETY_ADD_DRIVING_FAULT;
    }
    return HighwayCodeSafetyAddDrivingFault;
}());
export { HighwayCodeSafetyAddDrivingFault };
var HighwayCodeSafetyAddSeriousFault = /** @class */ (function () {
    function HighwayCodeSafetyAddSeriousFault() {
        this.type = HIGHWAY_CODE_SAFETY_ADD_SERIOUS_FAULT;
    }
    return HighwayCodeSafetyAddSeriousFault;
}());
export { HighwayCodeSafetyAddSeriousFault };
var HighwayCodeSafetyRemoveFault = /** @class */ (function () {
    function HighwayCodeSafetyRemoveFault() {
        this.type = HIGHWAY_CODE_SAFETY_REMOVE_FAULT;
    }
    return HighwayCodeSafetyRemoveFault;
}());
export { HighwayCodeSafetyRemoveFault };
var HighwayCodeSafetyAddComment = /** @class */ (function () {
    function HighwayCodeSafetyAddComment(comment) {
        this.comment = comment;
        this.type = ADD_HIGHWAY_CODE_SAFETY_COMMENT;
    }
    return HighwayCodeSafetyAddComment;
}());
export { HighwayCodeSafetyAddComment };
//# sourceMappingURL=highway-code-safety.actions.js.map