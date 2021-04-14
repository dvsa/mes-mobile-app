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
import { FormControl, FormGroup, Validators } from '@angular/forms';
var ProvidedEmailComponent = /** @class */ (function () {
    function ProvidedEmailComponent() {
        this.providedEmailRadioSelect = new EventEmitter();
    }
    ProvidedEmailComponent_1 = ProvidedEmailComponent;
    ProvidedEmailComponent.prototype.ngOnChanges = function () {
        if (!this.radioButtonControl) {
            this.radioButtonControl = new FormControl('', Validators.required);
            this.formGroup.addControl(ProvidedEmailComponent_1.radioCtrl, this.radioButtonControl);
        }
        this.radioButtonControl.patchValue(this.isProvidedEmailAddressChosen ? true : false);
    };
    ProvidedEmailComponent.prototype.providedEmailRadioSelected = function () {
        this.providedEmailRadioSelect.emit(ProvidedEmailComponent_1.providedEmail);
    };
    var ProvidedEmailComponent_1;
    ProvidedEmailComponent.providedEmail = 'Email';
    ProvidedEmailComponent.radioCtrl = 'radioCtrl';
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ProvidedEmailComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ProvidedEmailComponent.prototype, "providedEmailAddress", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProvidedEmailComponent.prototype, "shouldRender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ProvidedEmailComponent.prototype, "isProvidedEmailAddressChosen", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ProvidedEmailComponent.prototype, "providedEmailRadioSelect", void 0);
    ProvidedEmailComponent = ProvidedEmailComponent_1 = __decorate([
        Component({
            selector: 'provided-email',
            templateUrl: 'provided-email.html',
        })
    ], ProvidedEmailComponent);
    return ProvidedEmailComponent;
}());
export { ProvidedEmailComponent };
//# sourceMappingURL=provided-email.js.map