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
import { uniqueId } from 'lodash';
var SafetyQuestionComponent = /** @class */ (function () {
    function SafetyQuestionComponent() {
        this.safetyQuestionOutcomeChange = new EventEmitter();
        this.safetyQuestionId = uniqueId();
        this.safetyQuestionOutcomeFieldName = "safetyQuestionOutcome_" + this.safetyQuestionId;
        this.safetyQuestionFieldName = "safetyQuestion_" + this.safetyQuestionId;
    }
    SafetyQuestionComponent.prototype.ngOnChanges = function () {
        if (!this.safetyQuestionFormControl) {
            this.safetyQuestionFormControl = new FormControl({ disabled: true });
            this.formGroup.addControl(this.safetyQuestionFieldName, this.safetyQuestionFormControl);
        }
        if (!this.safetyQuestionOutcomeFormControl) {
            this.safetyQuestionOutcomeFormControl = new FormControl();
            this.formGroup.addControl(this.safetyQuestionOutcomeFieldName, this.safetyQuestionOutcomeFormControl);
        }
        if (this.questionResult) {
            this.safetyQuestionFormControl.patchValue(this.findQuestion());
            this.safetyQuestionOutcomeFormControl.patchValue(this.questionResult.outcome);
        }
    };
    SafetyQuestionComponent.prototype.safetyQuestionsPassSelected = function () {
        var result = 'P';
        this.safetyQuestionOutcomeChange.emit(result);
    };
    SafetyQuestionComponent.prototype.safetyQuestionsDrivingFaultSelected = function () {
        var result = 'DF';
        this.safetyQuestionOutcomeChange.emit(result);
    };
    SafetyQuestionComponent.prototype.findQuestion = function () {
        var _this = this;
        return this.questions.find(function (question) { return question.description === _this.questionResult.description; });
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SafetyQuestionComponent.prototype, "questionResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], SafetyQuestionComponent.prototype, "questionIndex", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SafetyQuestionComponent.prototype, "questions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], SafetyQuestionComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SafetyQuestionComponent.prototype, "isLastSafetyQuestion", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SafetyQuestionComponent.prototype, "safetyQuestionOutcomeChange", void 0);
    SafetyQuestionComponent = __decorate([
        Component({
            selector: 'safety-question',
            templateUrl: 'safety-question.html',
        })
    ], SafetyQuestionComponent);
    return SafetyQuestionComponent;
}());
export { SafetyQuestionComponent };
//# sourceMappingURL=safety-question.js.map