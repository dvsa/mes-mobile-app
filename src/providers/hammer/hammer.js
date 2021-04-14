var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import * as hammerjs from 'hammerjs';
var HammerProvider = /** @class */ (function () {
    function HammerProvider() {
        var _this = this;
        this.pressTime = 300;
        this.init = function (element) {
            _this.hammerManager = new hammerjs.Manager(element.nativeElement);
        };
        this.addPressAndHoldEvent = function (action) {
            _this.hammerManager.add(new hammerjs.Press({
                event: 'pressAndHold',
                time: _this.pressTime,
            }));
            _this.hammerManager.on('pressAndHold', function () { return action(); });
        };
        this.addPressEvent = function (action) {
            _this.hammerManager.add(new hammerjs.Press({
                event: 'press',
                time: 1,
            }));
            _this.hammerManager.on('press', function () { return action(); });
        };
    }
    HammerProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], HammerProvider);
    return HammerProvider;
}());
export { HammerProvider };
//# sourceMappingURL=hammer.js.map