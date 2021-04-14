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
var ValidWitnessedValues;
(function (ValidWitnessedValues) {
    ValidWitnessedValues["YES"] = "Yes";
    ValidWitnessedValues["NO"] = "No";
})(ValidWitnessedValues || (ValidWitnessedValues = {}));
var DebriefWitnessedComponent = /** @class */ (function () {
    function DebriefWitnessedComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.debriefWitnessedChange = new EventEmitter();
        this.isDelegated = false;
    }
    DebriefWitnessedComponent_1 = DebriefWitnessedComponent;
    DebriefWitnessedComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(DebriefWitnessedComponent_1.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, DebriefWitnessedComponent_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(DebriefWitnessedComponent_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(DebriefWitnessedComponent_1.fieldName).setValidators([Validators.required]);
        }
        if (this.debriefWitnessed !== null) {
            this.formControl.patchValue(this.debriefWitnessed
                ? ValidWitnessedValues.YES : ValidWitnessedValues.NO);
        }
        else {
            this.formControl.patchValue(null);
        }
    };
    DebriefWitnessedComponent.prototype.debriefWitnessedChanged = function (debriefWitnessedFormValue) {
        if (this.formControl.valid) {
            this.debriefWitnessedChange.emit(debriefWitnessedFormValue === ValidWitnessedValues.YES);
        }
    };
    Object.defineProperty(DebriefWitnessedComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var DebriefWitnessedComponent_1;
    DebriefWitnessedComponent.fieldName = 'debriefWitnessed';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DebriefWitnessedComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DebriefWitnessedComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DebriefWitnessedComponent.prototype, "debriefWitnessed", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], DebriefWitnessedComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DebriefWitnessedComponent.prototype, "debriefWitnessedChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], DebriefWitnessedComponent.prototype, "isDelegated", void 0);
    DebriefWitnessedComponent = DebriefWitnessedComponent_1 = __decorate([
        Component({
            selector: 'debrief-witnessed',
            templateUrl: 'debrief-witnessed.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], DebriefWitnessedComponent);
    return DebriefWitnessedComponent;
}());
export { DebriefWitnessedComponent };
//# sourceMappingURL=debrief-witnessed.js.map