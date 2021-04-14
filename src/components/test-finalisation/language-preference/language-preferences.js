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
var LanguagePreferencesComponent = /** @class */ (function () {
    function LanguagePreferencesComponent() {
        this.isDelegated = false;
        this.welshChanged = new EventEmitter();
        this.formField = 'languagePreferences';
    }
    LanguagePreferencesComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, Validators.required);
            this.formGroup.addControl(this.formField, this.formControl);
            this.formGroup.get(this.formField).setValidators([Validators.required]);
        }
        if (this.isDelegated) {
            if (!this.formControl.dirty) {
                this.formControl.patchValue('false');
                this.isWelshChanged('false');
            }
            return;
        }
        this.formControl.patchValue(this.isWelsh);
    };
    LanguagePreferencesComponent.prototype.isWelshChanged = function (isWelsh) {
        if (this.formControl.valid) {
            this.welshChanged.emit(isWelsh === 'true');
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LanguagePreferencesComponent.prototype, "isWelsh", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], LanguagePreferencesComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LanguagePreferencesComponent.prototype, "isDelegated", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], LanguagePreferencesComponent.prototype, "welshChanged", void 0);
    LanguagePreferencesComponent = __decorate([
        Component({
            selector: 'language-preferences',
            templateUrl: 'language-preferences.html',
        })
    ], LanguagePreferencesComponent);
    return LanguagePreferencesComponent;
}());
export { LanguagePreferencesComponent };
//# sourceMappingURL=language-preferences.js.map