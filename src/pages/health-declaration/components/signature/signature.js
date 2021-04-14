var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignatureAreaComponent } from '../../../../components/common/signature-area/signature-area';
var SignatureComponent = /** @class */ (function () {
    function SignatureComponent() {
    }
    SignatureComponent_1 = SignatureComponent;
    SignatureComponent.prototype.ngOnInit = function () {
        this.signatureArea.drawCompleteAction = this.drawCompleteAction;
        this.signatureArea.clearAction = this.clearAction;
    };
    SignatureComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl(SignatureComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.signature);
    };
    SignatureComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var SignatureComponent_1;
    SignatureComponent.fieldName = 'signature';
    __decorate([
        ViewChild(SignatureAreaComponent),
        __metadata("design:type", SignatureAreaComponent)
    ], SignatureComponent.prototype, "signatureArea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureComponent.prototype, "signature", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], SignatureComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureComponent.prototype, "drawCompleteAction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SignatureComponent.prototype, "clearAction", void 0);
    SignatureComponent = SignatureComponent_1 = __decorate([
        Component({
            selector: 'signature',
            templateUrl: 'signature.html',
        })
    ], SignatureComponent);
    return SignatureComponent;
}());
export { SignatureComponent };
//# sourceMappingURL=signature.js.map