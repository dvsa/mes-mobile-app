var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { get } from 'lodash';
var VehicleDetailsCatADIPt2Component = /** @class */ (function () {
    function VehicleDetailsCatADIPt2Component() {
    }
    VehicleDetailsCatADIPt2Component.prototype.getTransmission = function () {
        return get(this.data, 'gearboxCategory');
    };
    VehicleDetailsCatADIPt2Component.prototype.getRegistrationNumber = function () {
        return get(this.data, 'registrationNumber');
    };
    VehicleDetailsCatADIPt2Component.prototype.getTrainerPRN = function () {
        return get(this.trainerData, 'trainerRegistrationNumber', null);
    };
    VehicleDetailsCatADIPt2Component.prototype.getOrdit = function () {
        return get(this.trainerData, 'orditTrainedCandidate', false) ? 'Yes' : 'No';
    };
    VehicleDetailsCatADIPt2Component.prototype.getTrainingRecords = function () {
        return get(this.trainerData, 'trainingRecords', false) ? 'Yes' : 'No';
    };
    VehicleDetailsCatADIPt2Component.prototype.displayVehicleDetails = function () {
        return get(this.data, 'schoolCar', false) || get(this.data, 'dualControls', false);
    };
    VehicleDetailsCatADIPt2Component.prototype.getVehicleDetails = function () {
        return get(this.data, 'schoolCar') ? 'School Car' : 'Dual Controls';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleDetailsCatADIPt2Component.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleDetailsCatADIPt2Component.prototype, "trainerData", void 0);
    VehicleDetailsCatADIPt2Component = __decorate([
        Component({
            selector: 'vehicle-details-cat-adi-pt2',
            templateUrl: 'vehicle-details.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleDetailsCatADIPt2Component);
    return VehicleDetailsCatADIPt2Component;
}());
export { VehicleDetailsCatADIPt2Component };
//# sourceMappingURL=vehicle-details.js.map