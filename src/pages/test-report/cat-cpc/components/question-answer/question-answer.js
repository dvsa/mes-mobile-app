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
var QuestionAnswerComponent = /** @class */ (function () {
    function QuestionAnswerComponent() {
        var _this = this;
        this.answerToggled = new EventEmitter();
        this.getID = function (answerNumber) { return "answer" + answerNumber; };
        this.getLabel = function (answerNumber) { return "answer-label-" + answerNumber; };
        this.answerChanged = function () {
            _this.answerToggled.emit({
                answer: _this.answer,
                answerNumber: _this.answerNumber,
            });
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], QuestionAnswerComponent.prototype, "answer", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], QuestionAnswerComponent.prototype, "answerNumber", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], QuestionAnswerComponent.prototype, "answerToggled", void 0);
    QuestionAnswerComponent = __decorate([
        Component({
            selector: 'question-answer',
            templateUrl: 'question-answer.html',
        })
    ], QuestionAnswerComponent);
    return QuestionAnswerComponent;
}());
export { QuestionAnswerComponent };
//# sourceMappingURL=question-answer.js.map