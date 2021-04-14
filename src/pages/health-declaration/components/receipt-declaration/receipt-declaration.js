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
var ReceiptDeclarationComponent = /** @class */ (function () {
    function ReceiptDeclarationComponent() {
        this.receiptDeclarationChange = new EventEmitter();
    }
    ReceiptDeclarationComponent_1 = ReceiptDeclarationComponent;
    ReceiptDeclarationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.requiredTrue]);
            this.formGroup.addControl(ReceiptDeclarationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.selected);
    };
    ReceiptDeclarationComponent.prototype.receiptDeclarationChanged = function () {
        this.receiptDeclarationChange.emit();
    };
    ReceiptDeclarationComponent.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    var ReceiptDeclarationComponent_1;
    ReceiptDeclarationComponent.fieldName = 'receiptCheckbox';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReceiptDeclarationComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ReceiptDeclarationComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ReceiptDeclarationComponent.prototype, "certificateNumber", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ReceiptDeclarationComponent.prototype, "receiptDeclarationChange", void 0);
    ReceiptDeclarationComponent = ReceiptDeclarationComponent_1 = __decorate([
        Component({
            selector: 'receipt-declaration',
            templateUrl: 'receipt-declaration.html',
        })
    ], ReceiptDeclarationComponent);
    return ReceiptDeclarationComponent;
}());
export { ReceiptDeclarationComponent };
//# sourceMappingURL=receipt-declaration.js.map