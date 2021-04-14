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
var ValidCode78Values;
(function (ValidCode78Values) {
    ValidCode78Values["YES"] = "yes";
    ValidCode78Values["NO"] = "no";
})(ValidCode78Values || (ValidCode78Values = {}));
var Code78Component = /** @class */ (function () {
    function Code78Component() {
        this.code78Present = new EventEmitter();
    }
    Code78Component_1 = Code78Component;
    Code78Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.form.addControl(Code78Component_1.fieldName, this.formControl);
        }
        if (this.code78 !== null) {
            this.formControl.patchValue(this.code78 ? ValidCode78Values.YES : ValidCode78Values.NO);
        }
        else {
            this.formControl.patchValue(null);
        }
    };
    Code78Component.prototype.isInvalid = function () {
        return !this.formControl.valid && this.formControl.dirty;
    };
    Code78Component.prototype.code78IsPresent = function () {
        this.code78Present.emit(true);
    };
    Code78Component.prototype.code78IsNotPresent = function () {
        this.code78Present.emit(false);
    };
    var Code78Component_1;
    Code78Component.fieldName = 'code78Ctrl';
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], Code78Component.prototype, "form", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], Code78Component.prototype, "code78", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], Code78Component.prototype, "code78Present", void 0);
    Code78Component = Code78Component_1 = __decorate([
        Component({
            selector: 'code-78',
            templateUrl: 'code-78.html',
        })
    ], Code78Component);
    return Code78Component;
}());
export { Code78Component };
//# sourceMappingURL=code-78.js.map