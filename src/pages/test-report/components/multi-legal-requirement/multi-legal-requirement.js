var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToggleLegalRequirement, } from '../../../../modules/tests/test-data/common/test-requirements/test-requirements.actions';
import { LegalRequirements } from '../../../../modules/tests/test-data/test-data.constants';
var MultiLegalRequirementComponent = /** @class */ (function () {
    function MultiLegalRequirementComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.disabled = false;
        this.getLabel = function () { return _this.label; };
        this.toggleLegalRequirement = function () {
            if (_this.disabled) {
                return;
            }
            if (!_this.requirement1Ticked && !_this.requirement2Ticked) {
                _this.store$.dispatch(new ToggleLegalRequirement(_this.legalRequirement1));
            }
            if (_this.requirement1Ticked && !_this.requirement2Ticked) {
                _this.store$.dispatch(new ToggleLegalRequirement(_this.legalRequirement2));
            }
            if (_this.requirement1Ticked && _this.requirement2Ticked) {
                _this.store$.dispatch(new ToggleLegalRequirement(_this.legalRequirement1));
                _this.store$.dispatch(new ToggleLegalRequirement(_this.legalRequirement2));
            }
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiLegalRequirementComponent.prototype, "legalRequirement1", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiLegalRequirementComponent.prototype, "legalRequirement2", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiLegalRequirementComponent.prototype, "requirement1Ticked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiLegalRequirementComponent.prototype, "requirement2Ticked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], MultiLegalRequirementComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], MultiLegalRequirementComponent.prototype, "disabled", void 0);
    MultiLegalRequirementComponent = __decorate([
        Component({
            selector: 'multi-legal-requirement',
            templateUrl: 'multi-legal-requirement.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], MultiLegalRequirementComponent);
    return MultiLegalRequirementComponent;
}());
export { MultiLegalRequirementComponent };
//# sourceMappingURL=multi-legal-requirement.js.map