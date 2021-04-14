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
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { ExitRekeyModalEvent } from './exit-rekey-modal.constants';
var ExitRekeyModal = /** @class */ (function () {
    function ExitRekeyModal(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
    }
    ExitRekeyModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ExitRekeyModalEvent.CANCEL);
    };
    ExitRekeyModal.prototype.onExitRekey = function () {
        this.viewCtrl.dismiss(ExitRekeyModalEvent.EXIT_REKEY);
    };
    ExitRekeyModal = __decorate([
        IonicPage(),
        Component({
            selector: 'exit-rekey-modal',
            templateUrl: 'exit-rekey-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams])
    ], ExitRekeyModal);
    return ExitRekeyModal;
}());
export { ExitRekeyModal };
//# sourceMappingURL=exit-rekey-modal.js.map