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
import { ModalController, NavController } from 'ionic-angular';
import { CAT_BE, CAT_B, CAT_C, CAT_D, CAT_A_MOD1, CAT_A_MOD2, CAT_HOME_TEST, CAT_CPC, CAT_ADI_PART2, } from '../../../pages/page-names.constants';
var EndTestLinkComponent = /** @class */ (function () {
    function EndTestLinkComponent(modalController, navController) {
        var _this = this;
        this.modalController = modalController;
        this.navController = navController;
        this.shouldAuthenticate = true;
        this.isDelegated = false;
        this.onCancel = function () {
            _this.terminateTestModal.dismiss();
        };
        this.onTerminate = function () {
            _this.terminateTestModal.dismiss();
            if (_this.isDelegated) {
                _this.navigateToOfficePage();
                return;
            }
            switch (_this.category) {
                case "ADI2" /* ADI2 */:
                    _this.navController.push(CAT_ADI_PART2.DEBRIEF_PAGE);
                    break;
                case "B" /* B */:
                    _this.navController.push(CAT_B.DEBRIEF_PAGE);
                    break;
                case "B+E" /* BE */:
                    _this.navController.push(CAT_BE.DEBRIEF_PAGE);
                    break;
                case "C" /* C */:
                    _this.navController.push(CAT_C.DEBRIEF_PAGE);
                    break;
                case "CCPC" /* CCPC */:
                case "DCPC" /* DCPC */:
                    _this.navController.push(CAT_CPC.DEBRIEF_PAGE);
                    break;
                case "D" /* D */:
                    _this.navController.push(CAT_D.DEBRIEF_PAGE);
                    break;
                case "F" /* F */:
                case "G" /* G */:
                case "H" /* H */:
                case "K" /* K */:
                    _this.navController.push(CAT_HOME_TEST.DEBRIEF_PAGE);
                    break;
                case "EUA1M1" /* EUA1M1 */:
                case "EUA2M1" /* EUA2M1 */:
                case "EUAM1" /* EUAM1 */:
                case "EUAMM1" /* EUAMM1 */:
                    _this.navController.push(CAT_A_MOD1.DEBRIEF_PAGE);
                    break;
                case "EUA1M2" /* EUA1M2 */:
                case "EUA2M2" /* EUA2M2 */:
                case "EUAM2" /* EUAM2 */:
                case "EUAMM2" /* EUAMM2 */:
                    _this.navController.push(CAT_A_MOD2.DEBRIEF_PAGE);
                    break;
            }
        };
        this.navigateToOfficePage = function () {
            switch (_this.category) {
                case "B+E" /* BE */:
                    _this.navController.push(CAT_BE.OFFICE_PAGE);
                    break;
                case "C" /* C */:
                    _this.navController.push(CAT_C.OFFICE_PAGE);
                    break;
                case "CCPC" /* CCPC */:
                case "DCPC" /* DCPC */:
                    _this.navController.push(CAT_CPC.OFFICE_PAGE);
                    break;
                case "D" /* D */:
                    _this.navController.push(CAT_D.OFFICE_PAGE);
                    break;
            }
        };
    }
    EndTestLinkComponent.prototype.openEndTestModal = function () {
        this.terminateTestModal = this.modalController.create('TerminateTestModal', {
            onCancel: this.onCancel,
            onTerminate: this.onTerminate,
            shouldAuthenticate: this.shouldAuthenticate,
        }, { cssClass: 'mes-modal-alert text-zoom-regular' });
        this.terminateTestModal.present();
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], EndTestLinkComponent.prototype, "category", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EndTestLinkComponent.prototype, "shouldAuthenticate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], EndTestLinkComponent.prototype, "isDelegated", void 0);
    EndTestLinkComponent = __decorate([
        Component({
            selector: 'end-test-link',
            templateUrl: 'end-test-link.html',
        }),
        __metadata("design:paramtypes", [ModalController,
            NavController])
    ], EndTestLinkComponent);
    return EndTestLinkComponent;
}());
export { EndTestLinkComponent };
//# sourceMappingURL=end-test-link.js.map