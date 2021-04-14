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
var TestDetailsCardComponent = /** @class */ (function () {
    function TestDetailsCardComponent() {
    }
    TestDetailsCardComponent.prototype.specialNeedsIsPopulated = function (specialNeedsArray) {
        return specialNeedsArray.length > 0 && specialNeedsArray[0] !== 'None';
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TestDetailsCardComponent.prototype, "data", void 0);
    TestDetailsCardComponent = __decorate([
        Component({
            selector: 'test-details-card',
            templateUrl: 'test-details-card.html',
        }),
        __metadata("design:paramtypes", [])
    ], TestDetailsCardComponent);
    return TestDetailsCardComponent;
}());
export { TestDetailsCardComponent };
//# sourceMappingURL=test-details-card.js.map