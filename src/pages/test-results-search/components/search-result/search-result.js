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
import { DateTime } from '../../../../shared/helpers/date-time';
import { ModalController } from 'ionic-angular';
import { CAT_A_MOD1, CAT_A_MOD2, CAT_ADI_PART2, CAT_B, CAT_BE, CAT_C, CAT_D, CAT_HOME_TEST, CAT_CPC, } from '../../../page-names.constants';
import { App } from '../../../../app/app.component';
import moment from 'moment';
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(modalController, app) {
        this.modalController = modalController;
        this.app = app;
    }
    SearchResultComponent.prototype.getDate = function () {
        return new DateTime(this.searchResult.testDate).format('DD/MM/YYYY');
    };
    SearchResultComponent.prototype.getTime = function () {
        return moment(this.searchResult.testDate).format('HH:mm');
    };
    SearchResultComponent.prototype.getName = function () {
        var name = this.searchResult.candidateName;
        return name.title ? name.title + " " + name.firstName + " " + name.lastName : name.firstName + " " + name.lastName;
    };
    SearchResultComponent.prototype.openTestResult = function () {
        // Modals are at the same level as the ion-nav so are not getting the zoom level class,
        // this needs to be passed in the create options.
        var pageToOpen = '';
        switch (this.searchResult.category) {
            case "B" /* B */:
                pageToOpen = CAT_B.VIEW_TEST_RESULT_PAGE;
                break;
            case "B+E" /* BE */:
                pageToOpen = CAT_BE.VIEW_TEST_RESULT_PAGE;
                break;
            case "C" /* C */:
            case "C+E" /* CE */:
            case "C1" /* C1 */:
            case "C1+E" /* C1E */:
                pageToOpen = CAT_C.VIEW_TEST_RESULT_PAGE;
                break;
            case "EUAM1" /* EUAM1 */:
            case "EUA1M1" /* EUA1M1 */:
            case "EUA2M1" /* EUA2M1 */:
            case "EUAMM1" /* EUAMM1 */:
                pageToOpen = CAT_A_MOD1.VIEW_TEST_RESULT_PAGE;
                break;
            case "EUAM2" /* EUAM2 */:
            case "EUA1M2" /* EUA1M2 */:
            case "EUA2M2" /* EUA2M2 */:
            case "EUAMM2" /* EUAMM2 */:
                pageToOpen = CAT_A_MOD2.VIEW_TEST_RESULT_PAGE;
                break;
            case "D" /* D */:
            case "D+E" /* DE */:
            case "D1" /* D1 */:
            case "D1+E" /* D1E */:
                pageToOpen = CAT_D.VIEW_TEST_RESULT_PAGE;
                break;
            case "F" /* F */:
            case "G" /* G */:
            case "H" /* H */:
            case "K" /* K */:
                pageToOpen = CAT_HOME_TEST.VIEW_TEST_RESULT_PAGE;
                break;
            case "ADI2" /* ADI2 */:
                pageToOpen = CAT_ADI_PART2.VIEW_TEST_RESULT_PAGE;
                break;
            case "CCPC" /* CCPC */:
            case "DCPC" /* DCPC */:
                pageToOpen = CAT_CPC.VIEW_TEST_RESULT_PAGE;
                break;
        }
        var zoomClass = "modal-fullscreen " + this.app.getTextZoomClass();
        var testResultModal = this.modalController.create(pageToOpen, { applicationReference: this.searchResult.applicationReference }, { cssClass: zoomClass });
        testResultModal.present();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SearchResultComponent.prototype, "searchResult", void 0);
    SearchResultComponent = __decorate([
        Component({
            selector: 'search-result',
            templateUrl: 'search-result.html',
        }),
        __metadata("design:paramtypes", [ModalController, App])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
export { SearchResultComponent };
//# sourceMappingURL=search-result.js.map