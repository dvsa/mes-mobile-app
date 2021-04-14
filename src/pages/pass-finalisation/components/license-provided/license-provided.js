var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, } from '@angular/core';
import { FormGroup, FormControl, Validators, } from '@angular/forms';
var ValidLicenceProvidedValues;
(function (ValidLicenceProvidedValues) {
    ValidLicenceProvidedValues["YES"] = "yes";
    ValidLicenceProvidedValues["NO"] = "no";
})(ValidLicenceProvidedValues || (ValidLicenceProvidedValues = {}));
var LicenseProvidedComponent = /** @class */ (function () {
    function LicenseProvidedComponent() {
        this.licenseReceived = new EventEmitter();
        this.licenseNotReceived = new EventEmitter();
    }
    LicenseProvidedComponent_1 = LicenseProvidedComponent;
    LicenseProvidedComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.form.addControl(LicenseProvidedComponent_1.fieldName, this.formControl);
        }
        if (this.license !== null) {
            this.formControl.patchValue(this.license ? ValidLicenceProvidedValues.YES : ValidLicenceProvidedValues.NO);
        }
        else {
            this.formControl.patchValue(null);
        }
    };
    LicenseProvidedComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    LicenseProvidedComponent.prototype.provisionalLicenseReceived = function () {
        this.licenseReceived.emit();
    };
    LicenseProvidedComponent.prototype.provisionalLicenseNotReceived = function () {
        this.licenseNotReceived.emit();
    };
    var LicenseProvidedComponent_1;
    LicenseProvidedComponent.fieldName = 'provisionalLicenseProvidedCtrl';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LicenseProvidedComponent.prototype, "license", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LicenseProvidedComponent.prototype, "licenseReceived", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LicenseProvidedComponent.prototype, "licenseReceivedLabel", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LicenseProvidedComponent.prototype, "licenseNotReceived", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], LicenseProvidedComponent.prototype, "form", void 0);
    LicenseProvidedComponent = LicenseProvidedComponent_1 = __decorate([
        Component({
            selector: 'license-provided',
            templateUrl: 'license-provided.html',
        })
    ], LicenseProvidedComponent);
    return LicenseProvidedComponent;
}());
export { LicenseProvidedComponent };
//# sourceMappingURL=license-provided.js.map