export var RECORD_MANOEUVRES_SELECTION = '[Manoeuvres] Record Manoeuvres Selection';
export var RECORD_MANOEUVRES_DESELECTION = '[Manoeuvres] Deselect Reverse Left Manoeuvre';
export var ADD_MANOEUVRE_DRIVING_FAULT = '[Manoeuvres] Add Manoeuvre Driving Fault';
export var ADD_MANOEUVRE_SERIOUS_FAULT = '[Manoeuvres] Add Manoeuvre Serious Fault';
export var ADD_MANOEUVRE_DANGEROUS_FAULT = '[Manoeuvres] Add Manoeuvre Dangerous Fault';
export var ADD_MANOEUVRE_COMMENT = '[Manoeuvres] Add Manoeuvre Comment';
export var REMOVE_MANOEUVRE_FAULT = '[Manoeuvres] Remove Manoeuvre Fault';
var RecordManoeuvresDeselection = /** @class */ (function () {
    function RecordManoeuvresDeselection(manoeuvre) {
        this.manoeuvre = manoeuvre;
        this.type = RECORD_MANOEUVRES_DESELECTION;
    }
    return RecordManoeuvresDeselection;
}());
export { RecordManoeuvresDeselection };
var RecordManoeuvresSelection = /** @class */ (function () {
    function RecordManoeuvresSelection(manoeuvre) {
        this.manoeuvre = manoeuvre;
        this.type = RECORD_MANOEUVRES_SELECTION;
    }
    return RecordManoeuvresSelection;
}());
export { RecordManoeuvresSelection };
var AddManoeuvreDrivingFault = /** @class */ (function () {
    function AddManoeuvreDrivingFault(payload) {
        this.payload = payload;
        this.type = ADD_MANOEUVRE_DRIVING_FAULT;
    }
    return AddManoeuvreDrivingFault;
}());
export { AddManoeuvreDrivingFault };
var AddManoeuvreSeriousFault = /** @class */ (function () {
    function AddManoeuvreSeriousFault(payload) {
        this.payload = payload;
        this.type = ADD_MANOEUVRE_SERIOUS_FAULT;
    }
    return AddManoeuvreSeriousFault;
}());
export { AddManoeuvreSeriousFault };
var AddManoeuvreDangerousFault = /** @class */ (function () {
    function AddManoeuvreDangerousFault(payload) {
        this.payload = payload;
        this.type = ADD_MANOEUVRE_DANGEROUS_FAULT;
    }
    return AddManoeuvreDangerousFault;
}());
export { AddManoeuvreDangerousFault };
var AddManoeuvreComment = /** @class */ (function () {
    function AddManoeuvreComment(fieldName, faultType, controlOrObservation, // 'Control' | 'Observation',
    comment) {
        this.fieldName = fieldName;
        this.faultType = faultType;
        this.controlOrObservation = controlOrObservation;
        this.comment = comment;
        this.type = ADD_MANOEUVRE_COMMENT;
    }
    return AddManoeuvreComment;
}());
export { AddManoeuvreComment };
var RemoveManoeuvreFault = /** @class */ (function () {
    function RemoveManoeuvreFault(payload) {
        this.payload = payload;
        this.type = REMOVE_MANOEUVRE_FAULT;
    }
    return RemoveManoeuvreFault;
}());
export { RemoveManoeuvreFault };
//# sourceMappingURL=manoeuvres.actions.js.map