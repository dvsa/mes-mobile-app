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
var TransferComponent = /** @class */ (function () {
    function TransferComponent() {
        this.selectedChange = new EventEmitter();
        this.staffNumberChange = new EventEmitter();
    }
    TransferComponent_1 = TransferComponent;
    TransferComponent.prototype.ngOnChanges = function () {
        if (!this.checkBoxFormControl) {
            this.checkBoxFormControl = new FormControl(null);
            this.formGroup.addControl(TransferComponent_1.checkBoxCtrl, this.checkBoxFormControl);
        }
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(TransferComponent_1.fieldName, this.formControl);
        }
        if (this.selected) {
            this.formGroup.get(TransferComponent_1.fieldName).setValidators([
                Validators.required
            ]);
        }
        else {
            this.formGroup.get(TransferComponent_1.fieldName).clearValidators();
        }
        this.checkBoxFormControl.patchValue(this.selected ? true : false);
        this.formControl.patchValue(this.staffNumber);
    };
    TransferComponent.prototype.selectedValueChanged = function (selected) {
        if (!selected) {
            this.formGroup.get(TransferComponent_1.fieldName).reset();
        }
        this.selectedChange.emit(selected);
    };
    TransferComponent.prototype.staffNumberValueChanged = function (staffNumber) {
        this.staffNumberChange.emit(parseInt(staffNumber, 10) ? parseInt(staffNumber, 10) : null);
    };
    Object.defineProperty(TransferComponent.prototype, "invalid", {
        get: function () {
            return (!this.formControl.valid || this.isStaffNumberInvalid) && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TransferComponent.prototype, "empty", {
        get: function () {
            return !this.formControl.value && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var TransferComponent_1;
    TransferComponent.checkBoxCtrl = 'transferSelected';
    TransferComponent.fieldName = 'staffNumber';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TransferComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TransferComponent.prototype, "staffNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TransferComponent.prototype, "isStaffNumberInvalid", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TransferComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TransferComponent.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TransferComponent.prototype, "staffNumberChange", void 0);
    TransferComponent = TransferComponent_1 = __decorate([
        Component({
            selector: 'transfer',
            templateUrl: 'transfer.html',
        })
    ], TransferComponent);
    return TransferComponent;
}());
export { TransferComponent };
//# sourceMappingURL=transfer.js.map