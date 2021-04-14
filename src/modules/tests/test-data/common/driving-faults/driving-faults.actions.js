export var ADD_DRIVING_FAULT = '[Competency] Add Driving Fault';
export var REMOVE_DRIVING_FAULT = '[Competency] Remove Driving Fault';
export var THROTTLE_ADD_DRIVING_FAULT = '[Competency] Debounce Add Driving Fault';
export var ADD_DRIVING_FAULT_COMMENT = '[Office] Add driving fault comment';
var AddDrivingFault = /** @class */ (function () {
    function AddDrivingFault(payload) {
        this.payload = payload;
        this.type = ADD_DRIVING_FAULT;
    }
    return AddDrivingFault;
}());
export { AddDrivingFault };
var ThrottleAddDrivingFault = /** @class */ (function () {
    function ThrottleAddDrivingFault(payload) {
        this.payload = payload;
        this.type = THROTTLE_ADD_DRIVING_FAULT;
    }
    return ThrottleAddDrivingFault;
}());
export { ThrottleAddDrivingFault };
var RemoveDrivingFault = /** @class */ (function () {
    function RemoveDrivingFault(payload) {
        this.payload = payload;
        this.type = REMOVE_DRIVING_FAULT;
    }
    return RemoveDrivingFault;
}());
export { RemoveDrivingFault };
var AddDrivingFaultComment = /** @class */ (function () {
    function AddDrivingFaultComment(competencyName, comment) {
        this.competencyName = competencyName;
        this.comment = comment;
        this.type = ADD_DRIVING_FAULT_COMMENT;
    }
    return AddDrivingFaultComment;
}());
export { AddDrivingFaultComment };
//# sourceMappingURL=driving-faults.actions.js.map