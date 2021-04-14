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
var SafetyAndBalanceDataRowComponent = /** @class */ (function () {
    function SafetyAndBalanceDataRowComponent() {
        this.shouldHaveSeperator = true;
    }
    SafetyAndBalanceDataRowComponent.prototype.shouldShowFault = function (outcome) {
        return outcome === 'DF';
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], SafetyAndBalanceDataRowComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], SafetyAndBalanceDataRowComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], SafetyAndBalanceDataRowComponent.prototype, "shouldHaveSeperator", void 0);
    SafetyAndBalanceDataRowComponent = __decorate([
        Component({
            selector: 'safety-and-balance-data-row',
            templateUrl: 'safety-and-balance-data-row.html',
        })
    ], SafetyAndBalanceDataRowComponent);
    return SafetyAndBalanceDataRowComponent;
}());
export { SafetyAndBalanceDataRowComponent };
//# sourceMappingURL=safety-and-balance-data-row.js.map