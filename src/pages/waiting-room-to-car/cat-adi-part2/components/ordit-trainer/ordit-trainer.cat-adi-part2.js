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
var OrditTrained;
(function (OrditTrained) {
    OrditTrained["YES"] = "Y";
    OrditTrained["NO"] = "N";
})(OrditTrained || (OrditTrained = {}));
var OrditTrainerCatAdiPart2Component = /** @class */ (function () {
    function OrditTrainerCatAdiPart2Component() {
        this.orditTrainedOutcomeChange = new EventEmitter();
    }
    OrditTrainerCatAdiPart2Component.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl('orditTrainedCtrl', this.formControl);
        }
        this.formControl.patchValue(this.orditTrainedRadioChecked);
    };
    Object.defineProperty(OrditTrainerCatAdiPart2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    OrditTrainerCatAdiPart2Component.prototype.orditTrainingOutcomeChanged = function (orditTrained) {
        if (this.formControl.valid) {
            this.orditTrainedOutcomeChange.emit(orditTrained === OrditTrained.YES);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], OrditTrainerCatAdiPart2Component.prototype, "orditTrainedRadioChecked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], OrditTrainerCatAdiPart2Component.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], OrditTrainerCatAdiPart2Component.prototype, "orditTrainedOutcomeChange", void 0);
    OrditTrainerCatAdiPart2Component = __decorate([
        Component({
            selector: 'ordit-trainer-cat-adi-part2',
            templateUrl: 'ordit-trainer.cat-adi-part2.html',
        })
    ], OrditTrainerCatAdiPart2Component);
    return OrditTrainerCatAdiPart2Component;
}());
export { OrditTrainerCatAdiPart2Component };
//# sourceMappingURL=ordit-trainer.cat-adi-part2.js.map