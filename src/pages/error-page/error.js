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
import { AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { LogoutBasePageComponent } from '../../shared/classes/logout-base-page';
var ErrorPage = /** @class */ (function (_super) {
    __extends(ErrorPage, _super);
    function ErrorPage(platform, navController, alertController, navParams, authenticationProvider) {
        var _this = _super.call(this, platform, navController, authenticationProvider, alertController) || this;
        _this.platform = platform;
        _this.navController = navController;
        _this.alertController = alertController;
        _this.navParams = navParams;
        _this.authenticationProvider = authenticationProvider;
        _this.goBack = function () {
            _this.navController.pop();
        };
        return _this;
    }
    ErrorPage.prototype.ngOnInit = function () {
        this.errorType = this.navParams.get('type');
    };
    ErrorPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-error',
            templateUrl: 'error.html',
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            AlertController,
            NavParams,
            AuthenticationProvider])
    ], ErrorPage);
    return ErrorPage;
}(LogoutBasePageComponent));
export { ErrorPage };
//# sourceMappingURL=error.js.map