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
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
import { removeNonAlphaNumeric } from '../../../../shared/helpers/formatters';
import { getDrivingOrRidingLabel } from '../../../../shared/helpers/driver-type';
var IndependentDrivingComponent = /** @class */ (function () {
    function IndependentDrivingComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.independentDrivingChange = new EventEmitter();
    }
    IndependentDrivingComponent_1 = IndependentDrivingComponent;
    IndependentDrivingComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl('independentDriving', this.formControl);
        }
        this.showNotApplicable = this.outcomeBehaviourProvider.showNotApplicable(this.outcome, IndependentDrivingComponent_1.fieldName);
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, IndependentDrivingComponent_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(IndependentDrivingComponent_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(IndependentDrivingComponent_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.independentDriving);
    };
    IndependentDrivingComponent.prototype.independentDrivingChanged = function (independentDriving) {
        if (this.formControl.valid) {
            this.independentDrivingChange.emit(independentDriving);
        }
    };
    IndependentDrivingComponent.prototype.getIndependentDrivingInputId = function (inputLabel) {
        return "independent-driving-" + removeNonAlphaNumeric(inputLabel).toLowerCase();
    };
    Object.defineProperty(IndependentDrivingComponent.prototype, "componentTitle", {
        get: function () {
            return "Independent " + getDrivingOrRidingLabel(this.category);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IndependentDrivingComponent.prototype, "componentWarningMessage", {
        get: function () {
            return "Select the method of independent " + getDrivingOrRidingLabel(this.category);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IndependentDrivingComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var IndependentDrivingComponent_1;
    IndependentDrivingComponent.fieldName = 'independentDriving';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IndependentDrivingComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "category", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "option1", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "option2", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "option1label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "option2label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndependentDrivingComponent.prototype, "independentDriving", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], IndependentDrivingComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IndependentDrivingComponent.prototype, "independentDrivingChange", void 0);
    IndependentDrivingComponent = IndependentDrivingComponent_1 = __decorate([
        Component({
            selector: 'independent-driving',
            templateUrl: 'independent-driving.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], IndependentDrivingComponent);
    return IndependentDrivingComponent;
}());
export { IndependentDrivingComponent };
//# sourceMappingURL=independent-driving.js.map