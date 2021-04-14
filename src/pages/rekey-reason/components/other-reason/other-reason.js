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
var OtherReasonComponent = /** @class */ (function () {
    function OtherReasonComponent() {
        this.selectedChange = new EventEmitter();
        this.reasonChange = new EventEmitter();
        this.reasonDescriptionCharsRemaining = null;
    }
    OtherReasonComponent_1 = OtherReasonComponent;
    OtherReasonComponent.prototype.ngOnChanges = function () {
        if (!this.checkBoxFormControl) {
            this.checkBoxFormControl = new FormControl(null);
            this.formGroup.addControl(OtherReasonComponent_1.checkBoxCtrl, this.checkBoxFormControl);
        }
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(OtherReasonComponent_1.fieldName, this.formControl);
        }
        if (this.selected) {
            this.formGroup.get(OtherReasonComponent_1.fieldName).setValidators([
                Validators.required, Validators.maxLength(200)
            ]);
        }
        else {
            this.formGroup.get(OtherReasonComponent_1.fieldName).clearValidators();
        }
        this.checkBoxFormControl.patchValue(this.selected ? true : false);
        this.formControl.patchValue(this.reason);
    };
    OtherReasonComponent.prototype.selectedValueChanged = function (selected) {
        if (!selected) {
            this.formGroup.get(OtherReasonComponent_1.fieldName).reset();
        }
        this.selectedChange.emit(selected);
    };
    OtherReasonComponent.prototype.reasonTextChanged = function (reason) {
        this.reasonChange.emit(reason);
    };
    OtherReasonComponent.prototype.characterCountChanged = function (charactersRemaining) {
        this.reasonDescriptionCharsRemaining = charactersRemaining;
    };
    OtherReasonComponent.prototype.getCharacterCountText = function () {
        var characterString = Math.abs(this.reasonDescriptionCharsRemaining) === 1 ? 'character' : 'characters';
        var endString = this.reasonDescriptionCharsRemaining < 0 ? 'too many' : 'remaining';
        return "You have " + Math.abs(this.reasonDescriptionCharsRemaining) + " " + characterString + " " + endString;
    };
    OtherReasonComponent.prototype.charactersExceeded = function () {
        return this.reasonDescriptionCharsRemaining < 0;
    };
    Object.defineProperty(OtherReasonComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var OtherReasonComponent_1;
    OtherReasonComponent.checkBoxCtrl = 'otherSelected';
    OtherReasonComponent.fieldName = 'reason';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OtherReasonComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], OtherReasonComponent.prototype, "reason", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], OtherReasonComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OtherReasonComponent.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OtherReasonComponent.prototype, "reasonChange", void 0);
    OtherReasonComponent = OtherReasonComponent_1 = __decorate([
        Component({
            selector: 'other-reason',
            templateUrl: 'other-reason.html',
        })
    ], OtherReasonComponent);
    return OtherReasonComponent;
}());
export { OtherReasonComponent };
//# sourceMappingURL=other-reason.js.map