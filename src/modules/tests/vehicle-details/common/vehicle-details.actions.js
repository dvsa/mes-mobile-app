export var VEHICLE_REGISTRATION_CHANGED = '[Vehicle Details] Registration changed';
export var SCHOOL_CAR_TOGGLED = '[Vehicle Details] School car toggled';
export var SCHOOL_BIKE_TOGGLED = '[Vehicle Details] School bike toggled';
export var DUAL_CONTROLS_TOGGLED = '[Vehicle Details] Dual controls toggled';
export var GEARBOX_CATEGORY_CHANGED = '[Vehicle Details] Gearbox category changed';
export var CLEAR_GEARBOX_CATEGORY = '[Vehicle Details] Clear gearbox category';
export var POPULATE_VEHICLE_DIMENSIONS = '[Vehicle Details] Populate Vehicle Dimensions';
export var POPULATE_VEHICLE_CONFIGURATION = '[Vehicle Details] Populate Vehicle Configuration';
var VehicleRegistrationChanged = /** @class */ (function () {
    function VehicleRegistrationChanged(vehicleRegistration) {
        this.vehicleRegistration = vehicleRegistration;
        this.type = VEHICLE_REGISTRATION_CHANGED;
    }
    return VehicleRegistrationChanged;
}());
export { VehicleRegistrationChanged };
var SchoolCarToggled = /** @class */ (function () {
    function SchoolCarToggled() {
        this.type = SCHOOL_CAR_TOGGLED;
    }
    return SchoolCarToggled;
}());
export { SchoolCarToggled };
var SchoolBikeToggled = /** @class */ (function () {
    function SchoolBikeToggled() {
        this.type = SCHOOL_BIKE_TOGGLED;
    }
    return SchoolBikeToggled;
}());
export { SchoolBikeToggled };
var DualControlsToggled = /** @class */ (function () {
    function DualControlsToggled() {
        this.type = DUAL_CONTROLS_TOGGLED;
    }
    return DualControlsToggled;
}());
export { DualControlsToggled };
var GearboxCategoryChanged = /** @class */ (function () {
    function GearboxCategoryChanged(gearboxCategory) {
        this.gearboxCategory = gearboxCategory;
        this.type = GEARBOX_CATEGORY_CHANGED;
    }
    return GearboxCategoryChanged;
}());
export { GearboxCategoryChanged };
var ClearGearboxCategory = /** @class */ (function () {
    function ClearGearboxCategory() {
        this.type = CLEAR_GEARBOX_CATEGORY;
    }
    return ClearGearboxCategory;
}());
export { ClearGearboxCategory };
var PopulateVehicleDimensions = /** @class */ (function () {
    function PopulateVehicleDimensions(vehicleWidth, vehicleLength) {
        this.vehicleWidth = vehicleWidth;
        this.vehicleLength = vehicleLength;
        this.type = POPULATE_VEHICLE_DIMENSIONS;
    }
    return PopulateVehicleDimensions;
}());
export { PopulateVehicleDimensions };
var PopulateVehicleConfiguration = /** @class */ (function () {
    function PopulateVehicleConfiguration(configuration) {
        this.configuration = configuration;
        this.type = POPULATE_VEHICLE_CONFIGURATION;
    }
    return PopulateVehicleConfiguration;
}());
export { PopulateVehicleConfiguration };
//# sourceMappingURL=vehicle-details.actions.js.map