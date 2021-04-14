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
var IpadIssueComponent = /** @class */ (function () {
    function IpadIssueComponent() {
        this.selectedChange = new EventEmitter();
        this.technicalFaultChange = new EventEmitter();
        this.lostChange = new EventEmitter();
        this.stolenChange = new EventEmitter();
        this.brokenChange = new EventEmitter();
    }
    IpadIssueComponent_1 = IpadIssueComponent;
    IpadIssueComponent.prototype.ngOnChanges = function () {
        if (!this.checkBoxFormControl) {
            this.checkBoxFormControl = new FormControl(null);
            this.formGroup.addControl(IpadIssueComponent_1.checkBoxCtrl, this.checkBoxFormControl);
        }
        if (!this.technicalFaultFormControl) {
            this.technicalFaultFormControl = new FormControl(null);
            this.formGroup.addControl(IpadIssueComponent_1.technicalFaultCtrl, this.technicalFaultFormControl);
        }
        if (!this.lostFormControl) {
            this.lostFormControl = new FormControl(null);
            this.formGroup.addControl(IpadIssueComponent_1.lostCtrl, this.lostFormControl);
        }
        if (!this.stolenFormControl) {
            this.stolenFormControl = new FormControl(null);
            this.formGroup.addControl(IpadIssueComponent_1.stolenCtrl, this.stolenFormControl);
        }
        if (!this.brokenFormControl) {
            this.brokenFormControl = new FormControl(null);
            this.formGroup.addControl(IpadIssueComponent_1.brokenCtrl, this.brokenFormControl);
        }
        this.checkBoxFormControl.patchValue(this.selected ? true : false);
        this.technicalFaultFormControl.patchValue(this.technicalFault);
        this.lostFormControl.patchValue(this.lost);
        this.stolenFormControl.patchValue(this.stolen);
        this.brokenFormControl.patchValue(this.broken);
    };
    IpadIssueComponent.prototype.selectedValueChanged = function (selected) {
        if (!selected) {
            this.formGroup.get(IpadIssueComponent_1.technicalFaultCtrl).reset();
            this.formGroup.get(IpadIssueComponent_1.lostCtrl).reset();
            this.formGroup.get(IpadIssueComponent_1.stolenCtrl).reset();
            this.formGroup.get(IpadIssueComponent_1.brokenCtrl).reset();
        }
        this.selectedChange.emit(selected);
    };
    IpadIssueComponent.prototype.technicalFaultSelected = function () {
        this.technicalFaultChange.emit(true);
    };
    IpadIssueComponent.prototype.lostSelected = function () {
        this.lostChange.emit(true);
    };
    IpadIssueComponent.prototype.stolenSelected = function () {
        this.stolenChange.emit(true);
    };
    IpadIssueComponent.prototype.brokenSelected = function () {
        this.brokenChange.emit(true);
    };
    var IpadIssueComponent_1;
    IpadIssueComponent.checkBoxCtrl = 'ipadIssueSelected';
    IpadIssueComponent.technicalFaultCtrl = 'ipadIssueTechnicalFault';
    IpadIssueComponent.lostCtrl = 'ipadIssueLost';
    IpadIssueComponent.stolenCtrl = 'ipadIssueStolen';
    IpadIssueComponent.brokenCtrl = 'ipadIssueBroken';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IpadIssueComponent.prototype, "selected", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IpadIssueComponent.prototype, "technicalFault", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IpadIssueComponent.prototype, "lost", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IpadIssueComponent.prototype, "stolen", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IpadIssueComponent.prototype, "broken", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], IpadIssueComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IpadIssueComponent.prototype, "selectedChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IpadIssueComponent.prototype, "technicalFaultChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IpadIssueComponent.prototype, "lostChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IpadIssueComponent.prototype, "stolenChange", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], IpadIssueComponent.prototype, "brokenChange", void 0);
    IpadIssueComponent = IpadIssueComponent_1 = __decorate([
        Component({
            selector: 'ipad-issue',
            templateUrl: 'ipad-issue.html',
        })
    ], IpadIssueComponent);
    return IpadIssueComponent;
}());
export { IpadIssueComponent };
//# sourceMappingURL=ipad-issue.js.map