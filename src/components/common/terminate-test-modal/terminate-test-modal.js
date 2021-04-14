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
import { IonicPage, NavParams } from 'ionic-angular';
import { DeviceAuthenticationProvider } from '../../../providers/device-authentication/device-authentication';
var TerminateTestModal = /** @class */ (function () {
    function TerminateTestModal(navParams, deviceAuthenticationProvider) {
        this.navParams = navParams;
        this.deviceAuthenticationProvider = deviceAuthenticationProvider;
        this.shouldAuthenticate = true;
        this.onCancel = this.navParams.get('onCancel');
        this.onTerminate = this.navParams.get('onTerminate');
        this.shouldAuthenticate = this.navParams.get('shouldAuthenticate');
    }
    /**
     * Fired when the termination of the test is confirmed.
     * Handles re-authentication and subsequent delegation to the onTerminate callback.
     */
    TerminateTestModal.prototype.terminationWrapper = function () {
        var _this = this;
        if (this.shouldAuthenticate) {
            return this.deviceAuthenticationProvider.triggerLockScreen()
                .then(function () {
                _this.onTerminate();
            }).catch(function (err) { return console.error(err); });
        }
        this.onTerminate();
        return Promise.resolve();
    };
    TerminateTestModal = __decorate([
        IonicPage(),
        Component({
            selector: 'terminate-test-modal',
            templateUrl: 'terminate-test-modal.html',
        }),
        __metadata("design:paramtypes", [NavParams,
            DeviceAuthenticationProvider])
    ], TerminateTestModal);
    return TerminateTestModal;
}());
export { TerminateTestModal };
//# sourceMappingURL=terminate-test-modal.js.map