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
var SpeedCardComponent = /** @class */ (function () {
    function SpeedCardComponent() {
    }
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SpeedCardComponent.prototype, "emergencyStop", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SpeedCardComponent.prototype, "avoidance", void 0);
    SpeedCardComponent = __decorate([
        Component({
            selector: 'speed-card',
            templateUrl: 'speed-card.html',
        })
    ], SpeedCardComponent);
    return SpeedCardComponent;
}());
export { SpeedCardComponent };
//# sourceMappingURL=speed-card.js.map