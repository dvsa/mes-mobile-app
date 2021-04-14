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
import { legalRequirementLabels } from './legal-requirement.constants';
var LegalRequirementComponent = /** @class */ (function () {
    function LegalRequirementComponent(store$) {
        var _this = this;
        this.store$ = store$;
        this.disabled = false;
        this.getLabel = function () { return legalRequirementLabels[_this.legalRequirement]; };
        this.toggleLegalRequirement = function () {
            _this.store$.dispatch(new ToggleLegalRequirement(_this.legalRequirement));
        };
    }
    /**
     * Function to check if a legal requirement should use the normal-start-label class
     */
    LegalRequirementComponent.prototype.getLegalRequirementClass = function () {
        var cssClass = 'label';
        if (this.legalRequirement.indexOf('normalStart') >= 0) {
            cssClass = 'normal-start-label';
        }
        return cssClass;
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], LegalRequirementComponent.prototype, "legalRequirement", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LegalRequirementComponent.prototype, "ticked", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LegalRequirementComponent.prototype, "disabled", void 0);
    LegalRequirementComponent = __decorate([
        Component({
            selector: 'legal-requirement',
            templateUrl: 'legal-requirement.html',
        }),
        __metadata("design:paramtypes", [Store])
    ], LegalRequirementComponent);
    return LegalRequirementComponent;
}());
export { LegalRequirementComponent };
//# sourceMappingURL=legal-requirement.js.map