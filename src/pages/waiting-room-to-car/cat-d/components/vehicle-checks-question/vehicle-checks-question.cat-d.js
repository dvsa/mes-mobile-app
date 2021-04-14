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
var VehicleChecksQuestionCatDComponent = /** @class */ (function () {
    function VehicleChecksQuestionCatDComponent() {
        this.vehicleChecksQuestionChange = new EventEmitter();
        this.vehicleChecksQuestionOutcomeChange = new EventEmitter();
        this.questionId = uniqueId();
        this.questionOutcomeFieldName = "vehicleChecksQuestionOutcome_" + this.questionId;
        this.questionFieldName = "vehicleChecksQuestion_" + this.questionId;
    }
    VehicleChecksQuestionCatDComponent.prototype.ngOnChanges = function () {
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
    VehicleChecksQuestionCatDComponent.prototype.isOptionDisabled = function (question) {
        var _this = this;
        var doesQuestionExist = this.questionsToDisable.find(function (questionToDisable) { return questionToDisable.code === question.code &&
            questionToDisable.code !== _this.questionResult.code; });
        return doesQuestionExist !== undefined;
    };
    VehicleChecksQuestionCatDComponent.prototype.vehicleChecksQuestionChanged = function (vehicleChecksQuestion) {
        var result = {
            code: vehicleChecksQuestion.code,
            description: vehicleChecksQuestion.shortName,
        };
        this.vehicleChecksQuestionChange.emit(result);
    };
    VehicleChecksQuestionCatDComponent.prototype.vehicleChecksPassSelected = function () {
        var result = 'P';
        this.vehicleChecksQuestionOutcomeChange.emit(result);
    };
    VehicleChecksQuestionCatDComponent.prototype.vehicleChecksDrivingFaultSelected = function () {
        var result = 'DF';
        this.vehicleChecksQuestionOutcomeChange.emit(result);
    };
    VehicleChecksQuestionCatDComponent.prototype.findQuestion = function () {
        var _this = this;
        return this.questions.find(function (question) { return question.code === _this.questionResult.code; });
    };
    VehicleChecksQuestionCatDComponent.prototype.shouldShowOutcomeFields = function () {
        if (this.questionResult && this.questionResult.code && this.questionResult.description) {
            return true;
        }
        return false;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionCatDComponent.prototype, "questionResult", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksQuestionCatDComponent.prototype, "questions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksQuestionCatDComponent.prototype, "questionsToDisable", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], VehicleChecksQuestionCatDComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksQuestionCatDComponent.prototype, "isLastQuestion", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionCatDComponent.prototype, "vehicleChecksQuestionChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], VehicleChecksQuestionCatDComponent.prototype, "vehicleChecksQuestionOutcomeChange", void 0);
    VehicleChecksQuestionCatDComponent = __decorate([
        Component({
            selector: 'vehicle-checks-question-cat-d',
            templateUrl: 'vehicle-checks-question.cat-d.html',
        })
    ], VehicleChecksQuestionCatDComponent);
    return VehicleChecksQuestionCatDComponent;
}());
export { VehicleChecksQuestionCatDComponent };
//# sourceMappingURL=vehicle-checks-question.cat-d.js.map