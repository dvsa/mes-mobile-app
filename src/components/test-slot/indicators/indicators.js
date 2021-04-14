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
import { TestStatus } from '../../../modules/tests/test-status/test-status.model';
var IndicatorsComponent = /** @class */ (function () {
    function IndicatorsComponent() {
        var _this = this;
        this.shouldShowExclamationIndicator = function () {
            return !_this.shouldShowGreenTickIndicator() && _this.showExclamationIndicator;
        };
        this.shouldShowGreenTickIndicator = function () {
            return _this.testStatus === TestStatus.Submitted;
        };
    }
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], IndicatorsComponent.prototype, "showExclamationIndicator", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], IndicatorsComponent.prototype, "testStatus", void 0);
    IndicatorsComponent = __decorate([
        Component({
            selector: 'indicators',
            templateUrl: 'indicators.html',
        })
    ], IndicatorsComponent);
    return IndicatorsComponent;
}());
export { IndicatorsComponent };
//# sourceMappingURL=indicators.js.map