var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var TrainingRecorded;
(function (TrainingRecorded) {
    TrainingRecorded["YES"] = "Y";
    TrainingRecorded["NO"] = "N";
})(TrainingRecorded || (TrainingRecorded = {}));
var TrainingRecordsCatAdiPart2Component = /** @class */ (function () {
    function TrainingRecordsCatAdiPart2Component() {
        this.trainingRecordOutcomeChange = new EventEmitter();
    }
    TrainingRecordsCatAdiPart2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl('trainingRecordCtrl', this.formControl);
        }
        this.formControl.patchValue(this.trainingRecordRadioChecked);
    };
    Object.defineProperty(TrainingRecordsCatAdiPart2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    TrainingRecordsCatAdiPart2Component.prototype.trainingRecordOutcomeChanged = function (trainingRecorded) {
        if (this.formControl.valid) {
            this.trainingRecordOutcomeChange.emit(trainingRecorded === TrainingRecorded.YES);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TrainingRecordsCatAdiPart2Component.prototype, "trainingRecordRadioChecked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TrainingRecordsCatAdiPart2Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TrainingRecordsCatAdiPart2Component.prototype, "trainingRecordOutcomeChange", void 0);
    TrainingRecordsCatAdiPart2Component = __decorate([
        Component({
            selector: 'training-records-cat-adi-part2',
            templateUrl: 'training-records.cat-adi-part2.html',
        })
    ], TrainingRecordsCatAdiPart2Component);
    return TrainingRecordsCatAdiPart2Component;
}());
export { TrainingRecordsCatAdiPart2Component };
//# sourceMappingURL=training-records.cat-adi-part2.js.map