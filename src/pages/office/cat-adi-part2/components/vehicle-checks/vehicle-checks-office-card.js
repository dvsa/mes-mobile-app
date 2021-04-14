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
import { CompetencyOutcome } from '../../../../../shared/models/competency-outcome';
var VehicleChecksOfficeCardCatADI2Component = /** @class */ (function () {
    function VehicleChecksOfficeCardCatADI2Component() {
        this.questionHasFault = function (result) { return result.outcome !== CompetencyOutcome.P; };
    }
    VehicleChecksOfficeCardCatADI2Component.prototype.ngOnInit = function () {
        this.checks = this.checks.filter(function (result) {
            return result.hasOwnProperty('outcome');
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksOfficeCardCatADI2Component.prototype, "display", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksOfficeCardCatADI2Component.prototype, "checks", void 0);
    VehicleChecksOfficeCardCatADI2Component = __decorate([
        Component({
            selector: 'vehicle-checks-office-card-cat-adi2',
            templateUrl: 'vehicle-checks-office-card.html',
        })
    ], VehicleChecksOfficeCardCatADI2Component);
    return VehicleChecksOfficeCardCatADI2Component;
}());
export { VehicleChecksOfficeCardCatADI2Component };
//# sourceMappingURL=vehicle-checks-office-card.js.map