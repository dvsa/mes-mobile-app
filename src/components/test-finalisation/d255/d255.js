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
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../providers/outcome-behaviour-map/outcome-behaviour-map';
export var ValidD255Values;
(function (ValidD255Values) {
    ValidD255Values["YES"] = "Yes";
    ValidD255Values["NO"] = "No";
})(ValidD255Values || (ValidD255Values = {}));
var D255Component = /** @class */ (function () {
    function D255Component(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.d255Change = new EventEmitter();
    }
    D255Component_1 = D255Component;
    D255Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(D255Component_1.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, D255Component_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(D255Component_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(D255Component_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.getD255OrDefault());
    };
    D255Component.prototype.d255Changed = function (d255FormValue) {
        if (this.formControl.valid) {
            this.d255Change.emit(d255FormValue === ValidD255Values.YES);
        }
    };
    D255Component.prototype.getD255OrDefault = function () {
        if (this.d255 !== null) {
            return this.d255 ? ValidD255Values.YES : ValidD255Values.NO;
        }
        if (this.outcomeBehaviourProvider.hasDefault(this.outcome, D255Component_1.fieldName)) {
            var defaultValue = this.outcomeBehaviourProvider.getDefault(this.outcome, D255Component_1.fieldName);
            this.d255Changed(defaultValue);
            return defaultValue;
        }
        return null;
    };
    Object.defineProperty(D255Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var D255Component_1;
    D255Component.fieldName = 'd255';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], D255Component.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], D255Component.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], D255Component.prototype, "d255", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], D255Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], D255Component.prototype, "d255Change", void 0);
    D255Component = D255Component_1 = __decorate([
        Component({
            selector: 'd255',
            templateUrl: 'd255.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], D255Component);
    return D255Component;
}());
export { D255Component };
//# sourceMappingURL=d255.js.map