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
var WeatherConditionsComponent = /** @class */ (function () {
    function WeatherConditionsComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.weatherConditionsChange = new EventEmitter();
    }
    WeatherConditionsComponent_1 = WeatherConditionsComponent;
    WeatherConditionsComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl([]);
            this.formGroup.addControl(WeatherConditionsComponent_1.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, WeatherConditionsComponent_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(WeatherConditionsComponent_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(WeatherConditionsComponent_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.weatherConditions);
    };
    WeatherConditionsComponent.prototype.weatherConditionsChanged = function (weatherConditions) {
        this.weatherConditionsChange.emit(weatherConditions);
    };
    Object.defineProperty(WeatherConditionsComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var WeatherConditionsComponent_1;
    WeatherConditionsComponent.fieldName = 'weatherConditions';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], WeatherConditionsComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WeatherConditionsComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], WeatherConditionsComponent.prototype, "weatherConditions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], WeatherConditionsComponent.prototype, "weatherConditionsOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], WeatherConditionsComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], WeatherConditionsComponent.prototype, "weatherConditionsChange", void 0);
    WeatherConditionsComponent = WeatherConditionsComponent_1 = __decorate([
        Component({
            selector: 'weather-conditions',
            templateUrl: 'weather-conditions.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], WeatherConditionsComponent);
    return WeatherConditionsComponent;
}());
export { WeatherConditionsComponent };
//# sourceMappingURL=weather-conditions.js.map