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
var AdditionalInformationComponent = /** @class */ (function () {
    function AdditionalInformationComponent() {
        this.additionalInformationChange = new EventEmitter();
    }
    AdditionalInformationComponent_1 = AdditionalInformationComponent;
    AdditionalInformationComponent.prototype.ngOnChanges = function () {
        if (!this.formControl) {
            this.formControl = new FormControl(null);
            this.formGroup.addControl(AdditionalInformationComponent_1.fieldName, this.formControl);
        }
        this.formControl.patchValue(this.additionalInformation);
    };
    AdditionalInformationComponent.prototype.additionalInformationChanged = function (additionalInformation) {
        this.additionalInformationChange.emit(additionalInformation);
    };
    var AdditionalInformationComponent_1;
    AdditionalInformationComponent.fieldName = 'additionalInformation';
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdditionalInformationComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdditionalInformationComponent.prototype, "outcome", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdditionalInformationComponent.prototype, "additionalInformation", void 0);
    __decorate([
        Input(),
        __metadata("design:type", FormGroup)
    ], AdditionalInformationComponent.prototype, "formGroup", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], AdditionalInformationComponent.prototype, "additionalInformationChange", void 0);
    AdditionalInformationComponent = AdditionalInformationComponent_1 = __decorate([
        Component({
            selector: 'additional-information',
            templateUrl: 'additional-information.html',
        })
    ], AdditionalInformationComponent);
    return AdditionalInformationComponent;
}());
export { AdditionalInformationComponent };
//# sourceMappingURL=additional-information.js.map