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
var RouteNumberComponent = /** @class */ (function () {
    function RouteNumberComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.routeNumberChange = new EventEmitter();
    }
    RouteNumberComponent_1 = RouteNumberComponent;
    RouteNumberComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(RouteNumberComponent_1.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, RouteNumberComponent_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(RouteNumberComponent_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(RouteNumberComponent_1.fieldName).setValidators([
                Validators.required, Validators.min(1), Validators.max(99), Validators.pattern(/^[0-9]*$/)
            ]);
        }
        this.formControl.patchValue(this.routeNumber);
    };
    RouteNumberComponent.prototype.routeNumberChanged = function (routeNumber) {
        this.routeNumberChange.emit(Number.parseInt(routeNumber, 10) || null);
    };
    Object.defineProperty(RouteNumberComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var RouteNumberComponent_1;
    RouteNumberComponent.fieldName = 'routeNumber';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], RouteNumberComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], RouteNumberComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], RouteNumberComponent.prototype, "routeNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], RouteNumberComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], RouteNumberComponent.prototype, "routeNumberChange", void 0);
    RouteNumberComponent = RouteNumberComponent_1 = __decorate([
        Component({
            selector: 'route-number',
            templateUrl: 'route-number.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], RouteNumberComponent);
    return RouteNumberComponent;
}());
export { RouteNumberComponent };
//# sourceMappingURL=route-number.js.map