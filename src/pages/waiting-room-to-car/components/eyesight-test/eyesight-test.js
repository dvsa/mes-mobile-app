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
var EyesightTestResult;
(function (EyesightTestResult) {
    EyesightTestResult["Pass"] = "P";
    EyesightTestResult["Fail"] = "F";
})(EyesightTestResult || (EyesightTestResult = {}));
var EyesightTestComponent = /** @class */ (function () {
    function EyesightTestComponent() {
        this.eyesightTestResultChange = new EventEmitter();
    }
    EyesightTestComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl('eyesightCtrl', this.formControl);
        }
        this.formControl.patchValue(this.eyesightPassRadioChecked);
    };
    EyesightTestComponent.prototype.eyesightTestResultChanged = function (result) {
        if (this.formControl.valid) {
            this.eyesightTestResultChange.emit(result === EyesightTestResult.Pass);
        }
    };
    Object.defineProperty(EyesightTestComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EyesightTestComponent.prototype, "testPassed", {
        get: function () {
            return this.eyesightPassRadioChecked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EyesightTestComponent.prototype, "testFailed", {
        get: function () {
            return this.eyesightFailRadioChecked;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EyesightTestComponent.prototype, "eyesightPassRadioChecked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EyesightTestComponent.prototype, "eyesightFailRadioChecked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], EyesightTestComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], EyesightTestComponent.prototype, "eyesightTestResultChange", void 0);
    EyesightTestComponent = __decorate([
        Component({
            selector: 'eyesight-test',
            templateUrl: 'eyesight-test.html',
        })
    ], EyesightTestComponent);
    return EyesightTestComponent;
}());
export { EyesightTestComponent };
//# sourceMappingURL=eyesight-test.js.map