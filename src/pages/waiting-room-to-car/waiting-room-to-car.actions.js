export var WAITING_ROOM_TO_CAR_VIEW_DID_ENTER = '[WaitingRoomToCarPage] Waiting Room To Car Did Enter';
export var WAITING_ROOM_TO_CAR_ERROR = '[WaitingRoomToCarPage] Waiting Room To Car Error';
export var WAITING_ROOM_TO_CAR_VALIDATION_ERROR = '[WaitingRoomToCarPage] Waiting Room To Car Validation Error';
export var WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL = '[WaitingRoomToCarPage] Waiting Room To Car View Bike Category Modal';
export var WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED = '[WaitingRoomToCarPage] Waiting Room To Car Bike Category Selected';
export var WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED = '[WaitingRoomToCarPage] Waiting Room To Car Bike Category Changed';
var WaitingRoomToCarViewDidEnter = /** @class */ (function () {
    function WaitingRoomToCarViewDidEnter() {
        this.type = WAITING_ROOM_TO_CAR_VIEW_DID_ENTER;
    }
    return WaitingRoomToCarViewDidEnter;
}());
export { WaitingRoomToCarViewDidEnter };
var WaitingRoomToCarError = /** @class */ (function () {
    function WaitingRoomToCarError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = WAITING_ROOM_TO_CAR_ERROR;
    }
    return WaitingRoomToCarError;
}());
export { WaitingRoomToCarError };
var WaitingRoomToCarValidationError = /** @class */ (function () {
    function WaitingRoomToCarValidationError(errorMessage) {
        this.errorMessage = errorMessage;
        this.type = WAITING_ROOM_TO_CAR_VALIDATION_ERROR;
    }
    return WaitingRoomToCarValidationError;
}());
export { WaitingRoomToCarValidationError };
var WaitingRoomToCarViewBikeCategoryModal = /** @class */ (function () {
    function WaitingRoomToCarViewBikeCategoryModal() {
        this.type = WAITING_ROOM_TO_CAR_VIEW_BIKE_CATEGORY_MODAL;
    }
    return WaitingRoomToCarViewBikeCategoryModal;
}());
export { WaitingRoomToCarViewBikeCategoryModal };
var WaitingRoomToCarBikeCategorySelected = /** @class */ (function () {
    function WaitingRoomToCarBikeCategorySelected(bikeCategory) {
        this.bikeCategory = bikeCategory;
        this.type = WAITING_ROOM_TO_CAR_BIKE_CATEGORY_SELECTED;
    }
    return WaitingRoomToCarBikeCategorySelected;
}());
export { WaitingRoomToCarBikeCategorySelected };
var WaitingRoomToCarBikeCategoryChanged = /** @class */ (function () {
    function WaitingRoomToCarBikeCategoryChanged(initialBikeCategory, selectedBikeCategory) {
        this.initialBikeCategory = initialBikeCategory;
        this.selectedBikeCategory = selectedBikeCategory;
        this.type = WAITING_ROOM_TO_CAR_BIKE_CATEGORY_CHANGED;
    }
    return WaitingRoomToCarBikeCategoryChanged;
}());
export { WaitingRoomToCarBikeCategoryChanged };
//# sourceMappingURL=waiting-room-to-car.actions.js.map