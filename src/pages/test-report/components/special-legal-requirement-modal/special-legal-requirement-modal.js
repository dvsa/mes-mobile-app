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
import { ModalEvent } from '../../test-report.constants';
var SpecialLegalRequirementModal = /** @class */ (function () {
    function SpecialLegalRequirementModal(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    SpecialLegalRequirementModal.prototype.onCancel = function () {
        this.viewCtrl.dismiss(ModalEvent.CANCEL);
    };
    SpecialLegalRequirementModal.prototype.onTerminate = function () {
        this.viewCtrl.dismiss(ModalEvent.TERMINATE);
    };
    SpecialLegalRequirementModal.prototype.onProceed = function () {
        this.viewCtrl.dismiss(ModalEvent.CONTINUE);
    };
    SpecialLegalRequirementModal = __decorate([
        IonicPage(),
        Component({
            selector: 'special-legal-requirement-modal',
            templateUrl: 'special-legal-requirement-modal.html',
        }),
        __metadata("design:paramtypes", [ViewController])
    ], SpecialLegalRequirementModal);
    return SpecialLegalRequirementModal;
}());
export { SpecialLegalRequirementModal };
//# sourceMappingURL=special-legal-requirement-modal.js.map