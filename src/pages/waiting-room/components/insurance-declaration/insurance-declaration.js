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
var InsuranceDeclarationComponent = /** @class */ (function () {
    function InsuranceDeclarationComponent() {
        this.insuranceDeclarationChange = new EventEmitter();
    }
    InsuranceDeclarationComponent_1 = InsuranceDeclarationComponent;
    InsuranceDeclarationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.requiredTrue]);
            this.formGroup.addControl(InsuranceDeclarationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.selected);
    };
    InsuranceDeclarationComponent.prototype.insuranceDeclarationChanged = function () {
        this.insuranceDeclarationChange.emit();
    };
    InsuranceDeclarationComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var InsuranceDeclarationComponent_1;
    InsuranceDeclarationComponent.fieldName = 'insuranceCheckbox';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], InsuranceDeclarationComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], InsuranceDeclarationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InsuranceDeclarationComponent.prototype, "insuranceDeclarationChange", void 0);
    InsuranceDeclarationComponent = InsuranceDeclarationComponent_1 = __decorate([
        Component({
            selector: 'insurance-declaration',
            templateUrl: 'insurance-declaration.html',
        })
    ], InsuranceDeclarationComponent);
    return InsuranceDeclarationComponent;
}());
export { InsuranceDeclarationComponent };
//# sourceMappingURL=insurance-declaration.js.map