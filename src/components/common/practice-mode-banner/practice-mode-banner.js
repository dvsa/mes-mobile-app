var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DASHBOARD_PAGE } from '../../../pages/page-names.constants';
var PracticeModeBanner = /** @class */ (function () {
    function PracticeModeBanner(navController) {
        this.navController = navController;
    }
    PracticeModeBanner.prototype.exitPracticeMode = function () {
        var dashboardPage = this.navController.getViews().find(function (view) { return view.id === DASHBOARD_PAGE; });
        this.navController.popTo(dashboardPage, { animate: false });
    };
    PracticeModeBanner = __decorate([
        Component({
            selector: 'practice-mode-banner',
            templateUrl: 'practice-mode-banner.html',
        }),
        __metadata("design:paramtypes", [NavController])
    ], PracticeModeBanner);
    return PracticeModeBanner;
}());
export { PracticeModeBanner };
//# sourceMappingURL=practice-mode-banner.js.map