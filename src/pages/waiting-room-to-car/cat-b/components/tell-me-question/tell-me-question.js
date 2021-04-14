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
var TellMeQuestionComponent = /** @class */ (function () {
    function TellMeQuestionComponent() {
        this.tellMeQuestionChange = new EventEmitter();
    }
    TellMeQuestionComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl('TellMeQuestion', [Validators.required]);
            this.formGroup.addControl('tellMeQuestion', this.formControl);
        }
        this.formControl.patchValue(this.tellMeQuestion);
    };
    TellMeQuestionComponent.prototype.tellMeQuestionChanged = function (tellMeQuestion) {
        if (this.formControl.valid) {
            this.tellMeQuestionChange.emit(tellMeQuestion);
        }
    };
    Object.defineProperty(TellMeQuestionComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TellMeQuestionComponent.prototype, "tellMeQuestion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TellMeQuestionComponent.prototype, "tellMeQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TellMeQuestionComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TellMeQuestionComponent.prototype, "tellMeQuestionChange", void 0);
    TellMeQuestionComponent = __decorate([
        Component({
            selector: 'tell-me-question',
            templateUrl: 'tell-me-question.html',
        })
    ], TellMeQuestionComponent);
    return TellMeQuestionComponent;
}());
export { TellMeQuestionComponent };
//# sourceMappingURL=tell-me-question.js.map