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
import { getInstructorRegistrationNumberValidator, leadingZero, nonNumericValues, } from '../../../../../shared/constants/field-validators/field-validators';
var InstructorRegistrationComponent = /** @class */ (function () {
    function InstructorRegistrationComponent() {
        this.instructorRegistrationChange = new EventEmitter();
        this.instructorRegistrationNumberValidator = getInstructorRegistrationNumberValidator();
    }
    InstructorRegistrationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl('instructorRegistration', this.formControl);
        }
        this.formControl.patchValue(this.instructorRegistration);
    };
    InstructorRegistrationComponent.prototype.instructorRegistrationChanged = function (event) {
        if (!this.instructorRegistrationNumberValidator.pattern.test(event.target.value)) {
            event.target.value = event.target.value
                .replace(leadingZero, '')
                .replace(nonNumericValues, '');
        }
        this.instructorRegistrationChange.emit(Number(event.target.value) || undefined);
    };
    Object.defineProperty(InstructorRegistrationComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], InstructorRegistrationComponent.prototype, "instructorRegistration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], InstructorRegistrationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], InstructorRegistrationComponent.prototype, "instructorRegistrationChange", void 0);
    InstructorRegistrationComponent = __decorate([
        Component({
            selector: 'instructor-registration',
            templateUrl: 'instructor-registration.html',
        })
    ], InstructorRegistrationComponent);
    return InstructorRegistrationComponent;
}());
export { InstructorRegistrationComponent };
//# sourceMappingURL=instructor-registration.js.map