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
import { PassCertificateValidationProvider, } from '../../../../providers/pass-certificate-validation/pass-certificate-validation';
import { PASS_CERTIFICATE_LENGTH, } from '../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';
import { PASS_CERTIFICATE_NUMBER_CTRL } from './pass-certificate-number.constants';
var PassCertificateNumberComponent = /** @class */ (function () {
    function PassCertificateNumberComponent(passCertficateValidationProvider) {
        var _this = this;
        this.passCertficateValidationProvider = passCertficateValidationProvider;
        this.passCertificateNumberChange = new EventEmitter();
        this.validatePassCertificate = function (c) {
            return _this.passCertficateValidationProvider.isPassCertificateValid(c.value) ? null :
                {
                    validatePassCertificate: {
                        valid: false,
                    },
                };
        };
    }
    PassCertificateNumberComponent_1 = PassCertificateNumberComponent;
    PassCertificateNumberComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [
                Validators.maxLength(PASS_CERTIFICATE_LENGTH),
                Validators.minLength(PASS_CERTIFICATE_LENGTH),
                Validators.required,
                this.validatePassCertificate
            ]);
            this.form.addControl(PassCertificateNumberComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.passCertificateNumberInput);
    };
    PassCertificateNumberComponent.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        this.passCertificateNumberChange.emit(passCertificateNumber);
    };
    PassCertificateNumberComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var PassCertificateNumberComponent_1;
    PassCertificateNumberComponent.fieldName = PASS_CERTIFICATE_NUMBER_CTRL;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PassCertificateNumberComponent.prototype, "passCertificateNumberInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], PassCertificateNumberComponent.prototype, "form", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PassCertificateNumberComponent.prototype, "passCertificateNumberChange", void 0);
    PassCertificateNumberComponent = PassCertificateNumberComponent_1 = __decorate([
        Component({
            selector: 'pass-certificate-number',
            templateUrl: 'pass-certificate-number.html',
        }),
        __metadata("design:paramtypes", [PassCertificateValidationProvider])
    ], PassCertificateNumberComponent);
    return PassCertificateNumberComponent;
}());
export { PassCertificateNumberComponent };
//# sourceMappingURL=pass-certificate-number.js.map