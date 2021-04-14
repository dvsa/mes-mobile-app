var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { IonicPage, NavController, Platform } from 'ionic-angular';
import { PracticeableBasePageComponent } from '../../../shared/classes/practiceable-base-page';
import { AuthenticationProvider } from '../../../providers/authentication/authentication';
import { Store } from '@ngrx/store';
import { PostDebriefHoldingViewDidEnter } from '../post-debrief-holding.actions';
var PostDebriefHoldingCatBPage = /** @class */ (function (_super) {
    __extends(PostDebriefHoldingCatBPage, _super);
    function PostDebriefHoldingCatBPage(store$, navController, platform, authenticationProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, store$) || this;
        _this.platform = platform;
        _this.authenticationProvider = authenticationProvider;
        return _this;
    }
    PostDebriefHoldingCatBPage.prototype.ionViewDidEnter = function () {
        this.store$.dispatch(new PostDebriefHoldingViewDidEnter());
    };
    PostDebriefHoldingCatBPage = __decorate([
        IonicPage(),
        Component({
            selector: '.post-debrief-holding-cat-b-page',
            templateUrl: 'post-debrief-holding.cat-b.page.html',
        }),
        __metadata("design:paramtypes", [Store,
            NavController,
            Platform,
            AuthenticationProvider])
    ], PostDebriefHoldingCatBPage);
    return PostDebriefHoldingCatBPage;
}(PracticeableBasePageComponent));
export { PostDebriefHoldingCatBPage };
//# sourceMappingURL=post-debrief-holding.cat-b.page.js.map