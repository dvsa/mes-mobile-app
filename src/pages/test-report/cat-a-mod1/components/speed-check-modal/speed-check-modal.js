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
import { IonicPage, NavParams, ViewController } from 'ionic-angular';
import { ModalEvent } from '../../../test-report.constants';
var SpeedCheckModal = /** @class */ (function () {
    function SpeedCheckModal(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.speedChecksNeedCompleting = this.navParams.get('speedChecksNeedCompleting');
    }
    SpeedCheckModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    SpeedCheckModal.prototype.onTerminate = function () {
        this.viewCtrl.dismiss(ModalEvent.TERMINATE);
    };
    SpeedCheckModal = __decorate([
        IonicPage(),
        Component({
            selector: 'speed-check-modal',
            templateUrl: 'speed-check-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams])
    ], SpeedCheckModal);
    return SpeedCheckModal;
}());
export { SpeedCheckModal };
//# sourceMappingURL=speed-check-modal.js.map