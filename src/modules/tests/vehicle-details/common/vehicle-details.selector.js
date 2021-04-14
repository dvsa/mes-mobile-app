export var getRegistrationNumber = function (vehicleDetails) { return vehicleDetails.registrationNumber; };
export var getGearboxCategory = function (vehicleDetails) { return vehicleDetails.gearboxCategory; };
export var isManual = function (vehicleDetails) { return vehicleDetails.gearboxCategory === 'Manual' || false; };
export var isAutomatic = function (vehicleDetails) { return vehicleDetails.gearboxCategory === 'Automatic' || false; };
//# sourceMappingURL=vehicle-details.selector.js.map