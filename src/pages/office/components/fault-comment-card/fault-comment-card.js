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
var FaultCommentCardComponent = /** @class */ (function () {
    function FaultCommentCardComponent() {
        this.isDelegatedTest = false;
        this.faultCommentsChange = new EventEmitter();
    }
    FaultCommentCardComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.faultComments.forEach(function (value) {
            var control = new FormControl(null);
            _this.formGroup.addControl("faultComment-" + value.source + "-" + _this.faultType + "-" + value.competencyIdentifier, control);
        });
    };
    FaultCommentCardComponent.prototype.faultCommentChanged = function (faultComment) {
        this.faultCommentsChange.emit(faultComment);
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentCardComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], FaultCommentCardComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FaultCommentCardComponent.prototype, "faultComments", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentCardComponent.prototype, "header", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentCardComponent.prototype, "faultType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultCommentCardComponent.prototype, "shouldRender", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultCommentCardComponent.prototype, "faultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultCommentCardComponent.prototype, "maxFaultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultCommentCardComponent.prototype, "isDelegatedTest", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultCommentCardComponent.prototype, "testCategory", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], FaultCommentCardComponent.prototype, "faultCommentsChange", void 0);
    FaultCommentCardComponent = __decorate([
        Component({
            selector: 'fault-comment-card',
            templateUrl: 'fault-comment-card.html',
        })
    ], FaultCommentCardComponent);
    return FaultCommentCardComponent;
}());
export { FaultCommentCardComponent };
//# sourceMappingURL=fault-comment-card.js.map