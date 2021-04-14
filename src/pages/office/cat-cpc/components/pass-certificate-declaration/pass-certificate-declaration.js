var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var PassCertificateDeclarationComponent = /** @class */ (function () {
    function PassCertificateDeclarationComponent() {
        this.passCertificateDeclarationChange = new EventEmitter();
    }
    PassCertificateDeclarationComponent_1 = PassCertificateDeclarationComponent;
    PassCertificateDeclarationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl(PassCertificateDeclarationComponent_1.fieldName, this.formControl);
            // set to null on form creation to allow validation to fire if no user interaction
            if (!this.passCertificateNumberReceived)
                this.passCertificateNumberReceived = null;
        }
        this.formControl.patchValue(this.passCertificateNumberReceived);
    };
    PassCertificateDeclarationComponent.prototype.passCertificateDeclarationChanged = function (passCertificate) {
        this.passCertificateDeclarationChange.emit(passCertificate);
    };
    Object.defineProperty(PassCertificateDeclarationComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var PassCertificateDeclarationComponent_1;
    PassCertificateDeclarationComponent.fieldName = 'passCertificateDeclarationCtrl';
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], PassCertificateDeclarationComponent.prototype, "passCertificateDeclarationChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], PassCertificateDeclarationComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PassCertificateDeclarationComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PassCertificateDeclarationComponent.prototype, "passCertificateNumberReceived", void 0);
    PassCertificateDeclarationComponent = PassCertificateDeclarationComponent_1 = __decorate([
        Component({
            selector: 'pass-certificate-declaration',
            templateUrl: 'pass-certificate-declaration.html',
        })
    ], PassCertificateDeclarationComponent);
    return PassCertificateDeclarationComponent;
}());
export { PassCertificateDeclarationComponent };
//# sourceMappingURL=pass-certificate-declaration.js.map