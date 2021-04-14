var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { startsWith } from 'lodash';
import { end2endPracticeSlotId } from '../../../shared/mocks/test-slot-ids.mock';
import { App } from '../../../app/app.component';
import { CANDIDATE_DETAILS_PAGE, FAKE_CANDIDATE_DETAILS_PAGE } from '../../../pages/page-names.constants';
var CandidateLinkComponent = /** @class */ (function () {
    function CandidateLinkComponent(modalController, app) {
        this.modalController = modalController;
        this.app = app;
    }
    CandidateLinkComponent.prototype.openCandidateDetailsModal = function () {
        var pageToOpen = CANDIDATE_DETAILS_PAGE;
        if (startsWith(this.slot.slotDetail.slotId.toString(), end2endPracticeSlotId)) {
            pageToOpen = FAKE_CANDIDATE_DETAILS_PAGE;
        }
        // Modals are at the same level as the ion-nav so are not getting the zoom level class,
        // this needs to be passed in the create options.
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var profileModal = this.modalController.create(pageToOpen, { slot: this.slot, slotChanged: this.slotChanged }, { cssClass: zoomClass });
        profileModal.present();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CandidateLinkComponent.prototype, "slot", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateLinkComponent.prototype, "slotChanged", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], CandidateLinkComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateLinkComponent.prototype, "testComplete", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], CandidateLinkComponent.prototype, "isPortrait", void 0);
    CandidateLinkComponent = __decorate([
        Component({
            selector: 'candidate-link',
            templateUrl: 'candidate-link.html',
        }),
        __metadata("design:paramtypes", [ModalController, App])
    ], CandidateLinkComponent);
    return CandidateLinkComponent;
}());
export { CandidateLinkComponent };
//# sourceMappingURL=candidate-link.js.map