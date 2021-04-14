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
import { REKEY_SEARCH_PAGE } from '../../../page-names.constants';
var RekeySearchCardComponent = /** @class */ (function () {
    function RekeySearchCardComponent(navController) {
        var _this = this;
        this.navController = navController;
        this.navigateToRekeySearch = function () {
            _this.navController.push(REKEY_SEARCH_PAGE);
        };
    }
    RekeySearchCardComponent = __decorate([
        Component({
            selector: 'rekey-search-card',
            templateUrl: 'rekey-search-card.html',
        }),
        __metadata("design:paramtypes", [NavController])
    ], RekeySearchCardComponent);
    return RekeySearchCardComponent;
}());
export { RekeySearchCardComponent };
//# sourceMappingURL=rekey-search-card.js.map