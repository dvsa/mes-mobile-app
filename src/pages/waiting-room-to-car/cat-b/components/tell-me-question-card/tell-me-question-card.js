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
import { FormGroup } from '@angular/forms';
var TellMeQuestionCardComponent = /** @class */ (function () {
    function TellMeQuestionCardComponent() {
        this.tellMeQuestionChange = new EventEmitter();
        this.tellMeQuestionOutcomeChange = new EventEmitter();
        this.questionValid = true;
        this.outcomeValid = true;
    }
    Object.defineProperty(TellMeQuestionCardComponent.prototype, "questionInvalid", {
        get: function () {
            var question = this.formGroup.get('tellMeQuestion');
            if (!question) {
                return false;
            }
            return !question.valid && question.dirty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TellMeQuestionCardComponent.prototype, "outcomeInvalid", {
        get: function () {
            var outcome = this.formGroup.get('tellMeQuestionOutcome');
            if (!outcome) {
                return false;
            }
            return !outcome.valid && outcome.dirty;
        },
        enumerable: false,
        configurable: true
    });
    TellMeQuestionCardComponent.prototype.tellMeQuestionChanged = function (tellMeQuestion) {
        this.tellMeQuestionChange.emit(tellMeQuestion);
    };
    TellMeQuestionCardComponent.prototype.tellMeQuestionOutcomeChanged = function (outcome) {
        this.tellMeQuestionOutcomeChange.emit(outcome);
    };
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], TellMeQuestionCardComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestionOutcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestionSelected", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestionChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], TellMeQuestionCardComponent.prototype, "tellMeQuestionOutcomeChange", void 0);
    TellMeQuestionCardComponent = __decorate([
        Component({
            selector: 'tell-me-question-card',
            templateUrl: 'tell-me-question-card.html',
        })
    ], TellMeQuestionCardComponent);
    return TellMeQuestionCardComponent;
}());
export { TellMeQuestionCardComponent };
//# sourceMappingURL=tell-me-question-card.js.map