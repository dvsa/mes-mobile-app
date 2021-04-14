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
export var HealthDeclatationValidValues;
(function (HealthDeclatationValidValues) {
    HealthDeclatationValidValues["SIGNED"] = "Signed";
    HealthDeclatationValidValues["NOTSIGNED"] = "NotSigned";
})(HealthDeclatationValidValues || (HealthDeclatationValidValues = {}));
var HealthDeclarationSignedComponent = /** @class */ (function () {
    function HealthDeclarationSignedComponent() {
        this.healthDeclarationChange = new EventEmitter();
    }
    HealthDeclarationSignedComponent_1 = HealthDeclarationSignedComponent;
    HealthDeclarationSignedComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl(HealthDeclarationSignedComponent_1.fieldName, this.formControl);
            // set to null on form creation to allow validation to fire if no user interaction
            if (!this.healthDeclaration)
                this.healthDeclaration = null;
            return this.formControl.patchValue(this.healthDeclaration);
        }
        this.formControl.patchValue(this.healthDeclaration ? HealthDeclatationValidValues.SIGNED : HealthDeclatationValidValues.NOTSIGNED);
    };
    HealthDeclarationSignedComponent.prototype.healthDeclarationChanged = function (healthFormValue) {
        this.healthDeclarationChange.emit(healthFormValue === HealthDeclatationValidValues.SIGNED);
    };
    Object.defineProperty(HealthDeclarationSignedComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var HealthDeclarationSignedComponent_1;
    HealthDeclarationSignedComponent.fieldName = 'healthDeclarationCtrl';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], HealthDeclarationSignedComponent.prototype, "healthDeclaration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], HealthDeclarationSignedComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HealthDeclarationSignedComponent.prototype, "label", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HealthDeclarationSignedComponent.prototype, "healthDeclarationChange", void 0);
    HealthDeclarationSignedComponent = HealthDeclarationSignedComponent_1 = __decorate([
        Component({
            selector: 'health-declaration-signed',
            templateUrl: 'health-declaration-signed.html',
        })
    ], HealthDeclarationSignedComponent);
    return HealthDeclarationSignedComponent;
}());
export { HealthDeclarationSignedComponent };
//# sourceMappingURL=health-declaration-signed.js.map