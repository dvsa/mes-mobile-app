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
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { removeNonAlphaNumeric } from '../../../../../shared/helpers/formatters';
var ModeOfTransportCatAMod2Component = /** @class */ (function () {
    function ModeOfTransportCatAMod2Component(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.modeOfTransportChange = new EventEmitter();
    }
    ModeOfTransportCatAMod2Component_1 = ModeOfTransportCatAMod2Component;
    ModeOfTransportCatAMod2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl('modeOfTransport', this.formControl);
        }
        this.showNotApplicable = this.outcomeBehaviourProvider.showNotApplicable(this.outcome, ModeOfTransportCatAMod2Component_1.fieldName);
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, ModeOfTransportCatAMod2Component_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(ModeOfTransportCatAMod2Component_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(ModeOfTransportCatAMod2Component_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.modeOfTransport);
    };
    ModeOfTransportCatAMod2Component.prototype.modeOfTransportChanged = function (modeOfTransport) {
        if (this.formControl.valid) {
            this.modeOfTransportChange.emit(modeOfTransport);
        }
    };
    ModeOfTransportCatAMod2Component.prototype.getModeOfTransportInputId = function (inputLabel) {
        return "mode-of-transport-" + removeNonAlphaNumeric(inputLabel).toLowerCase();
    };
    Object.defineProperty(ModeOfTransportCatAMod2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var ModeOfTransportCatAMod2Component_1;
    ModeOfTransportCatAMod2Component.fieldName = 'modeOfTransport';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "option1", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "option2", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "option1label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "option2label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ModeOfTransportCatAMod2Component.prototype, "modeOfTransport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ModeOfTransportCatAMod2Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ModeOfTransportCatAMod2Component.prototype, "modeOfTransportChange", void 0);
    ModeOfTransportCatAMod2Component = ModeOfTransportCatAMod2Component_1 = __decorate([
        Component({
            selector: 'mode-of-transport',
            templateUrl: 'mode-of-transport.cat-a-mod2.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], ModeOfTransportCatAMod2Component);
    return ModeOfTransportCatAMod2Component;
}());
export { ModeOfTransportCatAMod2Component };
//# sourceMappingURL=mode-of-transport.cat-a-mod2.js.map