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
import { getDrivingOrRidingLabel } from '../../../../shared/helpers/driver-type';
var DrivingFaultsDebriefCardComponent = /** @class */ (function () {
    function DrivingFaultsDebriefCardComponent() {
    }
    DrivingFaultsDebriefCardComponent.prototype.drivingFaultsCardDescriptionSwitch = function (testCategory) {
        return "debrief." + getDrivingOrRidingLabel(testCategory) + "FaultsCardDescription";
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], DrivingFaultsDebriefCardComponent.prototype, "drivingFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], DrivingFaultsDebriefCardComponent.prototype, "drivingFaultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], DrivingFaultsDebriefCardComponent.prototype, "testCategory", void 0);
    DrivingFaultsDebriefCardComponent = __decorate([
        Component({
            selector: 'driving-faults-debrief-card',
            templateUrl: 'driving-faults-debrief-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], DrivingFaultsDebriefCardComponent);
    return DrivingFaultsDebriefCardComponent;
}());
export { DrivingFaultsDebriefCardComponent };
//# sourceMappingURL=driving-faults-debrief-card.js.map