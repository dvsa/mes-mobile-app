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
import { FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
var QuestionFooterComponent = /** @class */ (function () {
    function QuestionFooterComponent(toastController) {
        var _this = this;
        this.toastController = toastController;
        this.questionPageChange = new EventEmitter();
        this.testSummaryRequested = new EventEmitter();
        this.isDelegated = false;
        this.showPreviousPageButton = function () { return _this.questionNumber > 1 && !_this.isDelegated; };
        this.showNextPageButton = function () { return _this.questionNumber < 5 && !_this.isDelegated; };
        this.showViewSummaryButton = function () { return _this.questionNumber === 5 || _this.isDelegated; };
        this.goToPreviousQuestion = function () {
            var questionNumber = _this.questionNumber - 1;
            _this.questionPageChange.emit(questionNumber);
        };
        this.goToNextQuestion = function () {
            var questionNumber = _this.questionNumber + 1;
            _this.questionPageChange.emit(questionNumber);
        };
        this.goToSummary = function () {
            if (_this.isDelegated) {
                if (_this.isFormValid()) {
                    _this.testSummaryRequested.emit(true);
                }
                return;
            }
            _this.testSummaryRequested.emit(true);
        };
        this.createToast = function (errorMessage) {
            _this.toast = _this.toastController.create({
                message: errorMessage,
                position: 'top',
                dismissOnPageChange: true,
                cssClass: 'mes-toast-message-error',
                duration: 5000,
                showCloseButton: true,
                closeButtonText: 'X',
            });
        };
    }
    QuestionFooterComponent.prototype.isFormValid = function () {
        var _this = this;
        Object.keys(this.formGroup.controls).forEach(function (controlName) { return _this.formGroup.controls[controlName].markAsDirty(); });
        if (this.formGroup.valid) {
            return true;
        }
        this.createToast('Please select all scores');
        this.toast.present();
        return false;
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], QuestionFooterComponent.prototype, "questionPageChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], QuestionFooterComponent.prototype, "testSummaryRequested", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], QuestionFooterComponent.prototype, "questionNumber", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], QuestionFooterComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], QuestionFooterComponent.prototype, "isDelegated", void 0);
    QuestionFooterComponent = __decorate([
        Component({
            selector: 'question-footer',
            templateUrl: 'question-footer.html',
        }),
        __metadata("design:paramtypes", [ToastController])
    ], QuestionFooterComponent);
    return QuestionFooterComponent;
}());
export { QuestionFooterComponent };
//# sourceMappingURL=question-footer.js.map