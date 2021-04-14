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
import { ModalEvent } from '../../test-report.constants';
var LegalRequirementsModal = /** @class */ (function () {
    function LegalRequirementsModal(viewCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navParams = navParams;
        this.legalRequirements = this.navParams.get('legalRequirements');
        this.isDelegated = this.navParams.get('isDelegated') === null ? false : this.navParams.get('isDelegated');
    }
    LegalRequirementsModal.prototype.onContinue = function () {
        this.viewCtrl.dismiss(ModalEvent.CONTINUE);
    };
    LegalRequirementsModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    LegalRequirementsModal.prototype.onTerminate = function () {
        this.viewCtrl.dismiss(ModalEvent.TERMINATE);
    };
    LegalRequirementsModal = __decorate([
        IonicPage(),
        Component({
            selector: 'legal-requirements-modal',
            templateUrl: 'legal-requirements-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController,
            NavParams])
    ], LegalRequirementsModal);
    return LegalRequirementsModal;
}());
export { LegalRequirementsModal };
//# sourceMappingURL=legal-requirements-modal.js.map