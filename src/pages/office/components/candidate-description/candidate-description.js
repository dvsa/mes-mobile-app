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
import { CANDIDATE_DESCRIPTION_MAX_LENGTH, CANDIDATE_DESCRIPTION_CONTROL } from './candidate-description.constants';
var CandidateDescriptionComponent = /** @class */ (function () {
    function CandidateDescriptionComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.candidateDescriptionChange = new EventEmitter();
        this.candidateDescriptionCharsRemaining = null;
    }
    CandidateDescriptionComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(CANDIDATE_DESCRIPTION_CONTROL, this.formControl);
        }
        var visibilityType = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, CANDIDATE_DESCRIPTION_CONTROL);
        if (visibilityType === VisibilityType.NotVisible) {
            this.formGroup.get(CANDIDATE_DESCRIPTION_CONTROL).clearValidators();
        }
        else {
            this.formGroup.get(CANDIDATE_DESCRIPTION_CONTROL).setValidators([
                Validators.required, Validators.maxLength(CANDIDATE_DESCRIPTION_MAX_LENGTH)
            ]);
        }
        this.formControl.patchValue(this.candidateDescription);
    };
    CandidateDescriptionComponent.prototype.candidateDescriptionChanged = function (candidateDescription) {
        this.candidateDescriptionChange.emit(candidateDescription);
    };
    CandidateDescriptionComponent.prototype.characterCountChanged = function (charactersRemaining) {
        this.candidateDescriptionCharsRemaining = charactersRemaining;
    };
    CandidateDescriptionComponent.prototype.getCharacterCountText = function () {
        var characterString = Math.abs(this.candidateDescriptionCharsRemaining) === 1 ? 'character' : 'characters';
        var endString = this.candidateDescriptionCharsRemaining < 0 ? 'too many' : 'remaining';
        return "You have " + Math.abs(this.candidateDescriptionCharsRemaining) + " " + characterString + " " + endString;
    };
    CandidateDescriptionComponent.prototype.charactersExceeded = function () {
        return this.candidateDescriptionCharsRemaining < 0;
    };
    Object.defineProperty(CandidateDescriptionComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateDescriptionComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateDescriptionComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], CandidateDescriptionComponent.prototype, "candidateDescription", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], CandidateDescriptionComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], CandidateDescriptionComponent.prototype, "candidateDescriptionChange", void 0);
    CandidateDescriptionComponent = __decorate([
        Component({
            selector: 'candidate-description',
            templateUrl: 'candidate-description.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], CandidateDescriptionComponent);
    return CandidateDescriptionComponent;
}());
export { CandidateDescriptionComponent };
//# sourceMappingURL=candidate-description.js.map