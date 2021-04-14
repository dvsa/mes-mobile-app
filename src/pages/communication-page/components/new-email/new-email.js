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
var NewEmailComponent = /** @class */ (function () {
    function NewEmailComponent() {
        this.newEmailRadioSelect = new EventEmitter();
        this.newEmailTextChange = new EventEmitter();
    }
    NewEmailComponent_1 = NewEmailComponent;
    NewEmailComponent.prototype.ngOnChanges = function () {
        if (!this.radioButtonControl) {
            this.radioButtonControl = new FormControl('', Validators.required);
            this.formGroup.addControl(NewEmailComponent_1.radioCtrl, this.radioButtonControl);
        }
        if (!this.formControl) {
            this.formControl = new FormControl('');
            if (this.isNewEmailAddressChosen) {
                this.formControl.setValidators(Validators.email);
            }
            this.formGroup.addControl(NewEmailComponent_1.newEmailCtrl, this.formControl);
        }
        this.formControl.patchValue(this.newEmailAddress);
        this.radioButtonControl.patchValue(this.isNewEmailAddressChosen ? true : false);
    };
    NewEmailComponent.prototype.newEmailRadioSelected = function () {
        this.newEmailRadioSelect.emit(NewEmailComponent_1.newEmail);
    };
    NewEmailComponent.prototype.newEmailTextChanged = function (email) {
        if (this.formControl.valid) {
            this.newEmailTextChange.emit(email);
        }
    };
    Object.defineProperty(NewEmailComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var NewEmailComponent_1;
    NewEmailComponent.newEmail = 'newEmail';
    NewEmailComponent.newEmailCtrl = 'newEmailCtrl';
    NewEmailComponent.radioCtrl = 'radioCtrl';
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], NewEmailComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NewEmailComponent.prototype, "newEmailAddress", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], NewEmailComponent.prototype, "isNewEmailAddressChosen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewEmailComponent.prototype, "newEmailRadioSelect", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NewEmailComponent.prototype, "newEmailTextChange", void 0);
    NewEmailComponent = NewEmailComponent_1 = __decorate([
        Component({
            selector: 'new-email',
            templateUrl: 'new-email.html',
        })
    ], NewEmailComponent);
    return NewEmailComponent;
}());
export { NewEmailComponent };
//# sourceMappingURL=new-email.js.map