export var drivingTypeDescription;
(function (drivingTypeDescription) {
    drivingTypeDescription["RIDING"] = "riding";
    drivingTypeDescription["DRIVING"] = "driving";
})(drivingTypeDescription || (drivingTypeDescription = {}));
export var getDrivingOrRidingLabel = function (cat) {
    // switch to determine driving or riding based upon category
    if (cat && cat.includes('EUA')) {
        return drivingTypeDescription.RIDING;
    }
    return drivingTypeDescription.DRIVING;
};
//# sourceMappingURL=driver-type.js.map