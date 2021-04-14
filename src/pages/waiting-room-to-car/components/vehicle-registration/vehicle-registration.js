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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isEmpty } from 'lodash';
import { getRegistrationNumberValidator, nonAlphaNumericValues, } from '../../../../shared/constants/field-validators/field-validators';
var VehicleRegistrationComponent = /** @class */ (function () {
    function VehicleRegistrationComponent() {
        this.vehicleRegistrationChange = new EventEmitter();
        this.registrationNumberValidator = getRegistrationNumberValidator();
    }
    VehicleRegistrationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl('vehicleRegistration', this.formControl);
        }
        this.formControl.patchValue(this.vehicleRegistration);
    };
    VehicleRegistrationComponent.prototype.vehicleRegistrationChanged = function (event) {
        if (!this.registrationNumberValidator.pattern.test(event.target.value)) {
            event.target.value = event.target.value.replace(nonAlphaNumericValues, '');
            if (isEmpty(event.target.value)) {
                this.formControl.setErrors({ invalidValue: event.target.value });
            }
        }
        this.vehicleRegistrationChange.emit(event.target.value.toUpperCase());
    };
    Object.defineProperty(VehicleRegistrationComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleRegistrationComponent.prototype, "vehicleRegistration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleRegistrationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleRegistrationComponent.prototype, "vehicleRegistrationChange", void 0);
    VehicleRegistrationComponent = __decorate([
        Component({
            selector: 'vehicle-registration',
            templateUrl: 'vehicle-registration.html',
        })
    ], VehicleRegistrationComponent);
    return VehicleRegistrationComponent;
}());
export { VehicleRegistrationComponent };
//# sourceMappingURL=vehicle-registration.js.map