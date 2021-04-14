var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
var ActivityCodeComponent = /** @class */ (function () {
    function ActivityCodeComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.activityCodeChange = new EventEmitter();
    }
    ActivityCodeComponent_1 = ActivityCodeComponent;
    ActivityCodeComponent.prototype.ngAfterViewChecked = function () {
        this.changeDetectorRef.detectChanges();
    };
    ActivityCodeComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl({ disabled: true }, [Validators.required]);
            this.formGroup.addControl(ActivityCodeComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.activityCodeModel);
    };
    ActivityCodeComponent.prototype.activityCodeChanged = function (activityCode) {
        if (this.formControl.valid) {
            this.activityCodeChange.emit(activityCode);
        }
    };
    Object.defineProperty(ActivityCodeComponent.prototype, "invalid", {
        get: function () {
            return !this.formControl.valid && this.formControl.dirty;
        },
        enumerable: false,
        configurable: true
    });
    ActivityCodeComponent.prototype.isSelectDisabled = function () {
        return this.disabled || (this.activityCodeModel && parseInt(this.activityCodeModel.activityCode, 10) < 4);
    };
    ActivityCodeComponent.prototype.isOptionDisabled = function (activityCode) {
        if (parseInt(activityCode, 10) < 4) {
            return true;
        }
        return false;
    };
    var ActivityCodeComponent_1;
    ActivityCodeComponent.fieldName = 'activityCode';
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ActivityCodeComponent.prototype, "activityCodeModel", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], ActivityCodeComponent.prototype, "activityCodeOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], ActivityCodeComponent.prototype, "formGroup", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], ActivityCodeComponent.prototype, "disabled", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], ActivityCodeComponent.prototype, "activityCodeChange", void 0);
    ActivityCodeComponent = ActivityCodeComponent_1 = __decorate([
        Component({
            selector: 'activity-code',
            templateUrl: 'activity-code.html',
        }),
        __metadata("design:paramtypes", [ChangeDetectorRef])
    ], ActivityCodeComponent);
    return ActivityCodeComponent;
}());
export { ActivityCodeComponent };
//# sourceMappingURL=activity-code.js.map