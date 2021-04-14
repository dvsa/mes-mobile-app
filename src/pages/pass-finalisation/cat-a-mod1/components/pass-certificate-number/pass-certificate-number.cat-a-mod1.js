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
import { PASS_CERTIFICATE_NUMBER_CTRL } from './pass-certificate-number.cat-a-mod1.constants';
import { PASS_CERTIFICATE_LENGTH_A_MOD1, } from '../../../../../providers/pass-certificate-validation/pass-certificate-validation.constants';
import { getByteCount, getPassCertificateAMOD1Validator, } from '../../../../../shared/constants/field-validators/field-validators';
import { toUpper } from 'lodash';
var PassCertificateNumberCatAMod1Component = /** @class */ (function () {
    function PassCertificateNumberCatAMod1Component() {
        this.passCertificateNumberChange = new EventEmitter();
        this.passCertificateAMOD1Validator = getPassCertificateAMOD1Validator();
    }
    PassCertificateNumberCatAMod1Component_1 = PassCertificateNumberCatAMod1Component;
    PassCertificateNumberCatAMod1Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [
                Validators.maxLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
                Validators.minLength(PASS_CERTIFICATE_LENGTH_A_MOD1),
                Validators.pattern(this.passCertificateAMOD1Validator.pattern),
                Validators.required,
            ]);
            this.form.addControl(PassCertificateNumberCatAMod1Component_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.passCertificateNumberInput);
    };
    PassCertificateNumberCatAMod1Component.prototype.passCertificateNumberChanged = function (passCertificateNumber) {
        var actualLength = getByteCount(passCertificateNumber);
        var permittedLength = this.passCertificateAMOD1Validator.maxByteLength;
        var validFormat = this.passCertificateAMOD1Validator.pattern.test(passCertificateNumber);
        if (actualLength > permittedLength) {
            this.formControl.setErrors({ actualLength: actualLength, permittedLength: permittedLength, value: passCertificateNumber });
        }
        else if (!validFormat) {
            this.formControl.setErrors({ invalidFormat: passCertificateNumber });
        }
        this.passCertificateNumberChange.emit(toUpper(passCertificateNumber));
    };
    PassCertificateNumberCatAMod1Component.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var PassCertificateNumberCatAMod1Component_1;
    PassCertificateNumberCatAMod1Component.fieldName = PASS_CERTIFICATE_NUMBER_CTRL;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PassCertificateNumberCatAMod1Component.prototype, "passCertificateNumberInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], PassCertificateNumberCatAMod1Component.prototype, "form", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PassCertificateNumberCatAMod1Component.prototype, "passCertificateNumberChange", void 0);
    PassCertificateNumberCatAMod1Component = PassCertificateNumberCatAMod1Component_1 = __decorate([
        Component({
            selector: 'pass-certificate-number-cat-a-mod1',
            templateUrl: 'pass-certificate-number.cat-a-mod1.html',
        })
    ], PassCertificateNumberCatAMod1Component);
    return PassCertificateNumberCatAMod1Component;
}());
export { PassCertificateNumberCatAMod1Component };
//# sourceMappingURL=pass-certificate-number.cat-a-mod1.js.map