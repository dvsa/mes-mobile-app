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
import { App } from 'ionic-angular';
/**
 * Ionic will not allow the navigation controller to be injected at the root
 * level, so this alternative approach gets the nav from the app.
 *
 * This provider allows the navigation controller to be mocked during testing.
 */
var NavigationProvider = /** @class */ (function () {
    function NavigationProvider(app) {
        var _this = this;
        this.app = app;
        this.getNav = function () { return _this.app.getRootNavs()[0]; };
        this.getActive = function () { return _this.getNav().getActive(); };
    }
    NavigationProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [App])
    ], NavigationProvider);
    return NavigationProvider;
}());
export { NavigationProvider };
//# sourceMappingURL=navigation.js.map