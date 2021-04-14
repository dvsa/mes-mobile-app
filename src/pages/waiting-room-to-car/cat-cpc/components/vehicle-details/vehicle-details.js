var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var VehicleDetailsCatCPCComponent = /** @class */ (function () {
    function VehicleDetailsCatCPCComponent() {
        this.vehicleDetailsChange = new EventEmitter();
    }
    VehicleDetailsCatCPCComponent_1 = VehicleDetailsCatCPCComponent;
    VehicleDetailsCatCPCComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl(VehicleDetailsCatCPCComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.configuration);
    };
    VehicleDetailsCatCPCComponent.prototype.vehicleDetailsChanged = function (configuration) {
        this.vehicleDetailsChange.emit(configuration);
    };
    Object.defineProperty(VehicleDetailsCatCPCComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var VehicleDetailsCatCPCComponent_1;
    VehicleDetailsCatCPCComponent.fieldName = 'configuration';
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleDetailsCatCPCComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleDetailsCatCPCComponent.prototype, "configuration", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleDetailsCatCPCComponent.prototype, "vehicleDetailsChange", void 0);
    VehicleDetailsCatCPCComponent = VehicleDetailsCatCPCComponent_1 = __decorate([
        Component({
            selector: 'vehicle-details-cat-cpc',
            templateUrl: 'vehicle-details.html',
        })
    ], VehicleDetailsCatCPCComponent);
    return VehicleDetailsCatCPCComponent;
}());
export { VehicleDetailsCatCPCComponent };
//# sourceMappingURL=vehicle-details.js.map