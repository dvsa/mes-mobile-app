export var WAITING_ROOM_VIEW_DID_ENTER = '[WaitingRoomPage] Waiting Room Did Enter';
export var WAITING_ROOM_VALIDATION_ERROR = '[WaitingRoomPage] Waiting Room Validation Error';
var WaitingRoomViewDidEnter = /** @class */ (function () {
    function WaitingRoomViewDidEnter() {
        this.type = WAITING_ROOM_VIEW_DID_ENTER;
    }
    return WaitingRoomViewDidEnter;
}());
export { WaitingRoomViewDidEnter };
var WaitingRoomValidationError = /** @class */ (function () {
    function WaitingRoomValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = WAITING_ROOM_VALIDATION_ERROR;
    }
    return WaitingRoomValidationError;
}());
export { WaitingRoomValidationError };
//# sourceMappingURL=waiting-room.actions.js.map