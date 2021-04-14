export var RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] [Cat ADI2] Record Manoeuvres Selection';
export var RECORD_MANOEUVRES_DESELECTION = '[Manoeuvres] [Cat ADI2] Record Manoeuvre Deselection';
export var ADD_MANOEUVRE_DRIVING_FAULT = '[Manoeuvres] [Cat ADI2] Add Manoeuvre Driving Fault';
export var ADD_MANOEUVRE_SERIOUS_FAULT = '[Manoeuvres] [Cat ADI2] Add Manoeuvre Serious Fault';
export var ADD_MANOEUVRE_DANGEROUS_FAULT = '[Manoeuvres] [Cat ADI2] Add Manoeuvre Dangerous Fault';
export var ADD_MANOEUVRE_COMMENT = '[Manoeuvres] [Cat ADI2] Add Manoeuvre Comment';
export var REMOVE_MANOEUVRE_FAULT = '[Manoeuvres] [Cat ADI2] Remove Manoeuvre Fault';
var RecordManoeuvresDeselection = /** @class */ (function () {
    function RecordManoeuvresDeselection(manoeuvre, index) {
        this.manoeuvre = manoeuvre;
        this.index = index;
        this.type = RECORD_MANOEUVRES_DESELECTION;
    }
    return RecordManoeuvresDeselection;
}());
export { RecordManoeuvresDeselection };
var RecordManoeuvresSelection = /** @class */ (function () {
    function RecordManoeuvresSelection(manoeuvre, index) {
        this.manoeuvre = manoeuvre;
        this.index = index;
        this.type = RECORD_MANOEUVRES_SELECTION;
    }
    return RecordManoeuvresSelection;
}());
export { RecordManoeuvresSelection };
var AddManoeuvreDrivingFault = /** @class */ (function () {
    function AddManoeuvreDrivingFault(payload, index) {
        this.payload = payload;
        this.index = index;
        this.type = ADD_MANOEUVRE_DRIVING_FAULT;
    }
    return AddManoeuvreDrivingFault;
}());
export { AddManoeuvreDrivingFault };
var AddManoeuvreSeriousFault = /** @class */ (function () {
    function AddManoeuvreSeriousFault(payload, index) {
        this.payload = payload;
        this.index = index;
        this.type = ADD_MANOEUVRE_SERIOUS_FAULT;
    }
    return AddManoeuvreSeriousFault;
}());
export { AddManoeuvreSeriousFault };
var AddManoeuvreDangerousFault = /** @class */ (function () {
    function AddManoeuvreDangerousFault(payload, index) {
        this.payload = payload;
        this.index = index;
        this.type = ADD_MANOEUVRE_DANGEROUS_FAULT;
    }
    return AddManoeuvreDangerousFault;
}());
export { AddManoeuvreDangerousFault };
var AddManoeuvreComment = /** @class */ (function () {
    function AddManoeuvreComment(fieldName, faultType, controlOrObservation, // 'Control' | 'Observation',
    comment, index) {
        this.fieldName = fieldName;
        this.faultType = faultType;
        this.controlOrObservation = controlOrObservation;
        this.comment = comment;
        this.index = index;
        this.type = ADD_MANOEUVRE_COMMENT;
    }
    return AddManoeuvreComment;
}());
export { AddManoeuvreComment };
var RemoveManoeuvreFault = /** @class */ (function () {
    function RemoveManoeuvreFault(payload, index) {
        this.payload = payload;
        this.index = index;
        this.type = REMOVE_MANOEUVRE_FAULT;
    }
    return RemoveManoeuvreFault;
}());
export { RemoveManoeuvreFault };
//# sourceMappingURL=manoeuvres.actions.js.map