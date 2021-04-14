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
import { getTrainerRegistrationNumberValidator, leadingZero, nonNumericValues, } from '../../../../../shared/constants/field-validators/field-validators';
var TrainerRegistrationNumberCatAdiPart2Component = /** @class */ (function () {
    function TrainerRegistrationNumberCatAdiPart2Component() {
        this.trainerRegistrationChange = new EventEmitter();
        this.trainerRegistrationNumberValidator = getTrainerRegistrationNumberValidator();
    }
    TrainerRegistrationNumberCatAdiPart2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl('trainerRegistration', this.formControl);
        }
        this.formControl.patchValue(this.trainerRegistration);
    };
    TrainerRegistrationNumberCatAdiPart2Component.prototype.trainerRegistrationChanged = function (event) {
        if (!this.trainerRegistrationNumberValidator.pattern.test(event.target.value)) {
            event.target.value = event.target.value
                .replace(leadingZero, '')
                .replace(nonNumericValues, '');
        }
        this.trainerRegistrationChange.emit(Number(event.target.value) || undefined);
    };
    Object.defineProperty(TrainerRegistrationNumberCatAdiPart2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TrainerRegistrationNumberCatAdiPart2Component.prototype, "trainerRegistration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TrainerRegistrationNumberCatAdiPart2Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TrainerRegistrationNumberCatAdiPart2Component.prototype, "trainerRegistrationChange", void 0);
    TrainerRegistrationNumberCatAdiPart2Component = __decorate([
        Component({
            selector: 'trainer-registration-number-cat-adi-part2',
            templateUrl: 'trainer-registration-number.cat-adi-part2.html',
        })
    ], TrainerRegistrationNumberCatAdiPart2Component);
    return TrainerRegistrationNumberCatAdiPart2Component;
}());
export { TrainerRegistrationNumberCatAdiPart2Component };
//# sourceMappingURL=trainer-registration-number.cat-adi-part2.js.map