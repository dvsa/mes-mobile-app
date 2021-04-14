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
var ResidencyDeclarationComponent = /** @class */ (function () {
    function ResidencyDeclarationComponent() {
        this.residencyDeclarationChange = new EventEmitter();
    }
    ResidencyDeclarationComponent_1 = ResidencyDeclarationComponent;
    ResidencyDeclarationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.requiredTrue]);
            this.formGroup.addControl(ResidencyDeclarationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.selected);
    };
    ResidencyDeclarationComponent.prototype.residencyDeclarationChanged = function () {
        this.residencyDeclarationChange.emit();
    };
    ResidencyDeclarationComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var ResidencyDeclarationComponent_1;
    ResidencyDeclarationComponent.fieldName = 'residencyCheckbox';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ResidencyDeclarationComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ResidencyDeclarationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ResidencyDeclarationComponent.prototype, "residencyDeclarationChange", void 0);
    ResidencyDeclarationComponent = ResidencyDeclarationComponent_1 = __decorate([
        Component({
            selector: 'residency-declaration',
            templateUrl: 'residency-declaration.html',
        })
    ], ResidencyDeclarationComponent);
    return ResidencyDeclarationComponent;
}());
export { ResidencyDeclarationComponent };
//# sourceMappingURL=residency-declaration.js.map