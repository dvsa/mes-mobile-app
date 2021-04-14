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
var VehicleChecksDataRowComponent = /** @class */ (function () {
    function VehicleChecksDataRowComponent() {
        this.shouldHaveSeperator = true;
    }
    VehicleChecksDataRowComponent.prototype.shouldShowFault = function (outcome) {
        return outcome === 'DF';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], VehicleChecksDataRowComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], VehicleChecksDataRowComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], VehicleChecksDataRowComponent.prototype, "shouldHaveSeperator", void 0);
    VehicleChecksDataRowComponent = __decorate([
        Component({
            selector: 'vehicle-checks-data-row',
            templateUrl: 'vehicle-checks-data-row.html',
        })
    ], VehicleChecksDataRowComponent);
    return VehicleChecksDataRowComponent;
}());
export { VehicleChecksDataRowComponent };
//# sourceMappingURL=vehicle-checks-data-row.js.map