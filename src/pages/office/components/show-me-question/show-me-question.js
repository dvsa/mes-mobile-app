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
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
var ShowMeQuestionComponent = /** @class */ (function () {
    function ShowMeQuestionComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.showMeQuestionChange = new EventEmitter();
    }
    ShowMeQuestionComponent_1 = ShowMeQuestionComponent;
    ShowMeQuestionComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl([]);
            this.formGroup.addControl(ShowMeQuestionComponent_1.fieldName, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, ShowMeQuestionComponent_1.fieldName);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(ShowMeQuestionComponent_1.fieldName).clearValidators();
        }
        else {
            this.formGroup.get(ShowMeQuestionComponent_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.showMeQuestion);
    };
    ShowMeQuestionComponent.prototype.showMeQuestionChanged = function (showMeQuestion) {
        if (this.formControl.valid) {
            this.showMeQuestionChange.emit(showMeQuestion);
        }
    };
    Object.defineProperty(ShowMeQuestionComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var ShowMeQuestionComponent_1;
    ShowMeQuestionComponent.fieldName = 'showMeQuestion';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ShowMeQuestionComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], ShowMeQuestionComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ShowMeQuestionComponent.prototype, "showMeQuestion", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ShowMeQuestionComponent.prototype, "showMeQuestionOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ShowMeQuestionComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ShowMeQuestionComponent.prototype, "showMeQuestionChange", void 0);
    ShowMeQuestionComponent = ShowMeQuestionComponent_1 = __decorate([
        Component({
            selector: 'show-me-question',
            templateUrl: 'show-me-question.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], ShowMeQuestionComponent);
    return ShowMeQuestionComponent;
}());
export { ShowMeQuestionComponent };
//# sourceMappingURL=show-me-question.js.map