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
var QuestionDelExRadioCardComponent = /** @class */ (function () {
    function QuestionDelExRadioCardComponent() {
        var _this = this;
        this.questionScore = new EventEmitter();
        this.answerArray = [0, 5, 10, 15, 20];
        this.questionScoreChanged = function (value) {
            _this.questionScore.emit({
                questionNumber: _this.questionNumber,
                score: value,
            });
        };
    }
    QuestionDelExRadioCardComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null, [Validators.required]);
            this.formGroup.addControl("cpcQuestion" + this.questionNumber + "ResultCtrl", this.formControl);
        }
        if (this.question.score || this.question.score === 0) {
            this.formControl.patchValue(this.question.score.toString());
        }
    };
    Object.defineProperty(QuestionDelExRadioCardComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], QuestionDelExRadioCardComponent.prototype, "question", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionDelExRadioCardComponent.prototype, "questionNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], QuestionDelExRadioCardComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], QuestionDelExRadioCardComponent.prototype, "questionScore", void 0);
    QuestionDelExRadioCardComponent = __decorate([
        Component({
            selector: 'question-del-ex-radio-card',
            templateUrl: 'question-del-ex-radio-card.html',
        })
    ], QuestionDelExRadioCardComponent);
    return QuestionDelExRadioCardComponent;
}());
export { QuestionDelExRadioCardComponent };
//# sourceMappingURL=question-del-ex-radio-card.js.map