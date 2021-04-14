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
import { uniqueId } from 'lodash';
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
var ShowMeQuestionsCatADI2Component = /** @class */ (function () {
    function ShowMeQuestionsCatADI2Component(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.showMeQuestionsChange = new EventEmitter();
        this.questionId = uniqueId();
    }
    ShowMeQuestionsCatADI2Component.prototype.ngOnInit = function () {
        this.updateShowMeQuestionAttributes(true);
    };
    ShowMeQuestionsCatADI2Component.prototype.ngOnChanges = function () {
        this.fieldName = "showMeQuestion_" + this.questionNumber;
        if (!this.formControl) {
            this.formControl = new FormControl({ disabled: true });
            this.formGroup.addControl(this.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, this.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(this.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(this.fieldName).setValidators([Validators.required]);
        }
        if (this.questionResult) {
            this.formControl.patchValue(this.findQuestion());
        }
        this.updateShowMeQuestionAttributes(false);
    };
    ShowMeQuestionsCatADI2Component.prototype.showMeQuestionsChanged = function (showMeQuestions) {
        var result = {
            code: showMeQuestions.code,
            description: showMeQuestions.shortName,
            outcome: this.questionResult.outcome,
        };
        this.showMeQuestionsChange.emit(result);
    };
    ShowMeQuestionsCatADI2Component.prototype.showMeOutcomeChanged = function (value) {
        var result = {
            code: this.questionResult.code,
            description: this.questionResult.description,
            outcome: value,
        };
        this.showMeQuestionsChange.emit(result);
    };
    Object.defineProperty(ShowMeQuestionsCatADI2Component.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    ShowMeQuestionsCatADI2Component.prototype.isOptionDisabled = function (question) {
        var _this = this;
        if (question.code === 'N/A') {
            return false;
        }
        var doesQuestionExist = this.questionsToDisable.find(function (questionToDisable) { return questionToDisable.code === question.code &&
            questionToDisable.code !== _this.questionResult.code; });
        return doesQuestionExist !== undefined;
    };
    ShowMeQuestionsCatADI2Component.prototype.findQuestion = function () {
        var _this = this;
        return this.questions.find(function (question) { return question.code === _this.questionResult.code; });
    };
    ShowMeQuestionsCatADI2Component.prototype.updateShowMeQuestionAttributes = function (shouldEnableDisableFields) {
        var seriousDangerousCount = [this.serious, this.dangerous].filter(Boolean).length;
        if ((seriousDangerousCount === 0 && this.drivingFaults === 0) ||
            (seriousDangerousCount === 0 && this.drivingFaults === 1 && this.questionNumber === 2)) {
            this.checked = true;
            if (shouldEnableDisableFields)
                this.disabled = true;
        }
        else if ((seriousDangerousCount === 1 && this.drivingFaults === 0 && this.questionNumber === 2)) {
            this.checked = true;
            if (shouldEnableDisableFields)
                this.disabled = false;
        }
        else {
            this.checked = false;
            if (shouldEnableDisableFields)
                this.disabled = true;
        }
    };
    Object.defineProperty(ShowMeQuestionsCatADI2Component.prototype, "showMeChecked", {
        get: function () {
            return this.checked;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShowMeQuestionsCatADI2Component.prototype, "showMeDisabled", {
        get: function () {
            return this.disabled;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ShowMeQuestionsCatADI2Component.prototype, "questionResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowMeQuestionsCatADI2Component.prototype, "questions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ShowMeQuestionsCatADI2Component.prototype, "questionNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowMeQuestionsCatADI2Component.prototype, "questionsToDisable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ShowMeQuestionsCatADI2Component.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShowMeQuestionsCatADI2Component.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ShowMeQuestionsCatADI2Component.prototype, "serious", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ShowMeQuestionsCatADI2Component.prototype, "dangerous", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], ShowMeQuestionsCatADI2Component.prototype, "drivingFaults", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowMeQuestionsCatADI2Component.prototype, "showMeQuestionsChange", void 0);
    ShowMeQuestionsCatADI2Component = __decorate([
        Component({
            selector: 'show-me-questions-cat-adi2',
            templateUrl: 'show-me-questions.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], ShowMeQuestionsCatADI2Component);
    return ShowMeQuestionsCatADI2Component;
}());
export { ShowMeQuestionsCatADI2Component };
//# sourceMappingURL=show-me-questions.js.map