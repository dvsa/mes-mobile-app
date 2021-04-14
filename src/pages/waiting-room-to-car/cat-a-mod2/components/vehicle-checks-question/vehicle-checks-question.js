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
var VehicleChecksQuestionComponent = /** @class */ (function () {
    function VehicleChecksQuestionComponent() {
        this.safetyAndBalanceQuestionChange = new EventEmitter();
        this.safetyAndBalanceQuestionOutcomeChange = new EventEmitter();
        this.questionId = uniqueId();
        this.questionOutcomeFieldName = "safetyAndBalanceQuestionOutcome_" + this.questionId;
        this.questionFieldName = "safetyAndBalancesQuestion_" + this.questionId;
    }
    VehicleChecksQuestionComponent.prototype.ngOnChanges = function () {
        if (!this.questionFormControl) {
            this.questionFormControl = new FormControl({ disabled: true });
            this.formGroup.addControl(this.questionFieldName, this.questionFormControl);
        }
        if (!this.questionOutcomeFormControl) {
            this.questionOutcomeFormControl = new FormControl();
            this.formGroup.addControl(this.questionOutcomeFieldName, this.questionOutcomeFormControl);
        }
        if (this.questionResult) {
            this.questionFormControl.patchValue(this.findQuestion());
            this.questionOutcomeFormControl.patchValue(this.questionResult.outcome);
        }
    };
    VehicleChecksQuestionComponent.prototype.isOptionDisabled = function (question) {
        var _this = this;
        var doesQuestionExist = this.questionsToDisable.find(function (questionToDisable) { return questionToDisable.code === question.code &&
            questionToDisable.code !== _this.questionResult.code; });
        return doesQuestionExist !== undefined;
    };
    VehicleChecksQuestionComponent.prototype.safetyAndBalanceQuestionChanged = function (safetyAndBalanceQuestion) {
        var result = {
            code: safetyAndBalanceQuestion.code,
            description: safetyAndBalanceQuestion.shortName,
        };
        this.safetyAndBalanceQuestionChange.emit(result);
    };
    VehicleChecksQuestionComponent.prototype.safetyAndBalancePassSelected = function () {
        var result = 'P';
        this.safetyAndBalanceQuestionOutcomeChange.emit(result);
    };
    VehicleChecksQuestionComponent.prototype.safetyAndBalanceDrivingFaultSelected = function () {
        var result = 'DF';
        this.safetyAndBalanceQuestionOutcomeChange.emit(result);
    };
    VehicleChecksQuestionComponent.prototype.findQuestion = function () {
        var _this = this;
        return this.questions.find(function (question) { return question.code === _this.questionResult.code; });
    };
    VehicleChecksQuestionComponent.prototype.shouldShowOutcomeFields = function () {
        if (this.questionResult && this.questionResult.code && this.questionResult.description) {
            return true;
        }
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionComponent.prototype, "questionResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksQuestionComponent.prototype, "questions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksQuestionComponent.prototype, "questionsToDisable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksQuestionComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksQuestionComponent.prototype, "isLastQuestion", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionComponent.prototype, "safetyAndBalanceQuestionChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionComponent.prototype, "safetyAndBalanceQuestionOutcomeChange", void 0);
    VehicleChecksQuestionComponent = __decorate([
        Component({
            selector: 'vehicle-checks-question',
            templateUrl: 'vehicle-checks-question.html',
        })
    ], VehicleChecksQuestionComponent);
    return VehicleChecksQuestionComponent;
}());
export { VehicleChecksQuestionComponent };
//# sourceMappingURL=vehicle-checks-question.js.map