var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { getDL196CBTCertificateNumberValidator } from '../../../../shared/constants/field-validators/field-validators';
var CBTNumberComponent = /** @class */ (function () {
    function CBTNumberComponent() {
        this.cbtNumberChange = new EventEmitter();
        this.dl196cbtCertNumberValidator = getDL196CBTCertificateNumberValidator();
    }
    CBTNumberComponent_1 = CBTNumberComponent;
    CBTNumberComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [
                Validators.maxLength(+this.dl196cbtCertNumberValidator.maxLength),
                Validators.minLength(+this.dl196cbtCertNumberValidator.maxLength),
                Validators.pattern(this.dl196cbtCertNumberValidator.pattern),
            ]);
            this.formGroup.addControl(CBTNumberComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.cbtNumber);
    };
    CBTNumberComponent.prototype.cbtNumberChanged = function (cbtNumber) {
        this.cbtNumberChange.emit(cbtNumber);
    };
    CBTNumberComponent.prototype.invalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var CBTNumberComponent_1;
    CBTNumberComponent.fieldName = 'cbtNumber';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CBTNumberComponent.prototype, "cbtNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], CBTNumberComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CBTNumberComponent.prototype, "cbtNumberChange", void 0);
    CBTNumberComponent = CBTNumberComponent_1 = __decorate([
        Component({
            selector: 'cbt-number',
            templateUrl: 'cbt-number.html',
        })
    ], CBTNumberComponent);
    return CBTNumberComponent;
}());
export { CBTNumberComponent };
//# sourceMappingURL=cbt-number.js.map