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
var FaultsDataRowComponent = /** @class */ (function () {
    function FaultsDataRowComponent() {
        var _this = this;
        this.minDrivingFaultCount = 15;
        this.isRider = false;
        this.displayDrivingFaults = false;
        this.showNoFaultsMessage = function () {
            return _this.drivingFaultCount === 0 &&
                _this.seriousFaults.length === 0 &&
                _this.dangerousFaults.length === 0;
        };
        /**
         * Display driving faults comments if driving faults exceed the minimum specified faults and comments exist
         * OR fault comments exist when no serious/dangerous faults exist
         * @param drivingFault
         */
        this.showFaultComment = function (drivingFault) {
            return _this.drivingFaultCount > _this.minDrivingFaultCount && drivingFault.comment !== undefined;
        };
    }
    FaultsDataRowComponent.prototype.getDriverType = function (isRider) {
        return isRider ? 'riding' : 'driving';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultsDataRowComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FaultsDataRowComponent.prototype, "dangerousFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FaultsDataRowComponent.prototype, "seriousFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], FaultsDataRowComponent.prototype, "drivingFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultsDataRowComponent.prototype, "drivingFaultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], FaultsDataRowComponent.prototype, "minDrivingFaultCount", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultsDataRowComponent.prototype, "isRider", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], FaultsDataRowComponent.prototype, "displayDrivingFaults", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], FaultsDataRowComponent.prototype, "testCategory", void 0);
    FaultsDataRowComponent = __decorate([
        Component({
            selector: 'faults-data-row',
            templateUrl: 'faults-data-row.html',
        })
    ], FaultsDataRowComponent);
    return FaultsDataRowComponent;
}());
export { FaultsDataRowComponent };
//# sourceMappingURL=faults-data-row.js.map