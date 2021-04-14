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
var TellMeQuestionOutcomeComponent = /** @class */ (function () {
    function TellMeQuestionOutcomeComponent() {
        this.tellMeQuestionOutcomeChange = new EventEmitter();
    }
    TellMeQuestionOutcomeComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('', [Validators.required]);
            this.formGroup.addControl('tellMeQuestionOutcome', this.formControl);
        }
        this.formControl.patchValue(this.tellMeQuestionOutcome);
    };
    TellMeQuestionOutcomeComponent.prototype.tellMeQuestionOutcomeChanged = function (questionOutcome) {
        if (this.formControl.valid) {
            this.tellMeQuestionOutcomeChange.emit(questionOutcome);
        }
    };
    Object.defineProperty(TellMeQuestionOutcomeComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TellMeQuestionOutcomeComponent.prototype, "tellMeQuestionOutcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TellMeQuestionOutcomeComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TellMeQuestionOutcomeComponent.prototype, "tellMeQuestionSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TellMeQuestionOutcomeComponent.prototype, "tellMeQuestionOutcomeChange", void 0);
    TellMeQuestionOutcomeComponent = __decorate([
        Component({
            selector: 'tell-me-question-outcome',
            templateUrl: 'tell-me-question-outcome.html',
        })
    ], TellMeQuestionOutcomeComponent);
    return TellMeQuestionOutcomeComponent;
}());
export { TellMeQuestionOutcomeComponent };
//# sourceMappingURL=tell-me-question-outcome.js.map