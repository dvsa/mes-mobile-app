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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OutcomeBehaviourMapProvider, VisibilityType, } from '../../../../providers/outcome-behaviour-map/outcome-behaviour-map';
var ValidFaultTypes;
(function (ValidFaultTypes) {
    ValidFaultTypes["DRIVING"] = "driving";
    ValidFaultTypes["SERIOUS"] = "serious";
    ValidFaultTypes["DANGEROUS"] = "dangerous";
})(ValidFaultTypes || (ValidFaultTypes = {}));
var FaultCommentComponent = /** @class */ (function () {
    function FaultCommentComponent(outcomeBehaviourProvider) {
        this.outcomeBehaviourProvider = outcomeBehaviourProvider;
        this.isDelegatedTest = false;
        this.faultCommentChange = new EventEmitter();
        this.faultCommentCharsRemaining = null;
    }
    FaultCommentComponent_1 = FaultCommentComponent;
    FaultCommentComponent.prototype.ngOnChanges = function () {
        // mes 2393 - need to remove validations if < 16 faults as comments can
        // only be entered if 16 or more
        if (this.isFieldNotVisible || this.shouldClearDrivingFaultValidators()) {
            this.parentForm.get(this.formControlName).clearValidators();
        }
        else {
            this.parentForm.get(this.formControlName).setValidators([Validators.required, Validators.maxLength(1000)]);
        }
        this.parentForm.get(this.formControlName).patchValue(this.faultComment.comment);
    };
    FaultCommentComponent.prototype.shouldClearDrivingFaultValidators = function () {
        if (this.faultType !== ValidFaultTypes.DRIVING) {
            return false;
        }
        if (!this.shouldRender) {
            return true;
        }
        if (this.faultCount && this.maxFaultCount && this.faultCount <= this.maxFaultCount) {
            return true;
        }
    };
    FaultCommentComponent.prototype.faultCommentChanged = function (newComment) {
        var _a = this.faultComment, comment = _a.comment, commentedCompetencyWithoutComment = __rest(_a, ["comment"]);
        var commentedCompetency = __assign({ comment: newComment }, commentedCompetencyWithoutComment);
        this.faultCommentChange.emit(commentedCompetency);
    };
    FaultCommentComponent.prototype.characterCountChanged = function (charactersRemaining) {
        this.faultCommentCharsRemaining = charactersRemaining;
    };
    FaultCommentComponent.prototype.getCharacterCountText = function () {
        var characterString = Math.abs(this.faultCommentCharsRemaining) === 1 ? 'character' : 'characters';
        var endString = this.faultCommentCharsRemaining < 0 ? 'too many' : 'remaining';
        return "You have " + Math.abs(this.faultCommentCharsRemaining) + " " + characterString + " " + endString;
    };
    FaultCommentComponent.prototype.charactersExceeded = function () {
        return this.faultCommentCharsRemaining < 0;
    };
    Object.defineProperty(FaultCommentComponent.prototype, "invalid", {
        get: function () {
            return !this.parentForm.get(this.formControlName).valid && this.parentForm.get(this.formControlName).dirty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FaultCommentComponent.prototype, "formControlName", {
        get: function () {
            return "faultComment-" + this.faultComment.source + "-" + this.faultType + "-" + this.faultComment.competencyIdentifier;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FaultCommentComponent.prototype, "isFieldNotVisible", {
        get: function () {
            var fieldVisibility = this.outcomeBehaviourProvider.getVisibilityType(this.outcome, FaultCommentComponent_1.fieldName);
            return fieldVisibility === VisibilityType.NotVisible || this.isDelegatedTest;
        },
        enumerable: false,
        configurable: true
    });
    var FaultCommentComponent_1;
    FaultCommentComponent.fieldName = 'faultComment';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FaultCommentComponent.prototype, "parentForm", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], FaultCommentComponent.prototype, "faultComment", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentComponent.prototype, "faultType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultCommentComponent.prototype, "faultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultCommentComponent.prototype, "shouldRender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultCommentComponent.prototype, "maxFaultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultCommentComponent.prototype, "isDelegatedTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentComponent.prototype, "testCategory", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FaultCommentComponent.prototype, "faultCommentChange", void 0);
    FaultCommentComponent = FaultCommentComponent_1 = __decorate([
        Component({
            selector: 'fault-comment',
            templateUrl: 'fault-comment.html',
        }),
        __metadata("design:paramtypes", [OutcomeBehaviourMapProvider])
    ], FaultCommentComponent);
    return FaultCommentComponent;
}());
export { FaultCommentComponent };
//# sourceMappingURL=fault-comment.js.map