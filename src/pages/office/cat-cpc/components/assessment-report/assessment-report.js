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
var AssessmentReportComponent = /** @class */ (function () {
    function AssessmentReportComponent() {
        this.assessmentReportChange = new EventEmitter();
    }
    AssessmentReportComponent_1 = AssessmentReportComponent;
    AssessmentReportComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(AssessmentReportComponent_1.fieldName, this.formControl);
            this.formGroup.get(AssessmentReportComponent_1.fieldName).setValidators([Validators.required]);
        }
        this.formControl.patchValue(this.assessmentReport);
    };
    AssessmentReportComponent.prototype.assessmentReportChanged = function (assessmentReport) {
        this.assessmentReportChange.emit(assessmentReport);
    };
    Object.defineProperty(AssessmentReportComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    var AssessmentReportComponent_1;
    AssessmentReportComponent.fieldName = 'assessmentReport';
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AssessmentReportComponent.prototype, "assessmentReport", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], AssessmentReportComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AssessmentReportComponent.prototype, "assessmentReportChange", void 0);
    AssessmentReportComponent = AssessmentReportComponent_1 = __decorate([
        Component({
            selector: 'assessment-report',
            templateUrl: 'assessment-report.html',
        })
    ], AssessmentReportComponent);
    return AssessmentReportComponent;
}());
export { AssessmentReportComponent };
//# sourceMappingURL=assessment-report.js.map