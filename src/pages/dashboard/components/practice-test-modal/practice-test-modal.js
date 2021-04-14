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
import { ModalEvent } from './practice-test-modal.constants';
var PracticeTestModal = /** @class */ (function () {
    function PracticeTestModal(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    PracticeTestModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    PracticeTestModal.prototype.onNoFault = function () {
        this.viewCtrl.dismiss(ModalEvent.NO_FAULT);
    };
    PracticeTestModal.prototype.onFault = function () {
        this.viewCtrl.dismiss(ModalEvent.FAULT);
    };
    PracticeTestModal = __decorate([
        IonicPage(),
        Component({
            selector: 'practice-test-modal',
            templateUrl: 'practice-test-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController])
    ], PracticeTestModal);
    return PracticeTestModal;
}());
export { PracticeTestModal };
//# sourceMappingURL=practice-test-modal.js.map