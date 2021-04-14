var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var QuestionCardComponent = /** @class */ (function () {
    function QuestionCardComponent() {
        var _this = this;
        this.answerPayload = new EventEmitter();
        this.answerChanged = function (details) {
            _this.answerPayload.emit(__assign({ questionNumber: _this.questionNumber }, details));
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], QuestionCardComponent.prototype, "question", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionCardComponent.prototype, "questionNumber", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], QuestionCardComponent.prototype, "answerPayload", void 0);
    QuestionCardComponent = __decorate([
        Component({
            selector: 'question-card',
            templateUrl: 'question-card.html',
        })
    ], QuestionCardComponent);
    return QuestionCardComponent;
}());
export { QuestionCardComponent };
//# sourceMappingURL=question-card.js.map