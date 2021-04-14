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
import { CompetencyOutcome } from '../../../../shared/models/competency-outcome';
var VehicleChecksOfficeCardComponent = /** @class */ (function () {
    function VehicleChecksOfficeCardComponent() {
        this.questionHasFault = function (result) { return result.outcome !== CompetencyOutcome.P; };
    }
    VehicleChecksOfficeCardComponent.prototype.ngOnInit = function () {
        this.checks = this.checks.filter(function (result) {
            return result.hasOwnProperty('outcome');
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksOfficeCardComponent.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksOfficeCardComponent.prototype, "checks", void 0);
    VehicleChecksOfficeCardComponent = __decorate([
        Component({
            selector: 'vehicle-checks-office-card',
            templateUrl: 'vehicle-checks-office-card.html',
        })
    ], VehicleChecksOfficeCardComponent);
    return VehicleChecksOfficeCardComponent;
}());
export { VehicleChecksOfficeCardComponent };
//# sourceMappingURL=vehicle-checks-office-card.js.map