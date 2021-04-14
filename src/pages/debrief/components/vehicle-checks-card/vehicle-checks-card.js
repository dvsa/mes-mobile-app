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
var VehicleChecksCardComponent = /** @class */ (function () {
    function VehicleChecksCardComponent() {
        this.questionHasFault = function (result) { return result.outcome !== CompetencyOutcome.P; };
    }
    VehicleChecksCardComponent.prototype.isHomeTest = function () {
        switch (this.category) {
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */: return true;
            default: return false;
        }
    };
    VehicleChecksCardComponent.prototype.ngOnInit = function () {
        this.tellMeShowMeQuestions = this.tellMeShowMeQuestions.filter(function (result) {
            return result.hasOwnProperty('outcome');
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksCardComponent.prototype, "category", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksCardComponent.prototype, "tellMeShowMeQuestions", void 0);
    VehicleChecksCardComponent = __decorate([
        Component({
            selector: 'vehicle-checks-card',
            templateUrl: 'vehicle-checks-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], VehicleChecksCardComponent);
    return VehicleChecksCardComponent;
}());
export { VehicleChecksCardComponent };
//# sourceMappingURL=vehicle-checks-card.js.map