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
import { vehicleChecksQuestionsByCategory } from '../../../../shared/helpers/vehicle-checks-questions-by-category';
var VehicleChecksCompletedResult;
(function (VehicleChecksCompletedResult) {
    VehicleChecksCompletedResult["COMPLETED"] = "Completed";
    VehicleChecksCompletedResult["NOT_COMPLETED"] = "Not completed";
})(VehicleChecksCompletedResult || (VehicleChecksCompletedResult = {}));
var VehicleChecksToggleComponent = /** @class */ (function () {
    function VehicleChecksToggleComponent() {
        this.vehicleChecksCompletedOutcomeChange = new EventEmitter();
        this.vehicleChecksDrivingFaultsNumberChange = new EventEmitter();
    }
    VehicleChecksToggleComponent.prototype.ngOnInit = function () {
        this.drivingFaultsNumberOptions = Array(vehicleChecksQuestionsByCategory(this.testCategory) + 1).fill(null).map(function (v, i) { return i; });
    };
    VehicleChecksToggleComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl('vehicleChecksToggleCtrl', this.formControl);
        }
        if (!this.drivingFaultNumberFormControl) {
            this.drivingFaultNumberFormControl = new FormControl();
            this.formGroup.addControl('vehicleChecksDrivingFaultsNumber', this.drivingFaultNumberFormControl);
        }
        this.formControl.patchValue(this.vehicleChecksCompleted);
    };
    VehicleChecksToggleComponent.prototype.vehicleChecksToggleResultChanged = function (result) {
        if (this.formControl.valid) {
            this.vehicleChecksCompletedOutcomeChange.emit(result === VehicleChecksCompletedResult.COMPLETED);
        }
    };
    VehicleChecksToggleComponent.prototype.vehicleChecksDrivingFaultsNumberChanged = function (number) {
        this.vehicleChecksDrivingFaultsNumberChange.emit(number);
    };
    Object.defineProperty(VehicleChecksToggleComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksToggleComponent.prototype, "vehicleChecksCompleted", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksToggleComponent.prototype, "testCategory", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksToggleComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksToggleComponent.prototype, "vehicleChecksCompletedOutcomeChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksToggleComponent.prototype, "vehicleChecksDrivingFaultsNumberChange", void 0);
    VehicleChecksToggleComponent = __decorate([
        Component({
            selector: 'vehicle-checks-completed',
            templateUrl: 'vehicle-checks-completed.html',
        })
    ], VehicleChecksToggleComponent);
    return VehicleChecksToggleComponent;
}());
export { VehicleChecksToggleComponent };
//# sourceMappingURL=vehicle-checks-completed.js.map