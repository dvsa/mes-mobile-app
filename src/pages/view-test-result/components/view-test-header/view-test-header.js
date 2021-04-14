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
import { ActivityCodes } from '../../../../shared/models/activity-codes';
var ViewTestHeaderComponent = /** @class */ (function () {
    function ViewTestHeaderComponent() {
    }
    ViewTestHeaderComponent.prototype.isPassed = function () {
        return this.data.activityCode === ActivityCodes.PASS;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ViewTestHeaderComponent.prototype, "data", void 0);
    ViewTestHeaderComponent = __decorate([
        Component({
            selector: 'view-test-header',
            templateUrl: 'view-test-header.html',
        }),
        __metadata("design:paramtypes", [])
    ], ViewTestHeaderComponent);
    return ViewTestHeaderComponent;
}());
export { ViewTestHeaderComponent };
//# sourceMappingURL=view-test-header.js.map