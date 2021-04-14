var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { TestOutcome } from '../../../shared/models/test-outcome';
import { TestOutcome as OutcomeType } from '../../../modules/tests/tests.constants';
export var MINIMUM_QUESTION_SCORE = 15;
var CPCDebriefCardComponent = /** @class */ (function () {
    function CPCDebriefCardComponent() {
        var _this = this;
        this.isDetailedTestView = false;
        this.getFormattedQuestion = function (question) {
            return question.questionCode + " - " + question.title;
        };
        this.getQuestionPercentage = function (question) {
            return question.score || 0;
        };
        this.shouldTickBox = function (question) {
            return question.score >= MINIMUM_QUESTION_SCORE;
        };
        this.getCardHeader = function () {
            return _this.isDetailedTestView ? 'Debrief' : 'Test details';
        };
        this.isPass = function () {
            return _this.testOutcome === TestOutcome.PASS || _this.testOutcome === OutcomeType.Passed;
        };
    }
    CPCDebriefCardComponent.prototype.ngOnInit = function () {
        this.questions = [this.question1, this.question2, this.question3, this.question4, this.question5];
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCDebriefCardComponent.prototype, "question1", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCDebriefCardComponent.prototype, "question2", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCDebriefCardComponent.prototype, "question3", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCDebriefCardComponent.prototype, "question4", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CPCDebriefCardComponent.prototype, "question5", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], CPCDebriefCardComponent.prototype, "overallScore", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CPCDebriefCardComponent.prototype, "testOutcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CPCDebriefCardComponent.prototype, "isDetailedTestView", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CPCDebriefCardComponent.prototype, "combination", void 0);
    CPCDebriefCardComponent = __decorate([
        Component({
            selector: 'cpc-debrief-card',
            templateUrl: 'cpc-debrief-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], CPCDebriefCardComponent);
    return CPCDebriefCardComponent;
}());
export { CPCDebriefCardComponent };
//# sourceMappingURL=cpc-debrief-card.js.map