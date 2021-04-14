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
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
var IdentificationComponent = /** @class */ (function () {
    function IdentificationComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.identificationChange = new EventEmitter();
        this.formField = 'identification';
    }
    IdentificationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('Licence');
            this.formGroup.addControl(this.formField, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, this.formField);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(this.formField).clearValidators();
        }
        else {
            this.formGroup.get(this.formField).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.identification);
    };
    IdentificationComponent.prototype.identificationChanged = function (identification) {
        if (this.formControl.valid) {
            this.identificationChange.emit(identification);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IdentificationComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IdentificationComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IdentificationComponent.prototype, "identification", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], IdentificationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IdentificationComponent.prototype, "identificationChange", void 0);
    IdentificationComponent = __decorate([
        Component({
            selector: 'identification',
            templateUrl: 'identification.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], IdentificationComponent);
    return IdentificationComponent;
}());
export { IdentificationComponent };
//# sourceMappingURL=identification.js.map