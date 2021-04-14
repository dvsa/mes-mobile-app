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
import { FAKE_JOURNAL_PAGE } from '../../../page-names.constants';
var PracticeEndToEndCardComponent = /** @class */ (function () {
    function PracticeEndToEndCardComponent(navController) {
        var _this = this;
        this.navController = navController;
        this.navigateToFakeJournal = function () {
            _this.navController.push(FAKE_JOURNAL_PAGE);
        };
    }
    PracticeEndToEndCardComponent = __decorate([
        Component({
            selector: 'practice-end-to-end-card',
            templateUrl: 'practice-end-to-end-card.html',
        }),
        __metadata("design:paramtypes", [NavController])
    ], PracticeEndToEndCardComponent);
    return PracticeEndToEndCardComponent;
}());
export { PracticeEndToEndCardComponent };
//# sourceMappingURL=practice-end-to-end-card.js.map