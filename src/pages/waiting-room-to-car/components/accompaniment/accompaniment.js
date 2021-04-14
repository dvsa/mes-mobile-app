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
import { FormGroup, FormControl } from '@angular/forms';
var AccompanimentComponent = /** @class */ (function () {
    function AccompanimentComponent() {
        this.accompanimentChange = new EventEmitter();
    }
    AccompanimentComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(this.formControlName, this.formControl);
        }
        this.formControl.patchValue(this.accompaniment);
    };
    AccompanimentComponent.prototype.accompanimentChanged = function () {
        if (this.formControl.valid) {
            this.accompanimentChange.emit();
        }
    };
    Object.defineProperty(AccompanimentComponent.prototype, "formControlName", {
        get: function () {
            return "accompaniment-" + this.accompanimentType;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AccompanimentComponent.prototype, "accompaniment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AccompanimentComponent.prototype, "accompanimentType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], AccompanimentComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AccompanimentComponent.prototype, "accompanimentChange", void 0);
    AccompanimentComponent = __decorate([
        Component({
            selector: 'accompaniment',
            templateUrl: 'accompaniment.html',
        })
    ], AccompanimentComponent);
    return AccompanimentComponent;
}());
export { AccompanimentComponent };
//# sourceMappingURL=accompaniment.js.map