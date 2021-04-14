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
import { ScreenOrientation } from '@ionic-native/screen-orientation';
var EmptySlotComponent = /** @class */ (function () {
    function EmptySlotComponent(screenOrientation) {
        this.screenOrientation = screenOrientation;
    }
    EmptySlotComponent.prototype.isPortrait = function () {
        return this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY ||
            this.screenOrientation.type === this.screenOrientation.ORIENTATIONS.PORTRAIT;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], EmptySlotComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EmptySlotComponent.prototype, "hasSlotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EmptySlotComponent.prototype, "showLocation", void 0);
    EmptySlotComponent = __decorate([
        Component({
            selector: 'empty-slot',
            templateUrl: 'empty-slot.html',
        }),
        __metadata("design:paramtypes", [ScreenOrientation])
    ], EmptySlotComponent);
    return EmptySlotComponent;
}());
export { EmptySlotComponent };
//# sourceMappingURL=empty-slot.js.map