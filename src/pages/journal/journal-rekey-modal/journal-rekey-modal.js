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
import { IonicPage, ViewController } from 'ionic-angular';
import { ModalEvent } from './journal-rekey-modal.constants';
var JournalRekeyModal = /** @class */ (function () {
    function JournalRekeyModal(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    JournalRekeyModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    JournalRekeyModal.prototype.onStartTest = function () {
        this.viewCtrl.dismiss(ModalEvent.START);
    };
    JournalRekeyModal.prototype.onRekeyTest = function () {
        this.viewCtrl.dismiss(ModalEvent.REKEY);
    };
    JournalRekeyModal = __decorate([
        IonicPage(),
        Component({
            selector: 'journal-rekey-modal',
            templateUrl: 'journal-rekey-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController])
    ], JournalRekeyModal);
    return JournalRekeyModal;
}());
export { JournalRekeyModal };
//# sourceMappingURL=journal-rekey-modal.js.map