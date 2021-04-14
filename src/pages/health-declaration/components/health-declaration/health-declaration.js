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
import { FormGroup, FormControl } from '@angular/forms';
var HealthDeclarationComponent = /** @class */ (function () {
    function HealthDeclarationComponent() {
        this.healthDeclarationChange = new EventEmitter();
    }
    HealthDeclarationComponent_1 = HealthDeclarationComponent;
    HealthDeclarationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', []),
                this.formGroup.addControl(HealthDeclarationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.selected);
    };
    HealthDeclarationComponent.prototype.healthDeclarationChanged = function () {
        this.healthDeclarationChange.emit();
    };
    HealthDeclarationComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var HealthDeclarationComponent_1;
    HealthDeclarationComponent.fieldName = 'healthCheckbox';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], HealthDeclarationComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], HealthDeclarationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], HealthDeclarationComponent.prototype, "healthDeclarationChange", void 0);
    HealthDeclarationComponent = HealthDeclarationComponent_1 = __decorate([
        Component({
            selector: 'health-declaration',
            templateUrl: 'health-declaration.html',
        })
    ], HealthDeclarationComponent);
    return HealthDeclarationComponent;
}());
export { HealthDeclarationComponent };
//# sourceMappingURL=health-declaration.js.map