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
import { UploadRekeyModalEvent } from './upload-rekey-modal.constants';
var UploadRekeyModal = /** @class */ (function () {
    function UploadRekeyModal(viewCtrl, params) {
        this.viewCtrl = viewCtrl;
        this.params = params;
        this.retryMode = false;
        this.retryMode = params.get('retryMode');
    }
    UploadRekeyModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(UploadRekeyModalEvent.CANCEL);
    };
    UploadRekeyModal.prototype.onUpload = function () {
        this.viewCtrl.dismiss(UploadRekeyModalEvent.UPLOAD);
    };
    UploadRekeyModal = __decorate([
        IonicPage(),
        Component({
            selector: 'upload-rekey-modal',
            templateUrl: 'upload-rekey-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams])
    ], UploadRekeyModal);
    return UploadRekeyModal;
}());
export { UploadRekeyModal };
//# sourceMappingURL=upload-rekey-modal.js.map