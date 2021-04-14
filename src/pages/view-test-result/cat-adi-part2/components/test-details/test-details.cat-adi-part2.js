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
import { get } from 'lodash';
var TestDetailsCardCatADI2Component = /** @class */ (function () {
    function TestDetailsCardCatADI2Component() {
    }
    TestDetailsCardCatADI2Component.prototype.specialNeedsIsPopulated = function (specialNeedsArray) {
        return specialNeedsArray.length > 0 && specialNeedsArray[0] !== 'None';
    };
    TestDetailsCardCatADI2Component.prototype.showAttemptNumber = function () {
        return get(this.candidateDetails, 'attemptNumber', null) !== null ||
            typeof get(this.candidateDetails, 'attemptNumber') !== 'undefined';
    };
    TestDetailsCardCatADI2Component.prototype.showPrn = function () {
        return get(this.candidateDetails, 'prn', null) !== null ||
            typeof get(this.candidateDetails, 'prn') !== 'undefined';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestDetailsCardCatADI2Component.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestDetailsCardCatADI2Component.prototype, "candidateDetails", void 0);
    TestDetailsCardCatADI2Component = __decorate([
        Component({
            selector: 'test-details-card-adi2',
            templateUrl: 'test-details.cat-adi-part2.html',
        }),
        __metadata("design:paramtypes", [])
    ], TestDetailsCardCatADI2Component);
    return TestDetailsCardCatADI2Component;
}());
export { TestDetailsCardCatADI2Component };
//# sourceMappingURL=test-details.cat-adi-part2.js.map