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
import { BasePageComponent } from './base-page';
var LogoutBasePageComponent = /** @class */ (function (_super) {
    __extends(LogoutBasePageComponent, _super);
    function LogoutBasePageComponent(platform, navController, authenticationProvider, alertController, loginRequired) {
        if (loginRequired === void 0) { loginRequired = true; }
        var _this = _super.call(this, platform, navController, authenticationProvider, loginRequired) || this;
        _this.platform = platform;
        _this.navController = navController;
        _this.authenticationProvider = authenticationProvider;
        _this.alertController = alertController;
        _this.loginRequired = loginRequired;
        return _this;
    }
    LogoutBasePageComponent.prototype.openLogoutModal = function () {
        var _this = this;
        var alert = this.alertController.create({
            title: 'Are you sure you want to logout?',
            cssClass: 'logout-modal',
            buttons: [
                {
                    text: 'Cancel',
                    handler: function () { },
                },
                {
                    text: 'Logout',
                    handler: function () { return _this.logout(); },
                },
            ],
        });
        alert.present();
    };
    return LogoutBasePageComponent;
}(BasePageComponent));
export { LogoutBasePageComponent };
//# sourceMappingURL=logout-base-page.js.map